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
import useAuthStore from "../User/UseAuthStore";
import SecedeModal from "./SecedeModal";

export default function AfterLoginMP({logout}) {

  const location = useLocation();

  const { following, follower, totalReturn, origUserData } = location.state || {};

  const { user_token } = useAuthStore();

  // User data
  const [userData, setUserData] = useState(origUserData ? origUserData : false);

  // Loading
  const [loading, setLoading] = useState(origUserData ? false : true);

  // 회원 정보 GET
  useEffect(()=>{
    if(origUserData){
      setLoading(false);
    }else{
        const getUserData = async ()=>{
        try {
            const res = await fetch('http://localhost:8080/user/mypage', {
                method: 'GET',
                headers: {
                  // 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user_token}`
                },
            });

            const data = await res.json();
            console.log("user Data check", data.isSuccess, data.result);

            if(data.isSuccess){
                setUserData(data.result);
            } else{
                console.log(`⚠ ${data.message}`);

                setUserData({
                  userId: 1,
                  email: "tryangle@gmail.com",
                  name: "이현아",
                  phone: "01012345678",
                  description: "화이팅!",
                  nickname: "효나츄",
                  profileImage: bpi_12,
                  challengeMoney: 300000,
                  returnMoney: totalReturn ? totalReturn : 120000,
                  followers: follower ? follower : 2,
                  followees: following ? following : 2,
                  badgeDescription: "챌린지 중독자",
                })
            }
            setLoading(false);
        } catch (error) {
            console.error('마이페이지 조회 오류:', error);
        }
      }

      if (user_token) {
        // const start = Date.now();
        getUserData();
        // 최소 0.4초 대기
        // const elapsed = Date.now() - start;
        // const delay = Math.max(600 - elapsed, 0); // 0.4초보다 적게 걸렸다면 남은 시간만큼 대기
        // setTimeout(() => setLoading(false), delay);
      } else console.warn('토큰이 없습니다.');
    } 
  }, []);

  
  // 친구 페이지 변경사항 업데이트
  // console.log("follower/following",follower, following)
  // useEffect(()=>{
  //   setUserData(prevData => ({
  //     ...prevData,
  //     followers: follower ? follower : userData.followers,
  //     followees: following ? following : userData.followees
  //   }));
  // }, [following, follower])

  useEffect(()=>{
    setUserData(prevData => ({
      ...prevData,
      reward: totalReturn ? totalReturn : userData.reward,
    }));
  }, [totalReturn])
    

  const [showPEModal, setShowPEModal] = useState(false);
  const [showSEModal, setShowSEModal] = useState(false);

  const navigate = useNavigate();

  const goToMyCHallenge = () => {                                    // 3
    navigate('/mychallenge');
  };

  if(loading){
    return(<div className="w-full h-[734px] grid items-center">
      <div className="spinner"></div>
    </div>)
  }


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
                onClick={()=>{logout()}}>
                로그아웃
              </button>
            </div>
            <h2 className="text-[13px] font-bold text-[#6E6053] ">
              {userData.badgeDescription}
            </h2>
            <div className="flex items-center gap-3 text-xs text-[#6E6053]">
              <span>
                팔로워 
                <span className="ml-[7px] font-bold">{userData.followers}</span>
              </span>
              {/* Separator */}
              <hr orientation="vertical" className="h-[10px] mt-[4px] border-[#6E6053] border-l-[0.1px]" />
              <span>
                팔로잉 
                <span className="ml-[7px] font-bold">{userData.followees}</span>
              </span>
              <button
                variant="outline"
                size="sm"
                className="grid place-items-center w-[22px] h-[22px] rounded-full p-0 border-[1.5px] border-[#6e6053]"
              >
                <UserPlus className="h-[13px] w-[13px] stroke-[#6E6053] stroke-[2px]"  
                  onClick={()=>{navigate("/friend", {
                    state: {
                      follower: userData.followers,
                      following: userData.followees,
                      userData: userData,
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
        <UserDepositReward deposit={userData.challengeMoney} reward={userData.returnMoney} />

        {/* Activity Badges Section */}
        <ActivityBadgesSection user_token={user_token}/>

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
          <div className="flex flex-col">
            <button className="text-xs text-[#6e6053] text-left mt-1 ml-1" >1:1 문의</button>
            <button className="text-xs text-[#6e6053] text-left mt-1 ml-1" >약관 및 정책</button>
            <button className="text-xs text-[#6e6053] text-left mt-1 ml-1" onClick={()=>{setShowSEModal(true)}} >탈퇴하기</button>
          </div>
        </div>

        {showPEModal && <ProfileEditModal origNickname={userData.nickname} origPI={userData.profileImage} origDescription={userData.description} onClose={setShowPEModal} changeUserData={setUserData}/>}
        {showSEModal && <SecedeModal onClose={setShowSEModal} user_token={user_token} logout={logout}/>}
      </main>
  );
}
