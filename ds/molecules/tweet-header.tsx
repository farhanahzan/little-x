"use client";

import { MoonIcon, SearchIcon, SunIcon } from "lucide-react";
import { useAppTheme } from "../use-app-theme";
import { Button } from "../atoms/button";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { useAuth } from "@/modules/users/hooks/use-auth";
import { Input } from "../atoms/input";
import Link from "next/link";
import { User } from "@/store/tweetSlice";
import { useAppDispatch } from "@/store/useStore";
import { useState } from "react";
import { searchTweetAction } from "@/modules/tweet";
import { useRouter } from "next/navigation";
interface TweetHeaderProps {
  title?: string;
  userData: User | null;
  logout: () => void;
}

export function TweetHeader({
  title = "Tweet Manager",
  userData,
  logout,
}: TweetHeaderProps) {
  const router = useRouter();
  const { toggleTheme, isDark } = useAppTheme();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(searchTweetAction(searchQuery));
    router.push("/search");
  };

  return (
    <div className="flex items-center justify-between h-16 px-6">
      <Link href={"/"}>
        <h1 className="text-xl font-bold cursor-pointer">{title}</h1>
      </Link>

      {/* Search */}
      <div className="flex w-full max-w-sm items-center justify-center gap-x-4">
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-sm items-center justify-center gap-x-4"
        >
          <Input
            type="text"
            placeholder="Search Tweets"
            className="rounded-full px-4 bg-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="rounded-full px-[.5625rem]">
            <SearchIcon className="text-sm size-6" />
          </Button>
        </form>
      </div>

      {/*profile, logout, theme */}
      <div className="flex items-center justify-center gap-3">
        {/* Profile */}
        <Link
          href="/profile"
          className="flex items-center justify-center gap-2 rounded-md cursor-pointer p-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://i.pravatar.cc/150?u=${userData?.username}`}
              alt="User Avatar"
            />
            <AvatarFallback>{userData?.username.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <h3 className="text-sm">{userData?.username}</h3>
        </Link>
        <Button onClick={logout} variant="secondary">
          Logout
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
