// Use global fetch

const run = async () => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/models");
    const data = await res.json();
    
    // Filter models where id ends with :free
    const freeModels = data.data
      .filter(m => m.id.endsWith(':free'))
      .map(m => ({ id: m.id, name: m.name, context_length: m.context_length }));
      
    console.log("Current Free Models on OpenRouter:");
    console.log(JSON.stringify(freeModels, null, 2));
  } catch (err) {
    console.error("Error fetching models:", err.message);
  }
};

run();
