import axios from "axios";

export const generateRoadmap = async (req, res) => {
  try {
    const { skill, level } = req.body;

    const prompt = `
Create a detailed learning roadmap.

Skill: ${skill}
Level: ${level}

Generate a 12-week roadmap.

For each week include:
- Topics
- Practice tasks
- Mini projects

Return clean text only.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-8b-instruct",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const roadmap =
      response.data.choices[0].message.content;

    res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error(
      "ROADMAP ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to generate roadmap",
    });
  }
};