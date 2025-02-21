"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">Welcome, {user?.name}</h1>
            <Button onClick={handleLogout} variant="outline">
              Sign out
            </Button>
          </div>
          <p className="text-muted-foreground">
            This is a protected dashboard page. You can only see this if you're logged in.
          </p>
        </div>
      </div>
    </div>
  );
}