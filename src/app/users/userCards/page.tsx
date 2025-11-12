"use client";
import axios from "axios";
import { Clock, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
}

export default function userCardsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();
  // console.log("Session data:", session?.user?.id);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/users`
      );
      const usersData = await res.data;
      setUsers(usersData);
      // console.log("Fetched users:", usersData);
    } catch (error) {
      console.error("Unable to fetch users:", error);
    }
  };

  const handleUserClick = (id: number) => {
    // console.log("User clicked with ID:", id);
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
    return <p className="text-center mt-40 text-lg">Loading users...</p>;
  }

  const firstUser = users[0];
  const otherUsers = users.slice(1);

  return (
    <div className="min-h-screen overflow-y-auto p-10 bg-gray-50">
      <h1 className="text-4xl font-semibold mb-10 text-center">Users</h1>

      {users.length > 0 && (
        <>
          <div
            className="flex flex-col  md:flex-row items-center gap-10 mb-10 bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition"
            onClick={() => handleUserClick(firstUser.id)}
          >
            <div className="flex-1 lg:px-20 md:w-1/2">
              <h2 className="text-3xl font-medium mb-3">{firstUser?.name}</h2>
              {/* <p>{users[0].email}</p> */}
              <p className="text-[16px]">
                {firstUser?.name} is passionate about technology. Currently,
                they are focused, and are always looking to explore new ideas
                and experiences related to their interests.
              </p>
              {session?.user?.id &&
                Number(session.user.id) === firstUser?.id && (
                  <>
                    <p
                      className="mt-6 text-[15px] text-green-600 font-medium cursor-alias flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCreatePost();
                      }}
                    >
                      Create a post <Plus className="h-4 w-4" />
                    </p>
                    <p
                      className="mt-2 text-[15px] text-green-600 font-medium cursor-alias"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProfile();
                      }}
                    >
                      Edit your profile
                    </p>
                  </>
                )}
            </div>
            <div className="lg:px-10 h-80 rounded-xl overflow-hidden w-full md:w-1/2">
              <img
                src={firstUser?.photo}
                alt={firstUser?.name}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-100 p-5 rounded-lg">
            {otherUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => handleUserClick(user?.id)}
              >
                <div className="w-full h-40 overflow-hidden rounded-lg mb-3">
                  <img
                    src={user?.photo}
                    alt="image"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <h3 className="font-medium text-lg">{user.name}</h3>
                {/* <p className="text-sm text-gray-500">{user.email}</p> */}
                <p className="text-sm text-gray-500 flex gap-1 mt-2">
                  <Clock className="h-5 w-5" />
                  11, Nov, 2025
                </p>
                {session?.user?.id && Number(session.user.id) === user?.id && (
                  <>
                    <p
                      className="mt-6 text-sm text-green-600 font-medium cursor-alias flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCreatePost();
                      }}
                    >
                      Create a post <Plus className="h-4 w-4" />
                    </p>
                    <p
                      className="mt-2 text-sm text-green-600 font-medium cursor-alias"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProfile();
                      }}
                    >
                      Edit your profile
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
