// Import sections
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { hr } from "@/components/ui/separator";
import "../../styles/AfterLoginMP.css";
import bpi_22 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_22.png";

import { Bell, Calendar, Edit2, Home, User, UserPlus } from "lucide-react";
import { MdOutlineEdit } from "react-icons/md";

import ActivityBadgesSection from "./ActivityBadgesSection";
import CalendarSection from "./CalendarSection";
import UserDepositReward from "./UserDepositReward";
import React from "react";

export default function AfterLoginMP() {
  // User data
  const userData = {
    userId: 1,
    email: "tryangle@gmail.com",
    name: "이현아",
    phone: "01012345678",
    description: "화이팅!",
    nickname: "효나츄",
    profileImage: bpi_22,
    deposit: 10000,
    reward: 500,
    follower: 3,
    following: 2,
  }
  return (
      <main className="flex flex-col w-full h-[80px] px-5">
        {/* Profile Header */}
        <div className="flex items-start mt-5 mb-4">
          {/* Profile Image */}
          <div className="relative">
            <div className="piContainer">
              <img className="profileImage" alt="Profile Image" src={bpi_22} />
            </div>            
            <button
              variant="outline"
              size="icon"
              className="editbtn absolute bottom-0 right-0 h-[23px] w-[23px] rounded-full bg-white border border-[#4A483F] p-0"
            >
              <MdOutlineEdit className="ml-[3px] h-[15px] w-[15px] stroke-[#4A483F] fill-[#4A483F]" />
            </button>
          </div>

          {/* Profile Text */}
          <div className="h-full ml-5 flex flex-col justify-center gap-1">
            <div variant="outline" className="flex flex-row gap-5 mt-[6px] font-semibold text-[#4A483F] text-[15px]">
              <div className="">{userData.nickname}</div>
              <button className="pb-[0.5px] font-normal underline text-[11px] text-[#838687]">로그아웃</button>
            </div>
            <h2 className="text-[13px] font-bold text-[#6E6053] ">
              챌린지 중독자
            </h2>
            <div className="flex items-center gap-3 text-xs text-[#6E6053]">
              <span>
                팔로워 
                <span className="ml-[7px] font-bold">{userData.follower}</span>
              </span>
              {/* Separator */}
              <hr orientation="vertical" className="h-[10px] mt-[4px] border-[#6E6053] border-l-[0.1px]" />
              <span>
                팔로잉 
                <span className="ml-[7px] font-bold">{userData.following}</span>
              </span>
              <button
                variant="outline"
                size="sm"
                className="grid place-items-center w-[22px] h-[22px] rounded-full p-0 border-[1.5px] border-[#6e6053]"
              >
                <UserPlus className="h-[13px] w-[13px] stroke-[#6E6053] stroke-[2px]" />
              </button>
            </div>
          </div>
          
        </div>

        {/* Status Bar (오늘의 한마디) */}
        <div className="w-full mb-4 bg-[#FDF8ED] border-none rounded-md">
          <div className="px-3 py-2 flex items-center">
            <span className="text-[#6E6053] text-[12px]">오늘의 한마디 :)</span>
          </div>
        </div>

        {/* User Deposit/Reward Section */}
        <UserDepositReward deposit={userData.deposit} reward={userData.reward} />

        {/* Activity Badges Section */}
        <ActivityBadgesSection />

        {/* Challenge Management */}
        <div className="mt-4 mb-4">
          <h3 className="text-sm font-semibold text-[#6e6053]">
            챌린지 관리
          </h3>
          <p className="text-xs text-[#6e6053] mt-1">마이 챌린지</p>
        </div>

        {/* Calendar Section */}
        {/* <CalendarSection /> */}
      </main>
  );
}
