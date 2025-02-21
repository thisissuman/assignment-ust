import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function AuthCard({ className, children, ...props }) {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card
        className={cn(
          "w-full max-w-md p-8 bg-white/80 backdrop-blur-lg border border-gray-100 shadow-xl rounded-2xl",
          "transform transition-all duration-300 hover:shadow-lg",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </div>
  );
}