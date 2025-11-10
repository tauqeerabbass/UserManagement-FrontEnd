"use client";

import { Divider } from "antd";
import axios from "axios";
import { FileSearchCorner } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PostType {
  id: number;
  title: string;
  content: string;
  description: string;
  user: { id: string; name: string };
}

export default function GetPostByUser() {
  const [userId, setUserId] = useState<string>("");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFindPost = async () => {
    if (!userId.trim()) {
      alert("Please enter an ID, title, or name.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/posts/search/${userId}`
      );

      if (!response.data || response.data.length === 0) {
        alert("No posts found.");
        setPosts([]);
        return;
      }

      setPosts(response.data);
    } catch (error) {
      console.error("Error while fetching post:", error);
      alert("No Post found.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/posts");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen bg-gray-50">
      <Divider className="!text-2xl !font-light !text-gray-700 !my-10">
        <div className="flex items-center justify-center gap-3">
          <FileSearchCorner /> <span>Search Post by User ID</span>
        </div>
      </Divider>

      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <label htmlFor="useridinput" className="text-gray-600 font-medium whitespace-nowrap">
          Enter Search Term:
        </label>

        <input
          id="useridinput"
          name="userid"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter ID, title, or name"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        />

        <button
          onClick={handleFindPost}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto cursor-pointer"
          disabled={loading}
        >
          {loading ? "Searching..." : "Find Post"}
        </button>
      </div>

      <div className="mt-8 space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-100 p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-bold mb-3 text-blue-800">{post.title}</h3>
            <div className="space-y-1 text-gray-700 text-sm">
              <p>
                <strong className="font-semibold text-gray-900">Content:</strong> {post.content}
              </p>
              <p>
                <strong className="font-semibold text-gray-900">Description:</strong> {post.description}
              </p>
              <p className="pt-2 border-t mt-2">
                <strong className="font-semibold text-gray-900">User:</strong> {post.user.name} (ID: {post.user.id})
              </p>
            </div>
          </div>
        ))}
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