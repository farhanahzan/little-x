import { User } from "@/store/tweetSlice";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Button } from "../atoms/button";
import { useAppDispatch } from "@/store/useStore";
import {
  fetchTweetsAction,
  followRequestAction,
  unFollowRequestAction,
} from "@/modules/tweet";

const TweetSideBar = ({
  profiles,
  isLoading,
}: {
  profiles: User[];
  isLoading: boolean;
}) => {
  const dispatch = useAppDispatch();
  const pathname = window.location.pathname.replace(/^\//, "");

  const handleFollow = (id: string) => {
    if (pathname === "profile") {
      dispatch(unFollowRequestAction(id));
    } else {
      dispatch(followRequestAction(id));
    }
    dispatch(fetchTweetsAction());
  };
  return (
    <div className="flex flex-col gap-4">
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="grid grid-cols-[1fr_80px] items-center gap-2"
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://i.pravatar.cc/150?u=${profile.username}`}
              />
              <AvatarFallback>{profile?.username.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <h3 className="text-sm max-w-[7.3125rem] overflow-hidden">
              {profile.username}
            </h3>
          </div>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => handleFollow(profile.id)}
          >
            {pathname === "profile" ? "unfollow" : "follow"}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TweetSideBar;
