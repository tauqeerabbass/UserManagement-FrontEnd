"use client";
import React, { useEffect, useState } from "react";
import { Button, Divider, Table } from "antd";
import type { TableColumnsType } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { House, UserPlus, UserRoundSearch, Users } from "lucide-react";

interface DataType {
  id: number;
  name: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  { title: "User Id", dataIndex: "id", key: "1", width: 90 },
  { title: "Name", dataIndex: "name", key: "2" },
  { title: "Email", dataIndex: "email", key: "3" },
  {
    title: "Posts",
    key: "4",
    width: 80,
    render: (_: any, record: DataType) => (
      <Link
        href={`/users/post/${record.id}`}
        passHref
        className="text-blue-600 hover:text-blue-800 font-medium"
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
        className="text-green-600 hover:text-green-800 font-medium"
      >
        Edit
      </Link>
    ),
  },
];

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [checkedList] = useState(columns.map((item) => item.key));
  const router = useRouter();

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
      console.log("User data:", res.data);
    } catch (error) {
      console.error("Unable to fetch data:", error);
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
    <div className="p-8 min-h-screen bg-gray-50">
      <Divider className="!text-3xl !font-bold !text-gray-800">
        <div className="flex items-center justify-center gap-3">
          <Users className="w-7 h-7" />
          <span>Users Data</span>
        </div>
      </Divider>

      <div className="bg-white p-6 rounded-xl shadow-xl max-w-6xl mx-auto">
        <Table<DataType>
          columns={visibleColumns}
          dataSource={dataWithKeys}
          pagination={{ pageSize: 10 }}
          rowKey="id"
          className="shadow-inner rounded-lg"
          style={{ marginTop: 10 }}
        />

        <div className="mt-8 flex justify-start space-x-4">
          {/* <Button
            type="primary"
            onClick={() => router.push("/users/new")}
            className="bg-blue-600 hover:bg-blue-700 !rounded-lg !h-10 !px-6 !font-semibold shadow-md transition duration-200"
          >
            <UserPlus className="w-5 h-5" /> Create User
          </Button> */}

          <Button
            onClick={handleClick}
            className="bg-green-600 hover:bg-green-700 text-white !rounded-lg !h-10 !px-6 !font-semibold shadow-md transition duration-200"
          >
            <UserRoundSearch className="w-[18px] h-[18px]" /> Search User
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

export default UsersTable;
