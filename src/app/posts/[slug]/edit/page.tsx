"use client";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const params = useParams();
  const {slug} = params;

  const onFinish = async (values: any) => {
    console.log("Submitting form with values:", values);

    try {
      const userId = Number(values.userId);

      const response = await axios.post(
        `http://localhost:3000/posts/user/${userId}`,
        {
          title: values.title,
          content: values.content,
          description: values.description,
        }
      );

      message.success("Post created successfully!");
      setAlertBox(true);
      // form.resetFields();
      setTimeout(() => router.push("/posts"), 3000);
    } catch (error: any) {
      console.error("Error while creating post:", error);
      message.error("Failed to create post.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Divider className="!text-2xl !font-light !text-gray-700 !my-10">
        <div className="flex items-center justify-center gap-3">
          <FilePlusCorner /> <span>Create New Post</span>
        </div>
      </Divider>

      {alertBox && (
        <Alert
          message="Success!"
          description="Post created successfully!"
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
          name="create-post"
          onFinish={onFinish}
          validateMessages={validateMessages}
          style={{ maxWidth: 600, width: "100%" }}
          className="p-4"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input size="large" placeholder="Enter post title" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Content is required" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter post content" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Optional description" />
          </Form.Item>

          {/* <Form.Item
            name="userId"
            label="User ID"
            initialValue={slug}
            rules={[
              {
                required: true,
                message: "User ID is required",
              },
              {
                validator: (_, value) => {
                  if (value && Number(value) > 0) return Promise.resolve();
                  return Promise.reject("User ID must be greater than 0");
                },
              },
            ]}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              size="large"
              placeholder="User ID"
            />
          </Form.Item> */}

          <Form.Item
            wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
            className="!mt-8"
          >
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 hover:bg-blue-700 !rounded-lg !h-10 !px-6 !font-semibold transition duration-200"
            >
              Create Post
            </Button>

            <Button
              style={{ marginLeft: 16 }}
              onClick={() => router.push("/posts")}
              className="!rounded-lg !h-10 !px-6 !font-medium transition duration-200"
            >
              Go Back
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreatePost;
