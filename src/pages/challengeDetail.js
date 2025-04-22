import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

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
    "end_date": "2025-03-21",
    "auth_time_start": "06:00",
    "auth_time_end": "22:00",
    "max_people": 10,
    "min_deposit": 1000,
    "return_type": 1,
    "auth_frequency": "참여빈도"
  });

  const page = "challengeDetail";

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        {/* Header */}
        <Header title={challengeData.challenge_name}/>
        <hr className="m-0"/>
      
        {/* Main Content */}
        
        

        {/* Footer Navigation */}
        <Footer page={page}/>
        
      </div>
    </div>
  );
}
