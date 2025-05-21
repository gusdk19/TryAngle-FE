import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import rank_bannerImage from '../assets/images/common/rank_bannerimage.png';

import useAuthStore from "../components/User/UseAuthStore.js";
import RequestLogin from "../components/ChallengeDetail/RequestLogin";


import "../styles/Home/Home.css";
import { useNavigate } from "react-router-dom";

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
                activeTab === 'participating'
                    ? 'border-b-2 border-[#4A483F] text-[#4A483F]'
                    : 'text-[#4A483F]'
                }`}
                onClick={() => setActiveTab('participating')}
            >
                전체 랭킹
            </button>
            <button
                className={`text-lg font-semibold ${
                activeTab === 'ongoing'
                    ? 'border-b-2 border-yellow-400 text-[#4A483F]'
                    : 'text-[#4A483F]'
                }`}
                onClick={() => setActiveTab('ongoing')}
            >
                팔로워 랭킹
            </button>
          
          
        </div>

        

        <Footer page="ranking" />
      </div>
      {!isLoggedIn && requestLogin ? <RequestLogin onClose={setRequestLogin} purpose={"생성"}/> : "" }
    </div>
  );
};

export default Ranking;