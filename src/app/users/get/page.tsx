"use client";

import { UserRoundSearch } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserType {
  id: number;
  name: string;
  email: string;
}

export default function GetPostByUser() {
  const [userId, setUserId] = useState<string>("");
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleFindUser = async () => {
    if (!userId.trim()) {
      setError("Please enter a User ID or Name");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL+`/users/search/${userId}`
      );

      if (!response.data || response.data.length === 0) {
        setError("No users found with that ID or name");
        setUser(null);
        return;
      }

      setUser(response.data[0]);
    } catch (error) {
      console.error("Error while fetching user:", error);
      setError("An error occurred while searching. Please try again.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/users");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFindUser();
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 mb-4">
            <UserRoundSearch className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Find a User
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search by user ID or name to find members
          </p>
        </div>

        <div className="card mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Search Term
              </label>
              <div className="flex gap-3">
                <input
                  id="useridinput"
                  name="userid"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter user ID or name..."
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleFindUser}
                  disabled={loading}
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {user && (
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-blue-600 mb-6">
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
              User Found
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                  User ID
                </label>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {user.id}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                  Name
                </label>
                <p className="text-lg font-semibold text-blue-900 dark:text-blue-100 truncate">
                  {user.name}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                  Email
                </label>
                <p className="text-sm text-blue-800 dark:text-blue-200 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold transition-all duration-300 hover:shadow-lg"
          >
            Go Back to Users
          </button>
          {user && (
            <button
              onClick={() => router.push(`/users/${user.id}`)}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 hover:shadow-lg"
            >
              View Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
