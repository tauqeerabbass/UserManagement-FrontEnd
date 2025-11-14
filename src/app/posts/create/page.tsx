"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Form,
  Input,
  message,
} from "antd";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FilePlusCorner } from "lucide-react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
};

const CreatePost: React.FC = () => {
  const [form] = Form.useForm();
  const [alertBox, setAlertBox] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onFinish = async (values: any) => {
    console.log("Submitting form with values:", values);

    const base = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!base) {
      console.log("URL is not defined");
      // console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
      // message.error("App configuration error: missing backend URL");
      return;
    }

    if (!userId) {
      console.error(
        "userId is missing — check navigation that opened this page"
      );
      message.error(
        "Missing user id. Please open this page with a userId query parameter."
      );
      return;
    }

    try {
      // const userId = Number(values.userId);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("description", values.description || "");
      if (file) {
        formData.append("postPhoto", file);
      }

      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/posts/user/${userId}`,
        formData,
        {
          withCredentials: true
        }
      );

      message.success("Post created successfully!");
      setAlertBox(true);
      // form.resetFields();
      setTimeout(() => router.push("/posts/postCards"), 3000);
    } catch (error: any) {
      console.error("Error while creating post:", {
        message: error.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      const serverMsg =
        error?.response?.data?.message || "Failed to create post.";
      message.error(serverMsg);
    }
  };

  useEffect(() => {
    console.log("CreatePost - userId from query:", userId);
  }, [userId]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 md:p-10">
      <div className="text-center mb-12 opacity-0 animate-fadeInUp">
        <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
          <FilePlusCorner className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">New Post</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
          Create Your Post
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Share your thoughts and ideas with our community
        </p>
      </div>

      {alertBox && (
        <div className="max-w-2xl mx-auto mb-6 opacity-0 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <Alert
            message="✨ Success!"
            description="Your post has been created successfully!"
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
          {...layout}
          form={form}
          name="create-post"
          onFinish={onFinish}
          validateMessages={validateMessages}
          layout="vertical"
          className="space-y-6"
        >

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Post Title *
            </label>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
              className="mb-0!"
            >
              <Input
                size="large"
                placeholder="Enter an engaging title..."
                className="rounded-lg! border-gray-300! dark:border-gray-600! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white! focus:border-blue-500! focus:ring-2! focus:ring-blue-500/20! transition-all duration-300"
              />
            </Form.Item>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Content *
            </label>
            <Form.Item
              name="content"
              rules={[{ required: true, message: "Content is required" }]}
              className="mb-0!"
            >
              <Input.TextArea
                rows={5}
                placeholder="Write your post content here..."
                className="rounded-lg! border-gray-300! dark:border-gray-600! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white! focus:border-blue-500! focus:ring-2! focus:ring-blue-500/20! transition-all duration-300 resize-none"
              />
            </Form.Item>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Description
            </label>
            <Form.Item
              name="description"
              className="mb-0!"
            >
              <Input.TextArea
                rows={3}
                placeholder="Add a brief description (optional)"
                className="rounded-lg! border-gray-300! dark:border-gray-600! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white! focus:border-blue-500! focus:ring-2! focus:ring-blue-500/20! transition-all duration-300 resize-none"
              />
            </Form.Item>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Post Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="block p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 cursor-pointer text-center"
              >
                <div className="text-3xl mb-2">📸</div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Click to upload your post image
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  PNG, JPG, GIF up to 5MB
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
              Create Post
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

export default CreatePost;
