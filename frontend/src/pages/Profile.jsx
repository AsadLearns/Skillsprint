function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="min-h-screen p-10">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

        <h1 className="text-4xl font-bold mb-5">
          Profile
        </h1>

        <p>
          <strong>Name:</strong> {user?.name}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

      </div>

    </div>
  );
}

export default Profile;