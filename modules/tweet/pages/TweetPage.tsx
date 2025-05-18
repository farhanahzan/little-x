"use client";

import { ProtectedRoute } from "@/ds/wrappers/prtoected-auth";

import { TweetHeader } from "@/ds/molecules/tweet-header";
import { CustomHeaderSidebarMainTemplate } from "@/ds/templates/custom-header-sidebar-template";
import TweetList from "@/ds/organisms/tweet-list";
import TweetSideBar from "@/ds/molecules/tweet-sidebar";
import { useAuth } from "@/modules/users/hooks/use-auth";
import { useTweets } from "../hooks";
import CheckProfile from "@/ds/molecules/check-profile-dialog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Little X",
  description: "Welcome to Little X",
};
export function TweetPage() {
  const { logout } = useAuth();
  const { items, isLoading, userProfiles, profile } = useTweets();
  const userData = profile.user;

  return (
    <ProtectedRoute>
      {userData.username === "" ? (
        <CheckProfile open={true} isLoading={isLoading} />
      ) : (
        <CustomHeaderSidebarMainTemplate
          header={
            <TweetHeader userData={userData} logout={logout} title="Little-X" />
          }
          sidebar={
            <TweetSideBar profiles={userProfiles} isLoading={isLoading} />
          }
          main={<TweetList items={items} profile={userData} />}
          sidebarPosition="right"
          maxWidth={true}
          sidebarWidth="w-72"
        ></CustomHeaderSidebarMainTemplate>
      )}
    </ProtectedRoute>
  );
}
