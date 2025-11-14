"use client";

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
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleFindPost = async () => {
    if (!userId.trim()) {
      setError("Please enter an ID, title, or name");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/posts/search/${userId}`
      );

      if (!response.data || response.data.length === 0) {
        setError("No posts found with that search term");
        setPosts([]);
        return;
      }

      setPosts(response.data);
    } catch (error) {
      console.error("Error while fetching post:", error);
      setError("An error occurred while searching. Please try again.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/posts");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFindPost();
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 mb-4">
            <FileSearchCorner className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Find Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search by user ID, title, or author name
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
                  placeholder="Enter ID, title, or author name..."
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleFindPost}
                  disabled={loading}
                  className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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

        {posts.length > 0 && (
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Found {posts.length} post{posts.length !== 1 ? 's' : ''}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {posts.map((post, idx) => (
                <div
                  key={post.id}
                  className="card border-l-4 border-purple-600 hover:shadow-xl transition-all duration-300 opacity-0 animate-fadeInUp"
                  style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {post.title}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                        {post.content}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                          By {post.user.name}
                        </span>
                        <span className="text-xs text-gray-500">ID: {post.user.id}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/posts/${post.id}`)}
                      className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 text-sm whitespace-nowrap"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {posts.length === 0 && !error && userId && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Enter a search term and click Find to search for posts
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold transition-all duration-300 hover:shadow-lg"
          >
            Go Back to Posts
          </button>
        </div>
      </div>
    </div>
  );
}
