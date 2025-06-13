import { Award, Code, Lock } from "lucide-react";
import { LiaAwardSolid } from "react-icons/lia";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

import React, { useEffect, useRef, useState } from "react";

export default function ActivityBadgesSection({user_token, badgeList}) {

  // Badge data for mapping
  const [badges, setBadges] = useState(badgeList || []);

  // useEffect(()=>{
  //   const getBadges = async ()=>{
  //     try {
  //         const res = await fetch('http://localhost:8080/user/badges', {
  //             method: 'GET',
  //             headers: {
  //               'Content-Type': 'application/json',
  //               'Authorization': `Bearer ${user_token}`
  //             },
  //         });

  //         const data = await res.json();
  //         console.log("Activity Badges check", data.isSuccess, data.result);

  //         if(data.isSuccess){
  //             setBadges(data.result);
  //         } else{
  //             console.log(`⚠ ${data.message}`);

  //             setBadges([{
  //                 badgeId: 1,
  //                 name: "새싹 챌린저",
  //                 description: "가입 후 첫 챌린지 참여",
  //                 unlockCondition: "가입 후 첫 챌린지 참여",
  //                 isVisible: true,
  //                 image: badge1
  //             },
  //             {
  //                 badgeId: 2,
  //                 name: "열정의 시작",
  //                 description: "첫 챌린지 성공",
  //                 unlockCondition: "챌린지 1회 참여 완료",
  //                 isVisible: true,
  //                 image: badge2
  //             },
  //             {
  //                 badgeId: 3,
  //                 name: "첫 팔로워",
  //                 description: "첫 팔로워 추가",
  //                 unlockCondition: "첫 팔로워 추가",
  //                 isVisible: true,
  //                 image: badge3
  //             },
  //             {
  //                 badgeId: 4,
  //                 name: "도전자 챌린저",
  //                 description: "챌린지 3회 이상 성공",
  //                 unlockCondition: "챌린지 3회 이상 성공",
  //                 isVisible: false,
  //                 image: badge4
  //             },
  //             {
  //                 badgeId: 5,
  //                 name: "연속 성공 챌린저",
  //                 description: "7회 연속 챌린지 성공",
  //                 unlockCondition: "7회 연속 챌린지 성공",
  //                 isVisible: false,
  //                 image: badge5
  //             },
  //             {
  //                 badgeId: 6,
  //                 name: "열정 챌린저",
  //                 description: "7일 이상 챌린지 연속 참여",
  //                 unlockCondition: "7일 이상 챌린지 연속 참여",
  //                 isVisible: false,
  //                 image: badge6
  //             },
  //             {
  //                 badgeId: 7,
  //                 name: "꾸준 챌린저",
  //                 description: "총 15회 이상 챌린지 참여",
  //                 unlockCondition: "총 15회 이상 챌린지 참여",
  //                 isVisible: false,
  //                 image: badge7
  //             },
  //             {
  //                 badgeId: 8,
  //                 name: "개근왕",
  //                 description: "한 달 간 매일 챌린지 참여",
  //                 unlockCondition: "한 달 간 매일 챌린지 참여",
  //                 isVisible: false,
  //                 image: badge8
  //             },
  //             {
  //                 badgeId: 9,
  //                 name: "챌린지 중독자",
  //                 description: "챌린지 30개 이상 참여 완료",
  //                 unlockCondition: "챌린지 30개 이상 참여 완료",
  //                 isVisible: false,
  //                 image: badge9
  //             },
  //             {
  //                 badgeId: 10,
  //                 name: "마스터 챌린저",
  //                 description: "50회 이상 챌린지 완료",
  //                 unlockCondition: "50회 이상 챌린지 완료",
  //                 isVisible: false,
  //                 image: badge12
  //             },
  //             {
  //                 badgeId: 11,
  //                 name: "전설 챌린저",
  //                 description: "100일 이상 챌린지 연속 참여 및 완료",
  //                 unlockCondition: "100일 이상 챌린지 연속 참여 및 완료",
  //                 isVisible: false,
  //                 image: badge11
  //             },
  //             {
  //                 badgeId: 12,
  //                 name: "리더 챌린저",
  //                 description: "그룹 챌린지에서 리더 역할 수행",
  //                 unlockCondition: "그룹 챌린지에서 리더 역할 수행",
  //                 isVisible: false,
  //                 image: badge12
  //             },
  //             {
  //                 badgeId: 13,
  //                 name: "챌린지 수호자",
  //                 description: "10명 이상의 다른 참여자에게 챌린지 권유 및 참여 유도(상대방이 권유 수락 시 인정)",
  //                 unlockCondition: "10명 이상의 다른 참여자에게 챌린지 권유 및 참여 유도(상대방이 권유 수락 시 인정)",
  //                 isVisible: false,
  //                 image: badge13
  //             },
  //           ])
  //         }
  //     } catch (error) {
  //         console.error('마이페이지 조회 오류:', error);
  //     }
  //   }

  //   if (user_token) {
  //     const start = Date.now();
  //     getBadges();
  //   } else console.warn('토큰이 없습니다.');
  // }, [])
  
  const [clickedBadge, setClickedBadge] = useState([]);

  useEffect(()=>{
    console.log(clickedBadge);
  },[clickedBadge])

  const toggleBadge = (badge) => {
    setClickedBadge((prev) => {
      if (prev.includes(badge)) {
        // 이미 클릭된 배지면 제거
        console.log("delete"+badge, clickedBadge.includes(badge));
        return prev.filter((b) => b !== badge);
      } else {
        // 클릭되지 않은 배지면 추가
        console.log("add"+badge, clickedBadge.includes(badge));
        return [...prev, badge];
      }
    });
  };

  // Navigation
  const badgesRef = useRef();

  const scrollLeft = () => {
    badgesRef.current.scrollBy({ left: -120, behavior: "smooth" });
  };

  const scrollRight = () => {
    badgesRef.current.scrollBy({ left: 120, behavior: "smooth" });
  };


  return (
    <div className="w-full mt-4">
      <div className="relative border border-[#b8aa96] rounded-[5px]">
        <div className="flex items-center p-3">
          <span className="text-[#b8aa96] text-sm font-medium">활동 배지</span>
          <LiaAwardSolid className="w-[20px] h-[20px] ml-[2px]" color="#b8aa96" />
          <div className="flex-grow"></div>
          <div className="flex flex-row">
            <button onClick={scrollLeft}>
                <MdNavigateBefore className="w-5 h-5" color="#b8aa96" />
            </button>
            <button onClick={scrollRight}>
                <MdNavigateNext className="w-5 h-5" color="#b8aa96"/>
            </button>
          </div>
        </div>

        <div className="p-4 pt-0 pb-1">
          <div className="flex flex-col">
            <div className="flex justify-between mb-2 overflow-x-hidden gap-[12px] px-1"
                ref={badgesRef}>
              {badges.length > 0 ? badges.map((badge) => (
                <button key={badge.badgeId} className="flex flex-col items-center text-pretty" 
                    onClick={()=>toggleBadge(badge.badgeId)}>
                  {!badge.isVisible ? (
                    <div className="grid items-center w-[50px] h-[50px] bg-[#fdf8ed] rounded-[5px] border border-solid border-[#b8aa96] justify-center">
                        {clickedBadge.includes(badge.badgeId) ? 
                        <span className="p-[2px] text-[7.5px] text-[#6e6053] font-bold tracking-[0.50px] mt-1 [font-family:'Roboto-Bold',Helvetica] ">
                            {badge.description}
                        </span> 
                        : <Lock className="w-[25px] h-[25px] pb-[1px]" color="#6e6053"/> }
                    </div>    
                    ) : (<div className="w-[45px] flex flex-col items-center justify-center">
                        {!clickedBadge.includes(badge.badgeId) ? (<img
                        src={badge.image}
                        alt={badge.name}
                        className="w-[50px] h-[50px] object-cover"
                        />)
                        :(<div className="px-[4px] grid items-center w-[50px] h-[50px] rounded-md text-[7.5px] text-[#6e6053] font-bold tracking-[0.50px] [font-family:'Roboto-Bold',Helvetica]
                          border border-solid border-[#b8aa96]">
                            {badge.description}
                        </div>)}
                        <span className="text-[8px] text-[#6e6053] font-bold tracking-[0.50px] mt-1 [font-family:'Roboto-Bold',Helvetica]">
                            {badge.name}
                        </span>
                    </div>
                  )}
                </button>
              )): ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
