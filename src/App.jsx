import React from "react";
import CurrencyConverter from "./components/CurrencyConverter";
import GitHubRepos from "./components/GitHubRepos";
import BookLibrary from "./components/BookLibrary";

function App() {
  return (
    <div className="min-h-screen bg-gray-300 p-10">
      <CurrencyConverter />
      <GitHubRepos/>
      <BookLibrary />
    </div>
  );
}

export default App;
