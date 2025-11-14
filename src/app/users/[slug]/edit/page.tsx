"use client";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Input, message } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { UserRoundPen } from "lucide-react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
};

const UpdateUser: React.FC = () => {
  const [form] = Form.useForm();
  const [alertBox, setAlertBox] = useState(false);
  const router = useRouter();
  const params = useParams();
  const userId = params?.slug;

  const fetchUser = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+`/users/${userId}`);
      const user = response.data;
      if (!user) return console.log("User not found.");
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        // password: user.password || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const onFinish = async (values: any) => {
    if (!userId) return;
    try {
      await axios.put(process.env.NEXT_PUBLIC_BACKEND_URL+`/users/${userId}`, {
        name: values.name,
        email: values.email,
        // Password will only be included if user enters it, otherwise old password remains on its place
        ...(values.password && { password: values.password }),
      });
      message.success("User updated successfully!");
      setAlertBox(true);
      // form.resetFields();
      setTimeout(() => router.push("/users/userCards"), 3000);
    } catch (error) {
      console.error("Error while updating user:", error);
      message.error("Failed to update user.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 md:p-10">
      <div className="text-center mb-12 opacity-0 animate-fadeInUp">
        <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
          <UserRoundPen className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Update Profile</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
          Edit Your Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Keep your profile information up to date
        </p>
      </div>

      {alertBox && (
        <div className="max-w-2xl mx-auto mb-6 opacity-0 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <Alert
            message="✨ Success!"
            description="Your profile has been updated successfully!"
            type="success"
            showIcon
            closable
            onClose={() => setAlertBox(false)}
            className="rounded-xl! border-0! shadow-lg!"
          />
        </div>
      )}

      <div className="card max-w-2xl mx-auto opacity-0 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        <Form
          layout="vertical"
          form={form}
          name="update-user"
          onFinish={onFinish}
          validateMessages={validateMessages}
          className="space-y-6"
        >
        
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Full Name *
            </label>
            <Form.Item
              name="name"
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
              rules={[{ type: "email", message: "Please enter a valid email" }]}
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
              Password
              <span className="text-xs text-gray-500 dark:text-gray-400 font-normal"> (leave blank to keep current)</span>
            </label>
            <Form.Item
              name="password"
              className="mb-0!"
            >
              <Input.Password
                size="large"
                placeholder="Enter new password (optional)..."
                className="rounded-lg! border-gray-300! dark:border-gray-600! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white! focus:border-blue-500! focus:ring-2! focus:ring-blue-500/20! transition-all duration-300"
              />
            </Form.Item>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="primary"
              htmlType="submit"
              className="btn-primary flex-1"
            >
              Save Changes
            </Button>
            <Button
              onClick={() => router.push("/users/userCards")}
              className="btn-secondary flex-1"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUser;
