"use client";

import { Divider } from "antd";
import axios from "axios";
import { UserRoundSearch } from "lucide-react";
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
  const router = useRouter();

  const handleFindUser = async () => {
    if (!userId.trim()) {
      alert("Please enter a User ID or Name.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/users/search/${userId}`
      );

      if (!response.data || response.data.length === 0) {
        alert("No users found.");
        setUser(null);
        return;
      }

      setUser(response.data[0]);
    } catch (error) {
      console.error("Error while fetching user:", error);
      alert("Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/users");
  };

  return (
    <div className="p-8 max-w-xl mx-auto min-h-screen bg-gray-50">
      <Divider className="!text-2xl !font-light !text-gray-700 !my-10">
        <div className="flex items-center justify-center gap-3">
          <UserRoundSearch /> <span>Search User by ID or Name</span>
        </div>
      </Divider>

      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <label
          htmlFor="useridinput"
          className="text-gray-600 font-medium whitespace-nowrap"
        >
          Enter Search Term:
        </label>

        <input
          id="useridinput"
          name="userid"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter ID or name"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        />

        <button
          onClick={handleFindUser}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto md:px-4 md:py-3 md:text-sm cursor-pointer"
          disabled={loading}
        >
          {loading ? "Searching..." : "Find User"}
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {user && (
          <div className="border border-blue-200 p-6 rounded-xl shadow-xl bg-blue-50">
            <h3 className="text-xl font-bold mb-3 text-blue-800">User Found</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong className="font-semibold text-gray-900">
                  User ID:
                </strong>{" "}
                {user.id}
              </p>
              <p>
                <strong className="font-semibold text-gray-900">Name:</strong>{" "}
                {user.name}
              </p>
              <p>
                <strong className="font-semibold text-gray-900">Email:</strong>{" "}
                {user.email}
              </p>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={handleBack}
        className="block mx-auto bg-gray-500 hover:bg-gray-600 text-white font-medium my-10 border-0 h-10 w-40 rounded-lg shadow-md transition duration-200 cursor-pointer"
      >
        Go Back
      </button>
    </div>
  );
}
