"use client";
import axios from "axios";
import { Link } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostType {
  id: number;
  title: string;
  content: string;
  description: string;
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
    return <p className="text-center mt-40 text-lg">Loading posts...</p>;
  }

  const firstPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="min-h-screen overflow-y-auto p-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-12 text-center">Latest Posts</h1>

      <div
        className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white py-5 md:p-8 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
        onClick={() => handlePostClick(firstPost.id)}
      >
        <div className="flex-1 px-5 lg:px-10 md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">{firstPost.title}</h2>
          <p className="text-gray-700 mb-2">{firstPost.description}</p>
          <p className="text-gray-500 text-sm">By {firstPost.user.name}</p>
          {session?.user?.id == String(firstPost?.user?.id) && (
            <p
              className="mt-6 text-sm text-green-600 font-medium cursor-alias"
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  `/posts/${firstPost?.id}/edit?id=${firstPost?.id}&userId=${firstPost?.user.id}`
                );
              }}
            >
              Edit Post
            </p>
          )}
        </div>
        <div className="md:block w-full px-5 md:w-1/3 h-48rounded-lg flex items-center justify-center text-gray-400">
          <img
            src={
              firstPost?.user?.photo ||
              "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
            }
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
                src={
                  post?.user?.photo ||
                  "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                }
                alt={post?.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-3">
              {post.description || post.content}
            </p>
            <p className="mt-2 text-gray-400 text-xs">By {post.user.name}</p>
            {session?.user?.id == String(post?.user?.id) && (
              <p
                className="mt-6 text-sm text-green-600 font-medium cursor-alias"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(
                    `/posts/${post?.id}/edit?id=${post?.id}&userId=${post?.user.id}`
                  );
                }}
              >
                Edit Post
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
