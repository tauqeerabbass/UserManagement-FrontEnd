"use client";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostType {
  id: number;
  title: string;
  content: string;
  description: string;
  postPhoto: string;
  user: {
    id: string;
    name: string;
    photo: string | Blob | undefined;
  };
}

export default function PostsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/posts`
      );
      setPosts(res.data);
    } catch (error) {
      console.error("Unable to fetch posts:", error);
    }
  };

  const handlePostClick = (slug: number) => {
    router.push(`/posts/${slug}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading posts...</p>
      </div>
    );
  }

  const firstPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="min-h-screen p-6 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center gradient-text animate-fadeInUp">
        Latest Posts
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
        Discover amazing stories and content from our community
      </p>

      <div
        className="card group cursor-pointer mb-12 hover-lift overflow-hidden"
        onClick={() => handlePostClick(firstPost.id)}
      >
        <div className="flex flex-col md:flex-row items-stretch gap-8">
          <div className="w-full md:w-1/2 overflow-hidden rounded-xl shadow-lg">
            <img
              src={
                firstPost?.postPhoto ||
                "https://via.placeholder.com/500x300?text=Post"
              }
              alt={firstPost?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {firstPost.title}
                  </h2>
                  <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-xs font-semibold text-purple-600 dark:text-purple-400">
                    Featured Post
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {firstPost.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {firstPost.content}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                By <span className="text-blue-600 dark:text-blue-400 font-semibold">{firstPost.user.name}</span>
              </p>
              {session?.user?.id == String(firstPost?.user?.id) && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/posts/${firstPost?.id}/edit?id=${firstPost?.id}&userId=${firstPost?.user.id}`
                      );
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-300 hover:shadow-lg text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/posts/:${firstPost?.user?.id}`);
                    }}
                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 hover:shadow-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <ArrowUpRight className="w-6 h-6 text-purple-600" />
          More Posts
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {otherPosts.map((post, idx) => (
          <div
            key={post.id}
            className="card group cursor-pointer flex flex-col justify-between hover-lift opacity-0 animate-fadeInUp"
            style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: "forwards" }}
            onClick={() => handlePostClick(post.id)}
          >

            <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 mb-4 overflow-hidden">
              <img
                src={
                  post?.postPhoto ||
                  "https://via.placeholder.com/300x200?text=Post"
                }
                alt={post?.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
              {post.description || post.content}
            </p>

            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-4">
              By <span className="text-blue-600 dark:text-blue-400">{post.user.name}</span>
            </p>

            {session?.user?.id == String(post?.user?.id) && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/posts/${post?.id}/edit?id=${post?.id}&userId=${post?.user.id}`
                    );
                  }}
                  className="flex-1 px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-300 text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/posts/:${post?.user?.id}`);
                  }}
                  className="flex-1 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 text-xs"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
