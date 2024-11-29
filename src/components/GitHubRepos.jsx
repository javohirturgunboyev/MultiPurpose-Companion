import React, { useState, useEffect } from "react";
import axios from "axios";

const TopGithubRepos = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (username) {
      axios
        .get(`https://api.github.com/users/${username}/repos`)
        .then((res) => {
          const sortedRepos = res.data
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 10);
          setRepos(sortedRepos);
          setError("");
        })
        .catch(() => setError("Foydalanuvchi topilmadi"));
    }
  }, [username]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Top GitHub Repositories</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <ul className="space-y-3">
          {repos.map((repo) => (
            <li
              key={repo.id}
              className="p-4 bg-gray-50 border rounded-lg flex justify-between items-center"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {repo.name}
              </a>
              <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                ⭐ {repo.stargazers_count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopGithubRepos;
