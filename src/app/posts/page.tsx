"use client";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Divider, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {
  FilePlusCorner,
  FileSearchCorner,
  House,
  StickyNote,
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

  const initialCheckedList = [
    "id",
    "title",
    "content",
    "description",
    "user",
    "4",
  ];
  const [checkedList, setCheckedList] = useState<string[]>(initialCheckedList);

  const columns: TableColumnsType<DataType> = [
    { title: "Post Id", dataIndex: "id", key: "id", width: 90 },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Content", dataIndex: "content", key: "content" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user: UserType) => user.name,
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
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Edit
        </Link>
      ),
    },
  ];

  const filteredColumns = columns.filter((col) =>
    checkedList.includes(col.key as string)
  );

  const getAllPosts = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+`/posts`);
      setPosts(res.data);
    } catch (error) {
      console.error("Unable to fetch data:", error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <Divider className="!text-3xl !font-bold !text-gray-800">
        <div className="flex items-center justify-center gap-3">
          <StickyNote className="w-7 h-7" />
          <span>All Posts</span>
        </div>
      </Divider>

      <div className="bg-white p-6 rounded-xl shadow-xl">
        <Table<DataType>
          columns={filteredColumns}
          dataSource={posts}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="shadow-inner rounded-lg"
          style={{ marginTop: 10 }}
        />

        <div className="mt-8 flex justify-start space-x-4">
          <Button
            type="primary"
            onClick={() => {
              if (!session?.user) return;
              router.push(`/posts/${session?.user?.id}/edit`);
            }}
            className="bg-blue-600 hover:bg-blue-700 !rounded-lg !h-10 !px-6 !font-semibold shadow-md transition duration-200"
          >
            <FilePlusCorner className="w-5 h-5" /> Create Post
          </Button>

          <Button
            onClick={() => router.push("/posts/get")}
            className="bg-green-600 hover:bg-green-700 text-white !rounded-lg !h-10 !px-6 !font-semibold shadow-md transition duration-200"
          >
            <FileSearchCorner className="w-[18px] h-[18px]" /> Search Post
          </Button>

          <Button
            onClick={() => router.push("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white !rounded-lg !h-10 !px-6 !font-semibold shadow-md transition duration-200"
          >
            <House className="w-[18px] h-[18px]" /> Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
