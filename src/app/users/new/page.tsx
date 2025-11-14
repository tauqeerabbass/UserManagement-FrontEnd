"use client";
import React, { useState } from "react";
import { Button, Form, Input, message, Upload } from "antd";
import { UserRoundPlus } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
};

const CreateUser: React.FC = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [alertBox, setAlertBox] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    console.log("Submitting form with values:", values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (file) formData.append("photo", file);

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+`/users`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("User created successfully! Please sign in.");
      form.resetFields();
      setFile(null);
      router.push("/");
    } catch (error: any) {
      console.error("Error while creating user:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create user.";
      message.error(errorMessage);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 md:p-10">
      <div className="text-center mb-12 opacity-0 animate-fadeInUp">
        <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
          <UserRoundPlus className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Join Us</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
          Create Your Account
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Join our community and start creating amazing content
        </p>
      </div>

      <div className="card max-w-2xl mx-auto opacity-0 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        <Form
          {...layout}
          form={form}
          name="create-user"
          onFinish={onFinish}
          validateMessages={validateMessages}
          layout="vertical"
          className="space-y-6"
        >

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Full Name *
            </label>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
              className="mb-0!"
            >
              <Input
                size="large"
                placeholder="Enter your full name..."
                className="rounded-lg! border-gray-300! dark:border-gray-600! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white! focus:border-blue-500! focus:ring-2! focus:ring-blue-500/20! transition-all duration-300"
              />
            </Form.Item>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Email Address *
            </label>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              className="mb-0!"
            >
              <Input
                size="large"
                placeholder="Enter your email address..."
                className="rounded-lg! border-gray-300! dark:border-gray-600! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white! focus:border-blue-500! focus:ring-2! focus:ring-blue-500/20! transition-all duration-300"
              />
            </Form.Item>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Password *
            </label>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
              className="mb-0!"
            >
              <Input.Password
                size="large"
                placeholder="Create a secure password..."
                className="rounded-lg! border-gray-300! dark:border-gray-600! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white! focus:border-blue-500! focus:ring-2! focus:ring-blue-500/20! transition-all duration-300"
              />
            </Form.Item>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Profile Picture
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="profile-file-input"
              />
              <label
                htmlFor="profile-file-input"
                className="block p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 cursor-pointer text-center"
              >
                <div className="text-3xl mb-2">👤</div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Click to upload your profile picture
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  PNG, JPG, GIF up to 5MB (optional)
                </p>
              </label>
            </div>
            {file && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                ✓ Selected: {file.name}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="primary"
              htmlType="submit"
              className="btn-primary flex-1"
            >
              Create Account
            </Button>
            <Button
              onClick={() => router.push("/login")}
              className="btn-secondary flex-1"
            >
              Sign In Instead
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Sign in here
            </button>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default CreateUser;
