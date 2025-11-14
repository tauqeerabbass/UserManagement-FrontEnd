"use client";
import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {
  FilePlusCorner,
  FileSearchCorner,
  House,
  StickyNote,
  Edit3,
} from "lucide-react";
import { useSession } from "next-auth/react";

interface UserType {
  id: string;
  name: string;
}

interface DataType {
  id: number;
  title: string;
  content: string;
  description: string;
  user: UserType;
}

const App: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  const initialCheckedList = [
    "id",
    "title",
    "content",
    "description",
    "user",
    "4",
  ];
  const [checkedList] = useState<string[]>(initialCheckedList);

  const columns: TableColumnsType<DataType> = [
    { 
      title: "Post Id", 
      dataIndex: "id", 
      key: "id", 
      width: 90,
      render: (text) => <span className="font-semibold text-blue-600">{text}</span>
    },
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title",
      render: (text) => <span className="font-medium truncate">{text}</span>
    },
    { 
      title: "Content", 
      dataIndex: "content", 
      key: "content",
      render: (text) => <span className="text-gray-600 line-clamp-1">{text}</span>
    },
    { 
      title: "Description", 
      dataIndex: "description", 
      key: "description",
      render: (text) => <span className="text-gray-600 line-clamp-1">{text}</span>
    },
    {
      title: "Author",
      dataIndex: "user",
      key: "user",
      render: (user: UserType) => (
        <span className="font-medium text-blue-600">{user.name}</span>
      ),
    },
    {
      title: "Action",
      key: "4",
      width: 80,
      render: (_: any, record: DataType) => (
        <Link
          href={{
            pathname: "/posts/update",
            query: { id: record.id, userId: record.user.id },
          }}
          passHref
          className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 font-semibold transition-colors duration-200 hover:underline"
        >
          <Edit3 className="w-4 h-4" /> Edit
        </Link>
      ),
    },
  ];

  const filteredColumns = columns.filter((col) =>
    checkedList.includes(col.key as string)
  );

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+`/posts`);
      setPosts(res.data);
    } catch (error) {
      console.error("Unable to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100">
            <StickyNote className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">All Posts</h1>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Explore and manage posts from the community
        </p>
      </div>

      <div className="card max-w-6xl mx-auto">
        <Table<DataType>
          columns={filteredColumns}
          dataSource={posts}
          rowKey="id"
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} posts`
          }}
          className="rounded-lg"
          rowClassName="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200"
        />

        <div className="mt-8 flex flex-col sm:flex-row justify-start gap-3 flex-wrap">
          <Button
            type="primary"
            onClick={() => {
              if (!session?.user) return;
              router.push(`/posts/${session?.user?.id}/edit`);
            }}
            className="flex items-center justify-center gap-2 btn-primary !text-white border-0"
          >
            <FilePlusCorner className="w-5 h-5" /> Create Post
          </Button>

          <Button
            onClick={() => router.push("/posts/get")}
            className="flex items-center justify-center gap-2 btn-success !text-white border-0"
          >
            <FileSearchCorner className="w-5 h-5" /> Search Post
          </Button>

          <Button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 !bg-gray-500 hover:!bg-gray-600 !text-white border-0 !rounded-lg !h-10 !px-6 !font-semibold shadow-md transition duration-200"
          >
            <House className="w-5 h-5" /> Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
