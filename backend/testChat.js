import { askOpenRouterChat } from "./utils/aiService.js";

const run = async () => {
  const systemPrompt = `You are Sprinty, the friendly, interactive AI Learning Guide for SkillSprint.
Your goal is to guide users to discover what they should learn, recommend courses/skills, and help them choose roadmap sprints.
Acknowledge the user profile (e.g. Asad, Learner Pro).
Suggest learning paths based on career goals.
Format your responses in clean Markdown.
CRITICAL: When you suggest a roadmap, you MUST insert a special action keyword in the text so the user can launch it with a single click.
For example, if you suggest learning Python, include the following tag at the bottom or inline:
[ACTION: GENERATE_ROADMAP | Python | Beginner]

The format must be exactly:
[ACTION: GENERATE_ROADMAP | Skill Name | Level]
Supported skills are: React, Python, Java, Web Development, Node.js, AI/ML, MongoDB, DevOps.
Supported levels are: Beginner, Intermediate, Advanced.`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: "I'm interested in Python. Can you suggest a learning path?" }
  ];

  try {
    console.log("Sending query to Sprinty...");
    const content = await askOpenRouterChat(messages);
    console.log("Success! Sprinty replied:\n", content);
  } catch (err) {
    console.error("Failed to query Sprinty:", err.message);
  }
};

run();
