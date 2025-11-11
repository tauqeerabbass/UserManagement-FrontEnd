"use client";
import React, { useEffect, useState } from "react";
import { Alert, Button, Divider, Form, Input, message } from "antd";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
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
      await axios.put(`http://localhost:3000/users/${userId}`, {
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
    <div className="min-h-screen bg-gray-50 p-8">
      <Divider className="!text-2xl !font-light !text-gray-700 !my-10">
        <div className="flex items-center justify-center gap-3">
          <UserRoundPen /> <span>Update User (ID: {userId})</span>
        </div>
      </Divider>

      {alertBox && (
        <Alert
          message="Success!"
          description="User updated successfully!"
          type="success"
          showIcon
          closable
          onClose={() => setAlertBox(false)}
        />
      )}

      <div className="flex justify-center bg-white p-10 max-w-3xl rounded-xl shadow-2xl mx-auto">
        <Form
          {...layout}
          form={form}
          name="update-user"
          onFinish={onFinish}
          validateMessages={validateMessages}
          style={{ maxWidth: 600, width: "100%" }}
          className="p-4"
        >
          <Form.Item name="name" label="Name">
            <Input size="large" placeholder="Enter new name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Please enter a valid email" }]}
          >
            <Input size="large" placeholder="Enter new email address" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            help="Leave blank to keep current password"
          >
            <Input.Password
              size="large"
              placeholder="Enter new password (optional)"
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
              Update User
            </Button>

            <Button
              style={{ marginLeft: 16 }}
              onClick={() => router.push("/users/userCards")}
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

export default UpdateUser;
