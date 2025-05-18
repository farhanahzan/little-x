"use client";
import LeftTweetSideBar from "@/ds/molecules/left-tweet-sidebar";
import RightTweetSidebar from "@/ds/molecules/right-tweet-sidebar";
import DashboardLeftRightSidebar from "@/ds/templates/dashboard-left-righ-sidebar";
import { ProtectedRoute } from "@/ds/wrappers/prtoected-auth";
import { Metadata } from "next";
import { useTweets } from "../hooks";
import { useAuth } from "@/modules/users/hooks/use-auth";
import { BirdIcon, HomeIcon, SettingsIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import MainFeed from "@/ds/molecules/tweet-main";
import CheckProfile from "@/ds/molecules/check-profile-dialog";

export const metadata: Metadata = {
  title: "Little X",
  description: "Welcome to Little X",
};

const TweetPageRevamp = () => {
  const {
    profile,
    userProfiles,
    items: feeds,
    searchResult,
    isLoading,
  } = useTweets();
  const { data, logout } = useAuth();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "home";

  const userData = {
    username: profile.user.username,
    email: data?.email || "",
  };

  const following = profile.following;
  const suggestions = userProfiles;
  const userTweets = feeds.filter(
    (item) => item.username === userData.username
  );

  const profileUserData = profile.user;

  // Improved navigation menu with proper routes and active states
  const navMenu = useMemo(
    () => [
      {
        id: 1,
        name: "Home",
        icon: <HomeIcon />,
        route: "/?tab=home",
        count: feeds.length,
        isActive: currentTab === "home",
      },
      {
        id: 2,
        name: "My Tweets",
        icon: <BirdIcon />,
        route: "/?tab=profile",
        count: userTweets.length,
        isActive: currentTab === "profile",
      },
      {
        id: 3,
        name: "Settings",
        icon: <SettingsIcon />,
        route: "/settings", // Better to have a dedicated settings route
        count: 0, // or remove count entirely for settings
        isActive: currentTab === "settings",
      },
    ],
    [feeds.length, userTweets.length, currentTab]
  );

  return (
    <ProtectedRoute>
      {userData.username === "" ? (
        <CheckProfile open={true} isLoading={isLoading} />
      ) : (
        <DashboardLeftRightSidebar
          leftSidebar={
            <LeftTweetSideBar
              logout={logout}
              userData={userData}
              navMenu={navMenu}
              currentRoute={`/?tab=${currentTab}`}
            />
          }
          main={
            <MainFeed
              feeds={feeds}
              userTweets={userTweets}
              searchResult={searchResult}
              profile={profileUserData}
              isLoading={isLoading} // You can add loading state management here
            />
          }
          rightSidebar={
            <RightTweetSidebar
              userData={userData}
              following={following}
              suggetions={suggestions} // Fixed typo: suggestions
            />
          }
          sidebarWidth="w-72"
        />
      )}
    </ProtectedRoute>
  );
};

export default TweetPageRevamp;
