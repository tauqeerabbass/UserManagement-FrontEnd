"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { useSession } from "next-auth/react";

function PostDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const slug = params?.slug as string;

  useEffect(() => {
    if (!slug) {
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + `/posts/${slug}`
        );
        if (res.data) {
          setPost(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Error fetching post:", error);
        setPost(null);
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading post details...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="card text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Post not found</p>
          <button
            onClick={() => router.push("/posts/postCards")}
            className="btn-primary"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 md:p-10">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 mb-8 opacity-0 animate-fadeInUp"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">By</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {post.user?.name || "Unknown"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Published</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {post.postPhoto && (
          <div className="opacity-0 animate-fadeInUp mb-12" style={{ animationDelay: "0.2s" }}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
              <img
                src={post.postPhoto}
                alt={post.title}
                className="w-full h-96 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        )}

        {post.description && (
          <div className="card mb-8 opacity-0 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-8 bg-linear-to-b from-blue-600 to-purple-600 rounded-full"></span>
              Overview
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {post.description}
            </p>
          </div>
        )}

        {post.content && (
          <div className="card opacity-0 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-8 bg-linear-to-b from-purple-600 to-pink-600 rounded-full"></span>
              Full Article
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-12 opacity-0 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <button
            onClick={() => router.push("/posts/postCards")}
            className="btn-secondary flex-1"
          >
            View All Posts
          </button>
          <button
            onClick={() => router.back()}
            className="btn-secondary flex-1"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PostDetailsPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  return <PostDetailsContent />;
}
