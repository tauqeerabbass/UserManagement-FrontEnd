"use client";
import React, { useState } from "react";
import { Alert, Button, Divider, Form, Input, message } from "antd"; // Removed InputNumber as it's not used here
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserRoundPlus } from "lucide-react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
};

const CreateUser: React.FC = () => {
  const [form] = Form.useForm();
  const [alertBox, setAlertBox] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    console.log("Submitting form with values:", values);

    try {
      const response = await axios.post("http://localhost:3000/users", {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      message.success("User created successfully! Please sign in.");

      form.resetFields();
      router.push("/login");
    } catch (error: any) {
      console.error("Error while creating user:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create user.";
      message.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Divider className="!text-2xl !font-light !text-gray-700 !my-10">
        <div className="flex items-center justify-center gap-3">
          <UserRoundPlus /> <span>Create New User</span>
        </div>
      </Divider>

      {alertBox && (
        <Alert
          message="Success!"
          description="User created successfully!"
          type="success"
          showIcon
          closable
          onClose={() => setAlertBox(false)}
          style={{ marginBottom: "20px", maxWidth: 600, margin: "20px auto" }}
        />
      )}

      <div className="flex justify-center bg-white p-10 max-w-3xl rounded-xl shadow-2xl mx-auto">
        <Form
          {...layout}
          form={form}
          name="create-user"
          onFinish={onFinish}
          validateMessages={validateMessages}
          style={{ maxWidth: 600, width: "100%" }}
          className="p-4"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input size="large" placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input size="large" placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password size="large" placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
            className="!mt-8"
          >
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 hover:bg-blue-700 !rounded-lg !h-10 !px-6 !font-semibold transition duration-200"
            >
              Sign Up
            </Button>
            <Button
              style={{ marginLeft: 16 }}
              onClick={() => router.push("/login")}
              className="!rounded-lg !h-10 !px-6 !font-medium transition duration-200"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateUser;
