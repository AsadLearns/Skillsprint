import { askOpenRouterWithFallback } from './utils/aiService.js';

const run = async () => {
  const prompt = `Create a concise, high-quality study guide for learning:
Skill: Python
Level: Beginner
Week 2 Topic: Functions and Modules
Description: Learn to write reusable code blocks and modules.

Structure the response using clean Markdown with the following sections:
1. 📖 Core Concept: Clear, simple, and brief explanation (2-3 paragraphs).
2. 💻 Code Example: A short, focused, well-commented code snippet.
3. 🔑 Key Takeaways: 3-4 bullet points of the most important facts.
4. 🛠️ Practice Task: A quick practical challenge.
5. 🎥 Video Resources: Suggest 2 relevant video searches with markdown links using YouTube search queries like '[Watch: Search Term Tutorial](https://www.youtube.com/results?search_query=...)' where search_query is URL-encoded.

Return ONLY the markdown text. Keep the entire response focused and under 450 words so it generates quickly. Do not wrap in a json block.`;

  try {
    console.log("Sending query...");
    const content = await askOpenRouterWithFallback(prompt);
    console.log("Success! Response content:\n", content);
  } catch (err) {
    console.error("Failed to query OpenRouter:", err.message);
  }
};

run();
