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

// Badges Image
import badge1 from "../../assets/images/mypage/badge/badge1.png";
import badge2 from "../../assets/images/mypage/badge/badge2.png";
import badge3 from "../../assets/images/mypage/badge/badge3.png";
import badge4 from "../../assets/images/mypage/badge/badge4.png";
import badge5 from "../../assets/images/mypage/badge/badge5.png";
import badge6 from "../../assets/images/mypage/badge/badge6.png";
import badge7 from "../../assets/images/mypage/badge/badge7.png";
import badge8 from "../../assets/images/mypage/badge/badge8.png";
import badge9 from "../../assets/images/mypage/badge/badge9.png";
import badge10 from "../../assets/images/mypage/badge/badge10.png";
import badge11 from "../../assets/images/mypage/badge/badge11.png";
import badge12 from "../../assets/images/mypage/badge/badge12.png";
import badge13 from "../../assets/images/mypage/badge/badge13.png";

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

export default function AfterLoginMP({logout, setUserNickName}) {

  const location = useLocation();

  const { following, follower, totalReturn, origUserData } = location.state || {};

  const { user_token } = useAuthStore();

  // User data
  const [userData, setUserData] = useState(origUserData ? origUserData : false);

  const dummyUserData = {
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
  };

  // Badges Data
  const [badges, setBadges] = useState([]);

  // Calendar Data
  const [authDates, setAuthDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
                setUserData(dummyUserData);
            }
        } catch (error) {
            console.error('마이페이지 조회 오류:', error);
        }
      }

      const getBadges = async ()=>{
        try {
            const res = await fetch('http://localhost:8080/user/badges', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user_token}`
                },
            });
  
            const data = await res.json();
            console.log("Activity Badges check", data.isSuccess, data.result);
  
            if(data.isSuccess){
                setBadges(data.result);
            } else{
                console.log(`⚠ ${data.message}`);
  
                setBadges([{
                    badgeId: 1,
                    name: "새싹 챌린저",
                    description: "가입 후 첫 챌린지 참여",
                    unlockCondition: "가입 후 첫 챌린지 참여",
                    isVisible: true,
                    image: badge1
                },
                {
                    badgeId: 2,
                    name: "열정의 시작",
                    description: "첫 챌린지 성공",
                    unlockCondition: "챌린지 1회 참여 완료",
                    isVisible: true,
                    image: badge2
                },
                {
                    badgeId: 3,
                    name: "첫 팔로워",
                    description: "첫 팔로워 추가",
                    unlockCondition: "첫 팔로워 추가",
                    isVisible: true,
                    image: badge3
                },
                {
                    badgeId: 4,
                    name: "도전자 챌린저",
                    description: "챌린지 3회 이상 성공",
                    unlockCondition: "챌린지 3회 이상 성공",
                    isVisible: false,
                    image: badge4
                },
                {
                    badgeId: 5,
                    name: "연속 성공 챌린저",
                    description: "7회 연속 챌린지 성공",
                    unlockCondition: "7회 연속 챌린지 성공",
                    isVisible: false,
                    image: badge5
                },
                {
                    badgeId: 6,
                    name: "열정 챌린저",
                    description: "7일 이상 챌린지 연속 참여",
                    unlockCondition: "7일 이상 챌린지 연속 참여",
                    isVisible: false,
                    image: badge6
                },
                {
                    badgeId: 7,
                    name: "꾸준 챌린저",
                    description: "총 15회 이상 챌린지 참여",
                    unlockCondition: "총 15회 이상 챌린지 참여",
                    isVisible: false,
                    image: badge7
                },
                {
                    badgeId: 8,
                    name: "개근왕",
                    description: "한 달 간 매일 챌린지 참여",
                    unlockCondition: "한 달 간 매일 챌린지 참여",
                    isVisible: false,
                    image: badge8
                },
                {
                    badgeId: 9,
                    name: "챌린지 중독자",
                    description: "챌린지 30개 이상 참여 완료",
                    unlockCondition: "챌린지 30개 이상 참여 완료",
                    isVisible: false,
                    image: badge9
                },
                {
                    badgeId: 10,
                    name: "마스터 챌린저",
                    description: "50회 이상 챌린지 완료",
                    unlockCondition: "50회 이상 챌린지 완료",
                    isVisible: false,
                    image: badge12
                },
                {
                    badgeId: 11,
                    name: "전설 챌린저",
                    description: "100일 이상 챌린지 연속 참여 및 완료",
                    unlockCondition: "100일 이상 챌린지 연속 참여 및 완료",
                    isVisible: false,
                    image: badge11
                },
                {
                    badgeId: 12,
                    name: "리더 챌린저",
                    description: "그룹 챌린지에서 리더 역할 수행",
                    unlockCondition: "그룹 챌린지에서 리더 역할 수행",
                    isVisible: false,
                    image: badge12
                },
                {
                    badgeId: 13,
                    name: "챌린지 수호자",
                    description: "10명 이상의 다른 참여자에게 챌린지 권유 및 참여 유도(상대방이 권유 수락 시 인정)",
                    unlockCondition: "10명 이상의 다른 참여자에게 챌린지 권유 및 참여 유도(상대방이 권유 수락 시 인정)",
                    isVisible: false,
                    image: badge13
                },
              ])
            }
        } catch (error) {
            console.error('마이페이지 조회 오류:', error);
        }
      }

      const fetchCalendarData = async (date) => {
        const ym = date.toISOString().slice(0, 7).replace("-", "");
        try {
          const res = await fetch(
            `http://localhost:8080/challenge/calendar?ym=${ym}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user_token}`,
              },
            }
          );
    
          const data = await res.json();
    
          if (data?.isSuccess) {
            console.log("캘린더 조회 성공하였습니다.");
            setAuthDates(data.result.authDates);
            setLoading(false);
          } else {
            console.warn("응답 실패:", data.message);
            setAuthDates([]);
          }
        } catch (err) {
          console.error("fetch 에러:", err);
          setAuthDates([]);
        }
      };

      if (user_token) {
        // const start = Date.now();
        getUserData();
        getBadges();
        fetchCalendarData(currentMonth);
        // setLoading(false);
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
      returnMoney: totalReturn ? totalReturn : userData.returnMoney,
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
        <ActivityBadgesSection user_token={user_token} badgeList={badges}/>

        {/* Challenge Management */}
        <div className="mt-[23px] mb-4">
          <h3 className="text-sm font-semibold text-[#6e6053] ml-[2px]">
            챌린지 관리
          </h3>
          <button className="text-xs text-[#6e6053] mt-1 ml-1" onClick={goToMyCHallenge}>마이 챌린지</button>
        </div>

        {/* Calendar Section */}
        <CalendarSection authDateList={authDates}/>

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
