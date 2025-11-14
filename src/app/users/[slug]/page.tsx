"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, ArrowLeft, Calendar } from "lucide-react";
import { useSession } from "next-auth/react";

interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
}

function UserDetailsContent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  useEffect(() => {
    if (!slug) {
      return;
    }

    const getUserDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+`/users/${slug}`);
        const userData: User = res.data;
        if (userData) {
          setUser(userData);
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Error fetching user details:", error);
        setUser(null);
        setLoading(false);
      }
    };

    getUserDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="card text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">User profile not found</p>
          <button
            onClick={() => router.push("/users/userCards")}
            className="btn-primary"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

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
        <div className="card mb-12 overflow-hidden opacity-0 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <div className="md:w-1/3 overflow-hidden rounded-xl">
              <img
                src={user?.photo || "https://via.placeholder.com/400x500?text=User"}
                alt={user?.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between py-6">
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                      {user?.name}
                    </h1>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        Member
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm md:text-base">{user?.email}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm md:text-base">Joined Nov 2025</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => router.push("/posts/postCards")}
                  className="btn-primary flex-1"
                >
                  View Posts
                </button>
                <button
                  onClick={() => router.push("/users/userCards")}
                  className="btn-secondary flex-1"
                >
                  Back to Users
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card opacity-0 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-linear-to-b from-blue-600 to-purple-600 rounded-full"></span>
            About
          </h2>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {user?.name} is a passionate member of our community. They are focused on creating meaningful content and exploring new ideas in technology and digital innovation.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            With a commitment to excellence and continuous learning, {user?.name} contributes valuable insights and perspectives to our platform. Their profile showcases their expertise and dedication to our community.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">12</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">456</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Views</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">89</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserDetailsPage() {
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

  return <UserDetailsContent />;
}
