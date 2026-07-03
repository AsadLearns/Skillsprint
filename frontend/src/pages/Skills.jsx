import { useNavigate } from "react-router-dom";

function Skills() {
  const navigate = useNavigate();

  const skills = [
    "Frontend Development",
    "Backend Development",
    "React",
    "Node.js",
    "Python",
    "AI & Machine Learning",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        Choose Your Skill 🚀
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition-all cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <h2 className="text-2xl font-bold text-purple-600">
              {skill}
            </h2>

            <p className="text-gray-600 mt-3">
              Start learning {skill}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Skills;