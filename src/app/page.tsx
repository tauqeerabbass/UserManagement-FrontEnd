"use client"
import { useRouter } from "next/navigation";
import {StickyNote, Users} from "lucide-react";

export default function Home() {
  const router = useRouter();

  const getUsers = () =>{
    router.push("/users/userCards")
  }

  const getPosts = () =>{
    router.push("/posts/postCards")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans p-4">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-12">
          Welcome to the Platform Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row gap-8 px-10 md:px-0">
            <button 
                onClick={getUsers} 
                className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-14 w-52 font-bold text-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer"
            >
                <Users /> Get All Users
            </button>
            <button 
                onClick={getPosts} 
                className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl h-14 w-52 font-bold text-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer"
            >
                <StickyNote /> Get All Posts
            </button>
        </div>
      </div>
    </div>
  );
}