"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { LogOut, LayoutDashboard, Settings, BarChart3 } from "lucide-react";
import { signOut } from "@/app/actions/auth";

interface AuthButtonsProps {
  user: User | null;
}

export default function AuthButtons({ user }: AuthButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <div className="flex gap-4">
        <Link
          href="/login"
          className="font-medium hover:underline decoration-2 underline-offset-4 flex items-center"
        >
          Login
        </Link>
        <Link href="/signup" className="brutal-btn px-4 py-2 font-bold text-sm">
          Get Started
        </Link>
      </div>
    );
  }


  return (
    <div className="relative" ref={dropdownRef}>
       <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 hover:bg-muted rounded-sm border-2 border-border"
              >
                <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                  {user.user_metadata?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </div>
              </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 brutal-card bg-card p-2">
          <div className="px-3 py-2 border-b-2 border-border mb-2">
            <p className="font-bold text-sm">{user.user_metadata?.full_name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <div className="p-1">
            <Link
              href="/dashboard"
              className="px-3 py-2 hover:bg-muted font-medium text-sm flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/analytics"
              className="px-3 py-2 hover:bg-muted font-medium text-sm flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
            <Link
              href="/dashboard/settings"
              className="px-3 py-2 hover:bg-muted font-medium text-sm flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </div>

          <form action={signOut}>
            <button type="submit" className="w-full text-left px-3 py-2 hover:bg-muted font-medium text-sm flex items-center gap-2 text-destructive">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
