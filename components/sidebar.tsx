// components/Sidebar.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FileText, MessageSquare, Calendar, AlertTriangle, Eye } from 'react-feather';

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  href: string;
  isActive?: boolean;
}

const Sidebar = () => {
  const pathname = usePathname();
  
  const menuItems: MenuItem[] = [
    {
      icon: <Eye size={20} />,
      title: "ติดตามสถานะ",
      href: "/track-status"
    },
    {
      icon: <MessageSquare size={20} />,
      title: "แจ้งเรื่องใหม่",
      href: "/report"
    },
    {
      icon: <FileText size={20} />,
      title: "test",
      href: "/testPage"
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="mb-6 space-y-4">
          <div className="flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className=""
            />
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-sm font-medium text-gray-900">
              ระบบรับแจ้งความออนไลน์
            </h3>
            <p className="text-xs text-gray-500">เวอร์ชัน 1.6805.20.1</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={index}
                href={item.href}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors group ${
                  isActive
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={`transition-colors ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-400 group-hover:text-gray-600'
                }`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;