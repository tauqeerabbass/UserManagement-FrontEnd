"use client"
import { useRouter } from "next/navigation";
import {StickyNote, Users, ArrowRight} from "lucide-react";

export default function Home() {
  const router = useRouter();

  const getUsers = () =>{
    router.push("/users/userCards")
  }

  const getPosts = () =>{
    router.push("/posts/postCards")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-900 dark:to-gray-900 -z-10"></div>
      
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12 md:mb-16 animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Welcome to Dashboard
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage users and posts with an intuitive, modern interface. Get started by exploring our comprehensive platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          <div 
            onClick={getUsers}
            className="group cursor-pointer card hover-lift transform transition-all duration-300"
          >
            <div className="flex flex-col items-center p-8 md:p-10">
              <div className="mb-6 p-4 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 transform group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 md:w-10 md:h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                All Users
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Browse and manage all users in the platform. View profiles, search, and perform actions.
              </p>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all duration-300">
                Get Started <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div 
            onClick={getPosts}
            className="group cursor-pointer card hover-lift transform transition-all duration-300"
          >
            <div className="flex flex-col items-center p-8 md:p-10">
              <div className="mb-6 p-4 rounded-full bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 transform group-hover:scale-110 transition-transform duration-300">
                <StickyNote className="w-8 h-8 md:w-10 md:h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                All Posts
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Explore latest posts from users. Create, edit, and manage your content seamlessly.
              </p>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold group-hover:gap-3 transition-all duration-300">
                Get Started <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Active Users", value: "100+" },
            { label: "Total Posts", value: "500+" },
            { label: "Interactions", value: "10K+" },
            { label: "Platform Uptime", value: "99.9%" },
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="card text-center p-6 opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}