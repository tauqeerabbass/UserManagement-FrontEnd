"use client";
import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { House, UserRoundSearch, Users, Edit3 } from "lucide-react";

interface DataType {
  id: number;
  name: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  { 
    title: "User Id", 
    dataIndex: "id", 
    key: "1", 
    width: 90,
    render: (text) => <span className="font-semibold text-blue-600">{text}</span>
  },
  { 
    title: "Name", 
    dataIndex: "name", 
    key: "2",
    render: (text) => <span className="font-medium">{text}</span>
  },
  { 
    title: "Email", 
    dataIndex: "email", 
    key: "3",
    render: (text) => <span className="text-gray-600">{text}</span>
  },
  {
    title: "Posts",
    key: "4",
    width: 80,
    render: (_: any, record: DataType) => (
      <Link
        href={`/users/post/${record.id}`}
        passHref
        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 hover:underline"
      >
        View
      </Link>
    ),
  },
  {
    title: "Action",
    key: "5",
    width: 80,
    render: (_: any, record: DataType) => (
      <Link
        href={{
          pathname: "/users/update",
          query: { id: record.id },
        }}
        passHref
        className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 font-semibold transition-colors duration-200 hover:underline"
      >
        <Edit3 className="w-4 h-4" /> Edit
      </Link>
    ),
  },
];

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [checkedList] = useState(columns.map((item) => item.key));
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+`/users`);
      setUsers(res.data);
    } catch (error) {
      console.error("Unable to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const visibleColumns = columns.filter((col) =>
    checkedList.includes(col.key as string)
  );

  const dataWithKeys = users.map((item) => ({
    ...item,
    key: item.id.toString(),
  }));

  const handleClick = () => {
    router.push("/users/get");
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-100 to-blue-200">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">Users Directory</h1>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Manage and view all users in the system
        </p>
      </div>

      <div className="card max-w-6xl mx-auto">
        <Table<DataType>
          columns={visibleColumns}
          dataSource={dataWithKeys}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`
          }}
          rowKey="id"
          loading={loading}
          className="rounded-lg"
          rowClassName="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
          style={{ marginTop: 0 }}
        />

        <div className="mt-8 flex flex-col sm:flex-row justify-start gap-3 flex-wrap">
          <Button
            onClick={handleClick}
            className="flex items-center justify-center gap-2 btn-success !text-white border-0"
          >
            <UserRoundSearch className="w-5 h-5" /> Search User
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

export default UsersTable;
