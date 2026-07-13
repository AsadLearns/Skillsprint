import { askOpenRouterChat } from "../utils/aiService.js";

export const handleChat = async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: "Messages history array is required" });
    }

    const userName = req.user?.name || "Learner";
    const userTitle = req.user?.title || "Learner Pro";
    const userBio = req.user?.bio || "";
    const currentTarget = req.user?.currentSkill || "HTML";

    const systemPrompt = `You are Sprinty, the friendly, interactive AI Learning Guide for SkillSprint.
Your goal is to guide users to discover what they should learn, recommend courses/skills, and help them choose roadmap sprints.
Greet the user warmly, acknowledging their current user profile:
- Name: ${userName}
- Headline/Title: ${userTitle}
- Bio: ${userBio || "None provided"}
- Current learning target: ${currentTarget}

Suggest learning paths based on their career goals, interests, and aspirations.
If the user is unsure what to learn, ask about what they like (e.g. building visual websites, working with servers, data science, mobile apps, automation) and suggest a matching track.

Format your responses in clean Markdown.
CRITICAL: When you suggest a roadmap, you MUST insert a special action keyword in the text so the user can launch it with a single click.
For example, if you suggest learning Python, include the following tag at the bottom or inline:
[ACTION: GENERATE_ROADMAP | Python | Beginner]
If you suggest React:
[ACTION: GENERATE_ROADMAP | React | Intermediate]
If you suggest DevOps:
[ACTION: GENERATE_ROADMAP | DevOps | Advanced]

The format must be exactly:
[ACTION: GENERATE_ROADMAP | Skill Name | Level]
Supported skills are: React, Python, Java, Web Development, Node.js, AI/ML, MongoDB, DevOps.
Supported levels are: Beginner, Intermediate, Advanced.

Keep replies engaging, focused, and under 250 words so they load quickly. Do not repeat the action tag multiple times for the same skill.`;

    // Add the system prompt at the beginning of the messages list
    const openRouterMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    console.log(`💬 Sprinty chatbot requested by user ${userName}...`);
    const reply = await askOpenRouterChat(openRouterMessages);

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Sprinty Chatbot Error:", error.message);
    res.status(500).json({ message: "Failed to query Sprinty chatbot assistant" });
  }
};
