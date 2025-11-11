"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostDetailsPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/posts/slug/${slug}`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [slug]);

  if (!post) return <p className="text-center mt-40">Loading...</p>;

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.description}</p>
      <p className="text-gray-500 text-sm">By {post.user.name}</p>
      <div className="mt-6 p-4 bg-white rounded shadow">{post.content}</div>
    </div>
  );
}
