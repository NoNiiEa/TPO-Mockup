"use client";
import React from 'react';
import StepNavigator from "@/components/ReportPage/StepNavigator";
import { ReportFormProvider } from '@/contexts/ReportFormContext';
interface ReportLayoutProps {
  children: React.ReactNode;
  basePath?: string;
}

export default function ReportLayout({
  children
}: ReportLayoutProps) {
  return (
    <ReportFormProvider>
      <div className="min-h-screen bg-white flex flex-col items-center relative">
        <div className="w-full bg-white">
          <div className="mx-auto w-full p-6">
            <StepNavigator />
            {children}
          </div>
        </div>
      </div>
    </ReportFormProvider>
  );
};