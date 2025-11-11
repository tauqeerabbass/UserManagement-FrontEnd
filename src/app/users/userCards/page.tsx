"use client";
import axios from "axios";
import { Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
  const { data: session, status } = useSession();
  // console.log("Session data:", session?.user?.id);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
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
            className="flex flex-col  md:flex-row items-center gap-10 mb-10 bg-white p-6 rounded-lg shadow-sm cursor-pointer"
            onClick={() => handleUserClick(firstUser.id)}
          >
            <div className="flex-1 lg:px-20 md:w-1/2">
              <h2 className="text-3xl font-medium mb-3">{firstUser?.name}</h2>
              {/* <p>{users[0].email}</p> */}
              <p>
                {firstUser?.name} is passionate about technology. Currently,
                they are focused, and are always looking to explore new ideas
                and experiences related to their interests.
              </p>
              {Number(session?.user?.id) === firstUser?.id && (
                <p
                  className="mt-5 text-sm text-green-600 font-medium cursor-alias"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditProfile();
                  }}
                >
                  Edit your profile
                </p>
              )}
            </div>
            <div className="lg:px-10 h-80 rounded-xl overflow-hidden w-1/2">
              <img
                src={
                  "https://blogs.a-sports.tv/wp-content/uploads/2025/11/babar-azam-1.jpg"
                }
                alt={firstUser?.name}
                className="w-full h-140 object-top rounded-lg shadow-lg"
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
                    src={
                      "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlzc2FuJTIwcjM1JTIwZ3RyfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000"
                    }
                    alt="image"
                    className="w-full h-140 object-center rounded-lg shadow-lg"
                  />
                </div>
                <h3 className="font-medium text-lg">{user.name}</h3>
                {/* <p className="text-sm text-gray-500">{user.email}</p> */}
                <p className="text-sm text-gray-500 flex gap-1 mt-2">
                  <Clock className="h-5 w-5" />
                  11, Nov, 2025
                </p>
                {Number(session?.user?.id) === user?.id && (
                  <p
                    className="mt-4 text-sm text-green-600 font-medium text-end cursor-alias"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditProfile();
                    }}
                  >
                    Edit your profile
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
