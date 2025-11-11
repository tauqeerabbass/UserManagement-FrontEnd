"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Alert, Button, Divider, Form, Input, message } from "antd";
import { useState } from "react";

export default function LoginPage() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    const emailCheck = values.email.toLowerCase();
    const result = await signIn("credentials", {
      redirect: false,
      email: emailCheck,
      password: values.password,
    });

    if (result?.error) {
      setAlertVisible(true);

      message.error("Invalid credentials!", 2);

      form.resetFields();

      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <Divider className="!text-2xl !font-semibold">User Login</Divider>

        {alertVisible && (
          <Alert
            message="Error!"
            description="Invalid credentials!"
            type="error"
            showIcon
            closable
            onClose={() => setAlertVisible(false)}
            className="mb-4"
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="bg-indigo-600 hover:bg-indigo-700 mt-4"
            >
              Sign In
            </Button>
          </Form.Item>

          <Divider plain>New User?</Divider>

          <Button
            onClick={() => router.push("/users/new")}
            block
            size="large"
            className="mt-2"
          >
            Create an Account (Sign Up)
          </Button>
        </Form>
      </div>
    </div>
  );
}
