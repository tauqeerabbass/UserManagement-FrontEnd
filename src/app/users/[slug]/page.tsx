"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
}

export default function UserDetailsPage() {
  const [users, setUsers] = useState<User | null>(null);
  const params = useParams();
  const { slug } = params;
  console.log("UserDetailsPage slug param:", slug);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const getUserDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${slug}`);
      const userData: User = await res.data;
      setUsers(userData);
      console.log("Fetched user details:", userData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (!users) {
    return <p className="text-center mt-40 text-lg">Loading user details...</p>;
  }

  return (
    <div className="min-h-screen overflow-y-auto p-10 bg-gray-50">
      <h1 className="text-4xl font-semibold mb-10 text-center mt-16">{users.name}</h1>
      <div className="flex justify-center mt-10 w-full">
        <img
          src={"https://blogs.a-sports.tv/wp-content/uploads/2025/11/babar-azam-1.jpg"}
          alt={users.name}
          className="w-10/12 h-140 object-top rounded-lg shadow-lg"
        />
      </div>
      {/* <p className="text-center mt-10">{users.email}</p> */}
      <p className="text-start mt-10 px-10 md:px-28 xl:px-52 py-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel accusamus architecto nam quae distinctio libero natus veniam? Beatae, autem, id veritatis distinctio modi sint sapiente accusantium pariatur assumenda natus odit!
      Aut exercitationem error vero optio, nobis iste tempore voluptatibus necessitatibus quaerat minus provident a aperiam non, impedit reprehenderit maxime repellendus, libero placeat suscipit accusamus deleniti quibusdam unde dolores odio. Voluptatum!
      Ad neque magni fugit eaque expedita saepe reiciendis impedit doloribus quidem, illo, harum obcaecati esse earum dolor nostrum culpa porro quo quaerat sequi optio quisquam, labore quibusdam consequuntur inventore! Ea!
      Qui maiores facere voluptates ullam? Aspernatur laborum laudantium esse molestias beatae ullam minima id non. Inventore facere beatae asperiores minus magni in consequatur maxime, aliquam voluptatem repellat eos possimus iure.
      Sequi, amet. Repellat illo sequi adipisci atque saepe veritatis nisi autem hic necessitatibus voluptatem aliquid, nesciunt odit corrupti assumenda nihil aut eveniet! Iure, asperiores eligendi alias vitae nam tempora temporibus.</p>
    </div>
  );
}
