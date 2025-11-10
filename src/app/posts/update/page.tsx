"use client";
import React, { useState } from "react";
import { Alert, Button, Divider, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

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

  const onFinish = async (values: any) => {
    console.log("Submitting form with values:", values);

    try {
      const response = await axios.put(
        `http://localhost:3000/posts/${postId}`,
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
      setTimeout(() => router.push("/posts"), 3000);
    } catch (error: any) {
      console.error("Error while updating post:", error);
      message.error("Failed to update post.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Divider className="!text-2xl !font-light !text-gray-700 !my-10">
        ✏️ Update Post (ID: {postId})
      </Divider>

      {alertBox && (
        <Alert
          message="Success!"
          description="Post updated successfully!"
          type="success"
          showIcon
          closable
          onClose={() => setAlertBox(false)}
          style={{ marginBottom: "20px", maxWidth: 600, margin: "20px auto" }}
        />
      )}

      <div className="flex justify-center bg-white p-10 max-w-3xl rounded-xl shadow-2xl mx-auto">
        <Form
          initialValues={{ user_Id: userId }}
          {...layout}
          form={form}
          name="update-post"
          onFinish={onFinish}
          validateMessages={validateMessages}
          style={{ maxWidth: 600, width: "100%" }}
          className="p-4"
        >
          <Form.Item name="title" label="Title">
            <Input size="large" placeholder="Enter new title" />
          </Form.Item>

          <Form.Item name="content" label="Content">
            <Input.TextArea rows={4} placeholder="Enter new content" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Enter new description" />
          </Form.Item>

          <Form.Item
            name="user_Id"
            label="User ID"
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
          </Form.Item>

          <Form.Item
            wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
            className="!mt-8"
          >
            <Button
              type="primary"
              htmlType="submit"
              className="bg-green-600 hover:bg-green-700 !rounded-lg !h-10 !px-6 !font-semibold transition duration-200"
            >
              Update Post
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

export default UpdatePost;
