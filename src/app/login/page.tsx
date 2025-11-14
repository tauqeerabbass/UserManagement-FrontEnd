"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Alert, Button, Form, Input, message } from "antd";
import { useState } from "react";
import { Mail, Lock, UserPlus, LogIn } from "lucide-react";

export default function LoginPage() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    const emailEntered = values.email.toLowerCase();
    setLoading(true);
    
    const result = await signIn("credentials", {
      redirect: false,
      email: emailEntered,
      password: values.password,
    });

    setLoading(false);

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-900 dark:to-gray-900 -z-10"></div>
      
      <div className="w-full max-w-md">
        <div className="card !bg-white/95 !backdrop-blur-2xl">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 mb-4">
              <LogIn className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
          </div>

          {alertVisible && (
            <Alert
              message="Authentication Failed"
              description="Invalid email or password. Please try again."
              type="error"
              showIcon
              closable
              onClose={() => setAlertVisible(false)}
              className="mb-6 rounded-lg"
            />
          )}

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
          >

            <Form.Item
              label={
                <span className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4" /> Email Address
                </span>
              }
              name="email"
              rules={[
                { required: true, message: "Please enter your email address" },
                { type: "email", message: "Please enter a valid email" }
              ]}
            >
              <Input 
                size="large"
                placeholder="you@example.com"
                className="!rounded-lg !border-gray-300 dark:!border-gray-600"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                  <Lock className="w-4 h-4" /> Password
                </span>
              }
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password 
                size="large"
                placeholder="••••••••"
                className="!rounded-lg !border-gray-300 dark:!border-gray-600"
              />
            </Form.Item>

            <Form.Item className="mb-2">
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                className="!bg-gradient-to-r !from-blue-600 !to-blue-700 !border-0 !rounded-lg !h-12 !font-semibold !text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" /> Sign In
                </span>
              </Button>
            </Form.Item>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                  New to our platform?
                </span>
              </div>
            </div>

            <Form.Item className="mb-0">
              <Button
                onClick={() => router.push("/users/new")}
                block
                size="large"
                className="!rounded-lg !h-12 !font-semibold !text-base !border-gray-300 dark:!border-gray-600 !text-gray-700 dark:!text-gray-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <UserPlus className="w-5 h-5" /> Create Account
                </span>
              </Button>
            </Form.Item>
          </Form>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          By signing in, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
}
