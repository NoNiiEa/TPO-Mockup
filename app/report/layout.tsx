"use client";
import React from 'react';
import StepNavigator from "@/components/ReportPage/StepNavigator";

interface ReportLayoutProps {
  children: React.ReactNode;
  basePath?: string;
}

export default function ReportLayout({
  children
}: ReportLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center relative">
      <div className="w-full bg-white">
        <div className="mx-auto w-full p-6">
          <StepNavigator />
        </div>
      </div>
      {children}
    </div>
  );
};