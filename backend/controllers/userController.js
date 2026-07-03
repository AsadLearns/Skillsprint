import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      currentSkill: user.currentSkill,
      progress: user.progress,
      streak: user.streak,
      quizScore: user.quizScore,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;

    const user = await User.findById(req.user._id);

    user.progress = progress;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};