import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    currentSkill: {
      type: String,
      default: "HTML",
    },

    progress: {
      type: Number,
      default: 0,
    },

    streak: {
      type: Number,
      default: 0,
    },

    quizScore: {
      type: Number,
      default: 0,
    },

    bio: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "Learner Pro",
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;