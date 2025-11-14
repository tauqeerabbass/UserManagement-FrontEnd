"use client";
import axios from "axios";
import { Clock, Plus, ArrowUpRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
}

export default function userCardsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/users`
      );
      const usersData = await res.data;
      setUsers(usersData);
    } catch (error) {
      console.error("Unable to fetch users:", error);
    }
  };

  const handleUserClick = (id: number) => {
    router.push(`/users/${id}`);
  };

  const handleEditProfile = () => {
    router.push(`/users/${session?.user?.id}/edit`);
  };

  const handleCreatePost = () => {
    if (!session?.user?.id) {
      console.error("No user ID found in session!");
      return;
    }
    router.push(`/posts/create?userId=${session.user.id}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!users || users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading users...</p>
      </div>
    );
  }

  const firstUser = users[0];
  const otherUsers = users.slice(1);

  return (
    <div className="min-h-screen p-6 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center gradient-text animate-fadeInUp">
        Community Members
      </h1>

      {users.length > 0 && (
        <>
          <div
            className="card group cursor-pointer mb-10 hover-lift overflow-hidden"
            onClick={() => handleUserClick(firstUser.id)}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 px-6 md:px-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {firstUser?.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {firstUser?.email}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Featured</span>
                  </div>
                </div>
                
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {firstUser?.name} is passionate about technology. Currently,
                  they are focused on creating meaningful content and always
                  looking to explore new ideas and experiences.
                </p>

                {session?.user?.id &&
                  Number(session.user.id) === firstUser?.id && (
                    <div className="space-y-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreatePost();
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-all duration-300 hover:shadow-lg"
                      >
                        <Plus className="w-4 h-4" /> Create a Post
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProfile();
                        }}
                        className="block ml-0 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-300 hover:shadow-lg"
                      >
                        Edit Your Profile
                      </button>
                    </div>
                  )}
              </div>

              <div className="w-full md:w-1/3">
                <div className="relative overflow-hidden rounded-xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300 h-80">
                  <img
                    src={firstUser?.photo || "https://via.placeholder.com/300x400?text=User"}
                    alt={firstUser?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ArrowUpRight className="w-6 h-6 text-purple-600" />
              Other Members
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {otherUsers.map((user, idx) => (
              <div
                key={user.id}
                className="card group cursor-pointer hover-lift flex flex-col opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: "forwards" }}
                onClick={() => handleUserClick(user?.id)}
              >
                
                <div className="w-full h-48 overflow-hidden rounded-lg mb-4 relative">
                  <img
                    src={user?.photo || "https://via.placeholder.com/200x250?text=User"}
                    alt="image"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>

                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                  {user.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-3">
                  {user.email}
                </p>

                <div className="flex items-center gap-1 text-gray-400 text-xs mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Member since Nov 2025</span>
                </div>

                {session?.user?.id && Number(session.user.id) === user?.id && (
                  <div className="space-y-2 mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCreatePost();
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg"
                    >
                      <Plus className="w-3 h-3" /> Create Post
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProfile();
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
