"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostType {
  id: number;
  title: string;
  content: string;
  description: string;
  user: { id: string; name: string };
}

export default function PostsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/posts");
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
      <p className="text-center mt-40 text-lg">Loading posts...</p>
    );
  }

  const firstPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="min-h-screen overflow-y-auto p-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-12 text-center">Latest Posts</h1>

      <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
           onClick={() => handlePostClick(firstPost.id)}
      >
        <div className="flex-1 lg:px-10 w-1/2">
          <h2 className="text-3xl font-semibold mb-4">{firstPost.title}</h2>
          <p className="text-gray-700 mb-2">{firstPost.description}</p>
          <p className="text-gray-500 text-sm">By {firstPost.user.name}</p>
        </div>
        <div className="hidden md:block w-1/3 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
          <img
            src={"https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlzc2FuJTIwcjM1JTIwZ3RyfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000"}
            alt={firstPost?.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-100 rounded-lg p-6">
        {otherPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
            onClick={() => handlePostClick(post.id)}
          >
            <div className="h-40 w-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 mb-4">
              <img 
              src={"https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlzc2FuJTIwcjM1JTIwZ3RyfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000"}
              alt={post?.title}
              className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-3">{post.description || post.content}</p>
            <p className="mt-2 text-gray-400 text-xs">By {post.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
