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
import { FilePenLine } from "lucide-react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
};

const UpdatePost: React.FC = () => {
  const [form] = Form.useForm();
  const [alertBox, setAlertBox] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const userId = searchParams.get("userId");

  const fetchPost = async () => {
    if (!postId) return;
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/posts/${postId}`
      );
      const post = response.data;
      if (!post) return console.log("Post not found.");

      form.setFieldsValue({
        title: post.title,
        content: post.content,
        description: post.description,
        userId: post.user.id,
      });
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  useEffect(() => {
    // console.log("Fetching post data for ID:", postId);
    // console.log("Fetching user data for ID:", userId);
    fetchPost();
  }, [postId, form]);

  const onFinish = async (values: any) => {
    console.log("Submitting form with values:", values);

    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/posts/${postId}`,
        {
          title: values.title,
          content: values.content,
          description: values.description,
          user_Id: values.user_Id,
        }
      );

      message.success("Post updated successfully!");
      setAlertBox(true);
      // form.resetFields();
      setTimeout(() => router.push("/posts/postCards"), 3000);
    } catch (error: any) {
      console.error("Error while updating post:", error);
      message.error("Failed to update post.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 md:p-10">
      
      <div className="text-center mb-12 opacity-0 animate-fadeInUp">
        <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
          <FilePenLine className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Edit Post</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
          Update Your Post
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Make changes to your post content
        </p>
      </div>

      {alertBox && (
        <div className="max-w-2xl mx-auto mb-6 opacity-0 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <Alert
            message="✨ Success!"
            description="Your post has been updated successfully!"
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
          name="update-post"
          onFinish={onFinish}
          validateMessages={validateMessages}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Post Title *
            </label>
            <Form.Item
              name="title"
              className="mb-0!"
            >
              <Input
                size="large"
                placeholder="Enter post title..."
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
              className="mb-0!"
            >
              <Input.TextArea
                rows={5}
                placeholder="Update your post content..."
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
                placeholder="Update description (optional)..."
                className="rounded-lg! border-gray-300! dark:border-gray-600! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white! focus:border-blue-500! focus:ring-2! focus:ring-blue-500/20! transition-all duration-300 resize-none"
              />
            </Form.Item>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="primary"
              htmlType="submit"
              className="btn-primary flex-1"
            >
              Update Post
            </Button>
            <Button
              onClick={() => router.push("/posts/postCards")}
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

export default UpdatePost;
