"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") return null;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <Button
      type="default"
      onClick={handleSignOut}
      className="!rounded-md fixed top-4 left-8 self-end z-50 shadow-sm "
    >
      Sign Out
    </Button>
  );
}
