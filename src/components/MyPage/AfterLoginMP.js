import "../../styles/mypage/AfterLoginMP.css";

// Basic Profile Image
import bpi_1 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_1.png";
import bpi_2 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_2.png";
import bpi_3 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_3.png";
import bpi_4 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_4.png";
import bpi_5 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_5.png";
import bpi_6 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_6.png";
import bpi_7 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_7.png";
import bpi_8 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_8.png";
import bpi_9 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_9.png";
import bpi_10 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_10.png";
import bpi_11 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_11.png";
import bpi_12 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_12.png";

import { Bell, Calendar, Edit2, Home, User, UserPlus } from "lucide-react";
import { MdOutlineEdit } from "react-icons/md";

import ActivityBadgesSection from "./ActivityBadgesSection";
import CalendarSection from "./CalendarSection";
import UserDepositReward from "./UserDepositReward";
import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom'; 
import SuccessRateSection from "./SuccessRateSection";
import ProfileEditModal from "./ProfileEditModal";

export default function AfterLoginMP({setLogin}) {

  const location = useLocation();

  const { following, follower, totalReturn } = location.state || {};

  // User data
  const [userData, setUserData] = useState({
    userId: 1,
    email: "tryangle@gmail.com",
    name: "이현아",
    phone: "01012345678",
    description: "화이팅!",
    nickname: "효나츄",
    profileImage: bpi_12,
    challenge_money: 300000,
    return_money: totalReturn ? totalReturn : 120000,
    follower: follower ? follower : 2,
    following: following ? following : 2,
    title: "챌린지 중독자",
  });

  
  // 친구 페이지 변경사항 업데이트트
  console.log("follower/following",follower, following)
  useEffect(()=>{
    setUserData(prevData => ({
      ...prevData,
      follower: follower ? follower : userData.follower,
      following: following ? following : userData.following
    }));
  }, [following, follower])

  useEffect(()=>{
    setUserData(prevData => ({
      ...prevData,
      reward: totalReturn ? totalReturn : userData.reward,
    }));
  }, [totalReturn])
    

  const [showPEModal, setShowPEModal] = useState(false);

  const navigate = useNavigate();

  const goToMyCHallenge = () => {                                    // 3
    navigate('/mychallenge');
  };


  return (
      <main className="main flex flex-col w-full h-[734px] px-5 overflow-scroll">
        {/* Profile Header */}
        <div className="flex items-start mt-5 mb-4">
          {/* Profile Image */}
          <div className="relative">
            <div className="piContainer">
              <img className="profileImage" alt="Profile Image" src={userData.profileImage} />
            </div>            
            <button
              variant="outline"
              size="icon"
              className="editbtn absolute bottom-0 right-0 h-[23px] w-[23px] rounded-full bg-white border border-[#4A483F] p-0"
            >
              <MdOutlineEdit className="ml-[3px] h-[15px] w-[15px] stroke-[#4A483F] fill-[#4A483F]" onClick={()=>{setShowPEModal(true)}}/>
            </button>
          </div>

          {/* Profile Text */}
          <div className="h-full ml-5 flex flex-col justify-center gap-1">
            <div variant="outline" className="flex flex-row gap-5 mt-[6px] font-semibold text-[#4A483F] text-[15px]">
              <div className="">{userData.nickname}</div>
              <button className="pb-[0.5px] font-normal underline text-[11px] text-[#838687]"
                onClick={()=>{setLogin(0)}}>
                로그아웃
              </button>
            </div>
            <h2 className="text-[13px] font-bold text-[#6E6053] ">
              {userData.title}
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
                <UserPlus className="h-[13px] w-[13px] stroke-[#6E6053] stroke-[2px]"  
                  onClick={()=>{navigate("/friend", {
                    state: {
                      follower: userData.follower,
                      following: userData.following,
                    },
                  });}}/>
              </button>
            </div>
          </div>
          
        </div>

        {/* Status Bar (오늘의 한마디) */}
        <div className="w-full mb-4 bg-[#FDF8ED] border-none rounded-md">
          <div className="px-3 py-2 flex items-center">
            <span className="text-[#6E6053] text-[12px]">{userData.description}</span>
          </div>
        </div>

        {/* User Deposit/Reward Section */}
        <UserDepositReward deposit={userData.challenge_money} reward={userData.return_money} />

        {/* Activity Badges Section */}
        <ActivityBadgesSection />

        {/* Challenge Management */}
        <div className="mt-[23px] mb-4">
          <h3 className="text-sm font-semibold text-[#6e6053] ml-[2px]">
            챌린지 관리
          </h3>
          <button className="text-xs text-[#6e6053] mt-1 ml-1" onClick={goToMyCHallenge}>마이 챌린지</button>
        </div>

        {/* Calendar Section */}
        <CalendarSection />

        {/* Success Rate Section */}
        <SuccessRateSection />    


        {/* Instructions for Use */}
        <div className="mt-[23px] mb-6">
          <h3 className="text-sm font-semibold text-[#6e6053] ml-[2px]">
            이용 안내
          </h3>
          <button className="text-xs text-[#6e6053] mt-1 ml-1" >1:1 문의</button>
          <button className="text-xs text-[#6e6053] mt-1 ml-1" >약관 및 정책</button>
        </div>

        {showPEModal && <ProfileEditModal origNickname={userData.nickname} origPI={userData.profileImage} onClose={setShowPEModal} changeUserData={setUserData}/>}

      </main>
  );
}
