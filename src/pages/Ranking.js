import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import rank_bannerImage from '../assets/images/common/rank_bannerimage.png';
import useAuthStore from "../components/User/UseAuthStore.js";
import RequestLogin from "../components/ChallengeDetail/RequestLogin";
import "../styles/Home/Home.css";
import { useNavigate } from "react-router-dom";

import bpi_1 from "../assets/images/mypage/basic_profile_image/basic_profile_image_1.png"
import bpi_2 from "../assets/images/mypage/basic_profile_image/basic_profile_image_2.png"
import bpi_3 from "../assets/images/mypage/basic_profile_image/basic_profile_image_3.png"
import bpi_4 from "../assets/images/mypage/basic_profile_image/basic_profile_image_4.png"
import bpi_5 from "../assets/images/mypage/basic_profile_image/basic_profile_image_5.png"


const sampleRankingData = [
  { rank: 1, name: "다연츄", description: "챌린지 중독자!", profileImage: bpi_1 },
  { rank: 2, name: "효나츄", description: "꾸준히 도전 중", profileImage: bpi_2 },
  { rank: 3, name: "혜원츄", description: "열정 만수르", profileImage: bpi_3 },
  { rank: 4, name: "고은츄", description: "도전 초보", profileImage: bpi_4 },
  { rank: 5, name: "타타", description: "도전자", profileImage: bpi_5},
];

const Ranking = () => {

  const { isLoggedIn } = useAuthStore();

  const [activeTab, setActiveTab] = useState('overall');
  
  const [query, setQuery] = useState("");
  const navigate = useNavigate();


  const [requestLogin, setRequestLogin] = useState(false);
  

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      {/* 모바일 프레임 */}
      <div className="bg-white w-[393px] h-[852px] relative">
        <Header className="flex-none" title="랭킹"/>
        {/* 배너 이미지 삽입*/}
        <img src={rank_bannerImage} alt="banner" className="w-full" /> 
  
        {/* 탭 영역 */}
        <div className="flex justify-center items-center mt-[43px] space-x-10">
          
            <button
                className={`text-lg font-semibold ${
                activeTab === 'overall'
                    ? 'border-b-2 border-[#4A483F] text-[#4A483F]'
                    : 'text-[#4A483F]'
                }`}
                onClick={() => setActiveTab('overall')}
            >
                전체 랭킹
            </button>
            <button
                className={`text-lg font-semibold ${
                activeTab === 'follower'
                    ? 'border-b-2 border-[#4A483F] text-[#4A483F]'
                    : 'text-[#4A483F]'
                }`}
                onClick={() => setActiveTab('follower')}
            >
                팔로워 랭킹
            </button>
        </div>
        {/* 랭킹 */}
         <main className="main h-[593px] overflow-auto px-5 mt-[20px] pb-6">
            {sampleRankingData.map((user) => (
                <div key={user.rank} className="flex items-center space-x-3 mb-4">
                {/* 순위 동그라미 */}
                <div className="relative w-11 h-11 flex items-center justify-center">
                    {/* 바깥 원 */}
                    <div className={`
                        absolute inset-0 rounded-full z-0
                        ${user.rank === 1 ? 'bg-[#FDE39D]' :
                        user.rank === 2 ? 'bg-[#E1E0E1]' :
                        user.rank === 3 ? 'bg-[#DFC891]' :
                        'bg-[#D9D9D9]'}
                    `} />


                    {/* 안쪽 원 (기존 내용) */}
                    <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10
                        ${user.rank === 1 ? 'bg-[#FED20D] text-white' :
                        user.rank === 2 ? 'bg-[#C2C4C5] text-white' :
                        user.rank === 3 ? 'bg-[#D3B05C] text-white' :
                        'bg-[#FFFFFF] text-[#838687]'}
                    `}>
                        {user.rank}
                    </div>
                </div>

                {/* 유저 카드 */}
                <div className="flex-1 bg-[#FFFAF0] p-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                    <img src={user.profileImage} alt="profile" className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.description}</p>
                    </div>
                    </div>
                    {/* 예: 점수 뱃지 (3등만 예시로 있음) */}
                    {user.score && (
                    <span className="bg-red-500 text-white text-sm px-2 py-0.5 rounded-md font-semibold">
                        {user.score}
                    </span>
                    )}
                </div>
                </div>
            ))}
         </main>
        <Footer page="ranking" />
      </div>
      {!isLoggedIn && requestLogin ? <RequestLogin onClose={setRequestLogin} purpose={"생성"}/> : "" }
    </div>
  );
};

export default Ranking;