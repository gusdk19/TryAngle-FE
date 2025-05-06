import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../styles/challengeDetail/challengeDetail.css";

import DetailNav from "../components/ChallengeDetail/DetailNav";
import Banner from "../components/ChallengeDetail/Banner";

import Vertify from "../components/ChallengeDetail/Vertify";
import Info from "../components/ChallengeDetail/Info";
import Vote from "../components/ChallengeDetail/Vote";
import ChallengeFooter from "../components/ChallengeDetail/ChallengeFooter";


export default function ChallengeDetail() {
  // Login State (로그인 x : 0, 로그인 o : 1)
  const location = useLocation();

  const { tab } = location.state || {};

  const { id } = useParams(); // URL에 있는 id 값(challenge_id) 가져오기
  console.log("challengeID",id);

  const [challengeData, setChallengeData] = useState({
    "challenge_name": "챌린지 1",
    "challenge_thumbnail": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
    "challenge_shrotintro": "기상스터디",
    "challenge_descripton": "챌린지 1 입니다",
    "category": 1,
    "challenge_public": true,
    "start_date": "2025-02-21",
    "end_date": "2025-05-21",
    "auth_time_start": "06:00",
    "auth_time_end": "22:00",
    "max_people": 10,
    "min_deposit": 1000,
    "return_type": 1,
    "auth_frequency": "참여빈도",
    "vertify_method" : "인증방법 소개글 + 참가 멤버 인증 투표 안내",
    "now_people" : 8,
    "description": "챌린지 내용 + 예치금 관련 공지",
    "status" : -1,
    "participant_list" : [3],
  });

  const page = "challengeDetail";

  const [navTab, setNavTab] = useState(tab ? tab : "vertify");

  const now = new Date();
  const startDate = new Date(challengeData.start_date);
  const endDate = new Date(challengeData.end_date);
  // 날짜 차이 계산 (밀리초 단위)
  const timeDiff = startDate.getTime() - now.getTime();

  // 밀리초 → 일수 (1일 = 1000 * 60 * 60 * 24)
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // 진행 상태
  const status = now < startDate ? 0 : now > endDate ? 2 : 1; // 0 : 예정, 1 : 진행중, 2 : 진행 완료료 


  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        {/* Header */}
        <Header title={challengeData.challenge_name} page={page}/>
        <hr className="m-0"/>
        <DetailNav tab={navTab} setTab={setNavTab}/>

        {/* Main Content */}
        {navTab == "vote" ? 
          <Vote challengeID={id} />
        : <>
          {/* Banner */}
          <Banner image={challengeData.challenge_thumbnail} />
          
          {/* Title */}
          <div className="flex justify-between">
            <div className="flex-1 flex px-5 gap-4">
              <div className="flex-none text-[20px] text-[#4A483F] font-bold">
                {challengeData.challenge_name}
              </div>
              <button className="flex-none my-auto mt-[6px] rounded-md px-1 text-[11px] w-[60px] h-[20px] text-white bg-[#6E6053] cursor-default">
                {status == 0 ? "예정" : status == 1 ? "진행중" : "진행완료"}
              </button>
            </div>
            <div className="flex-none">
              {dayDiff > 0 && <div className='due-date'>D-{dayDiff}</div>}
            </div>
          </div>


          {/* Main Component */}
          <div className="h-[470px] px-5 overflow-scroll main">
            {navTab == "vertify" ? 
              <Vertify vertifyMethod = {challengeData.vertify_method ? challengeData.vertify_method : "인증방법 소개글"} /> :
            navTab == "info" ?
              <Info challengeData={challengeData}/> :
              <></>
            }
          </div>
        </>}
      
        {/* Footer Navigation */}
        {navTab == "info" ?
        <ChallengeFooter status={challengeData.status} challengeID={id} setChallengeData={setChallengeData} participant_list={challengeData.participant_list}/> : ""}
      </div>
    </div>
  );
}
