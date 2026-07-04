import dotenv from 'dotenv';
dotenv.config();

const models = [
  "openai/gpt-oss-20b:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "openai/gpt-oss-120b:free",
  "google/gemma-4-26b-a4b-it:free",
  "google/gemma-4-31b-it:free",
  "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
  "meta-llama/llama-3.3-70b-instruct:free"
];

export const askOpenRouterWithFallback = async (prompt) => {
  let lastError = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      try {
        console.log(`🤖 Requesting OpenRouter with model: ${model} (Attempt ${attempt}/2)`);
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: model,
              messages: [
                {
                  role: "user",
                  content: prompt,
                },
              ],
            }),
          }
        );

        clearTimeout(timeoutId);

        const data = await response.json();

        if (response.status === 200 && data.choices && data.choices[0]) {
          console.log(`✅ Success with model: ${model}`);
          return data.choices[0].message.content.trim();
        } else {
          const errMsg = data.error?.message || `Status code ${response.status}`;
          console.warn(`⚠️ Model ${model} attempt ${attempt} failed: ${errMsg}`);
          lastError = new Error(errMsg);
        }
      } catch (error) {
        clearTimeout(timeoutId);
        console.warn(`⚠️ Model ${model} attempt ${attempt} error: ${error.message}`);
        lastError = error;
      }

      if (attempt < 2) {
        // Wait 1.5 seconds before retrying same model
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
  }

  throw new Error(`All models failed. Last error: ${lastError?.message}`);
};

export const cleanAndParseJSON = (text) => {
  let cleaned = text.trim();
  
  // Remove markdown codeblock blocks if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```[a-zA-Z]*\n?/, "").replace(/\n?```$/, "").trim();
  } else {
    // If it contains backticks anywhere, strip them
    cleaned = cleaned.replace(/```[a-zA-Z]*\n?/g, "").replace(/```/g, "").trim();
  }

  // Repair missing commas between JSON objects (e.g. } { => }, {)
  cleaned = cleaned.replace(/}\s*{/g, '}, {');

  // Repair trailing commas inside arrays or objects (e.g. , ] => ] or , } => })
  cleaned = cleaned.replace(/,\s*]/g, ']').replace(/,\s*}/g, '}');

  // Flatten nested arrays (e.g. [[{...}], [{...}]] => [{...}, {...}])
  cleaned = cleaned.replace(/\]\s*,\s*\[/g, ', ').replace(/^\[\s*\[/g, '[').replace(/\]\s*\]$/g, ']');

  // Repair specific property colons (e.g. "description", "value" => "description":"value")
  cleaned = cleaned.replace(/"week"\s*,\s*/g, '"week":');
  cleaned = cleaned.replace(/"topic"\s*,\s*"/g, '"topic":"');
  cleaned = cleaned.replace(/"description"\s*,\s*"/g, '"description":"');
  cleaned = cleaned.replace(/"resources"\s*,\s*\[/g, '"resources":[');
  
  // Repair resources misspelling (e.g. reources, resouces)
  cleaned = cleaned.replace(/"re[s]?our[s]?[c]?es"\s*:/g, '"resources":');
  cleaned = cleaned.replace(/"re[s]?our[s]?[c]?es"\s*,\s*\[/g, '"resources":[');

  // Repair quiz property colons
  cleaned = cleaned.replace(/"question"\s*,\s*"/g, '"question":"');
  cleaned = cleaned.replace(/"options"\s*,\s*\[/g, '"options":[');
  cleaned = cleaned.replace(/"correct"\s*,\s*/g, '"correct":');

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Fallback: try to extract JSON array using regular expression
    const arrayMatch = cleaned.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (arrayMatch) {
      try {
        return JSON.parse(arrayMatch[0]);
      } catch (innerErr) {
        console.error("Failed to parse regex-extracted array JSON:", innerErr.message);
      }
    }
    
    // Fallback: try to extract JSON object using regular expression
    const objectMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      try {
        return JSON.parse(objectMatch[0]);
      } catch (innerErr) {
        console.error("Failed to parse regex-extracted object JSON:", innerErr.message);
      }
    }
    
    console.error("Raw text that failed parsing:\n", text);
    throw new Error(`JSON parsing failed: ${e.message}`);
  }
};
