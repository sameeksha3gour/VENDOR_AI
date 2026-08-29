"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedLayout({
  children,
}: Props) {

  const router = useRouter();

  const {
    user,
    loading,
  } = useAuthContext();

  useEffect(() => {

    if (!loading && !user) {
      router.replace("/login");
    }

  }, [loading, user, router]);

  if (loading) {

    return (

      <div className="flex h-screen items-center justify-center">

        <h2 className="text-xl font-semibold">
          Loading...
        </h2>

      </div>

    );

  }

  if (!user) return null;

  return <>{children}</>;
}