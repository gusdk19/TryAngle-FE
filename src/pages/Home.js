import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from "../components/Home/SearchBar";
import dumbell from '../assets/images/finace/dumbell.png';
import books from '../assets/images/finace/books.png';
import water from '../assets/images/finace/water.png';
import sun from '../assets/images/finace/Sun.png';
import bannerImage from '../assets/images/common/bannerimage.png';
import ChallengeCard from "../components/Challenge/ChallengeCard";
import useAuthStore from "../components/User/UseAuthStore.js";
import RequestLogin from "../components/ChallengeDetail/RequestLogin";
import InviteCodeModal from '../components/Challenge/InviteCodeModal.js';

import "../styles/Challenge/ChallengeCard.css";
import "../styles/Home/Home.css";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {

  const location = useLocation();

  const {inviteCode, challID, IVModal} = location.state || {};

  const { isLoggedIn } = useAuthStore();

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('participating');
  const [activeCategory, setActiveCategory] = useState('전체');
  const [query, setQuery] = useState("");

  const [showInviteModal, setShowInviteModal] = useState(IVModal ? IVModal : false);
  const [challengeID, setChallengeID] = useState(challID ? challID : "");
  const [correctCode, setCorrectCode] = useState(inviteCode ? inviteCode : "123456");

  const navigate = useNavigate();

  const categories = ['전체', '운동', '공부', '생활', '기타'];

  const [challenges, setChallenges] = useState([]);
  const dummy_challenges = [
    {
      challenge_id: 1,
      title: '하루 30분 운동',
      start_date: '2025-05-03',
      end_date: '2025-05-10',
      tag: '#아침 운동',
      image: dumbell,
      challenge_public: false, //테스트용
      invite_code: '123456' //테스트용
    },
    {
      challenge_id: 2,
      title: '30분 독서',
      start_date: '2025-05-02',
      end_date: '2025-05-05',
      tag: '#공부',
      challenge_public: true,
      image: books
    },
    {
      challenge_id: 3,
      title: '일어나서 물 한 잔',
      start_date: '2025-05-04',
      end_date: '2025-05-09',
      tag: '#생활',
      challenge_public: true,
      image: water
    },
    {
      challenge_id: 4,
      title: '아침 8시 기상',
      start_date: '2025-05-06',
      end_date: '2025-05-12',
      tag: '#생활',
      challenge_public: true,
      image: sun
    },
    {
      challenge_id: 4,
      title: '아침 8시 기상',
      start_date: '2025-05-06',
      end_date: '2025-05-12',
      tag: '#생활',
      challenge_public: true,
      image: sun
    },
    {
      challenge_id: 4,
      title: '아침 8시 기상',
      start_date: '2025-05-06',
      end_date: '2025-05-12',
      tag: '#생활',
      challenge_public: true,
      image: sun
    },
    {
      challenge_id: 4,
      title: '아침 8시 기상',
      start_date: '2025-05-06',
      end_date: '2025-05-12',
      tag: '#생활',
      challenge_public: true,
      image: sun
    }
  ];

  useEffect(()=>{
    const start = Date.now();

    const getChallengeList = async()=>{
      try {
        const res = await fetch(`http://localhost:8080/challenge`, {
            method: 'GET',
            credentials: 'include'
            // headers: {
            //     'Content-Type': 'application/json',
            // },
        });

        const data = await res.json();
        console.log("challenge List check", data.isSuccess, data.result);

        if(data.isSuccess){
            setChallenges(data.result);
        } else{
            console.log(`⚠ ${data.message}`);
            setChallenges(dummy_challenges);
        }

        setLoading(false);
      } catch (error) {
          console.error('개별 챌린지 조회 오류:', error);
      }
    }

    getChallengeList();
  }, []);


  const categoryMap = {
    운동: 'WORKOUT',
    공부: 'STUDY',
    생활: 'LIFE',
    기타: 'ETC',
  };

  const filteredChallenges = challenges
  .filter((c) => {
    const today = new Date();
    const start_date = new Date(c.start_date);

    return(activeTab === "participating" ? start_date > today : start_date <= today)
  })
  .filter((c) => {
    if (activeCategory === '전체') return true;
    const categoryCode = categoryMap[activeCategory];
    console.log('선택:', activeCategory, ' → 매핑:', categoryCode, ' | 챌린지 카테고리:', c.category);
    return c.category === categoryCode;
  })
  .filter((c) =>
    c.challenge_name.toLowerCase().includes(query) ||
    c.challenge_description?.toLowerCase().includes(query)
  );

  const [requestLogin, setRequestLogin] = useState(false);
  

  return (
    <div className="bg-white flex flex-row justify-center w-full h-[852px] relative">
      {/* 모바일 프레임 */}
      <div className="flex flex-col bg-white w-[393px] h-[790px] ">
        <div className="flex-none">
          <Header title="홈"/>
        </div>
        {/* 배너 이미지 삽입*/}
        <img src={bannerImage} alt="banner" className="w-full" /> 

        {/* 검색창 */}
        <div className="flex-none px-4 mt-4">
            <SearchBar query={query} setQuery={setQuery} />
        </div>
                  
        {/* 탭 영역 */}
        <div className="flex-none flex justify-between items-center px-4 mt-[43px]">
          <div className="flex space-x-10">
            <button
                className={`text-lg font-semibold ${
                activeTab === 'participating'
                    ? 'border-b-2 border-[#4A483F] text-[#4A483F]'
                    : 'text-[#4A483F]'
                }`}
                onClick={() => setActiveTab('participating')}
            >
                참여모집
            </button>
            <button
                className={`text-lg font-semibold ${
                activeTab === 'ongoing'
                    ? 'border-b-2 border-[#4A483F] text-[#4A483F]'
                    : 'text-[#4A483F]'
                }`}
                onClick={() => setActiveTab('ongoing')}
            >
                진행중
            </button>
          </div>
          <button 
            className="w-[23px] h-[22px] bg-[#FDF8ED] rounded-[2px] border-b border-[#4A483F] text-[#4A483F] text-[16px] font-bold flex items-center justify-center shadow hover:bg-yellow-200"
            onClick={() => {
              if(isLoggedIn){
                navigate('/add-challenge/public');
              } else{
                setRequestLogin(true);
              }}}
          >
            +
          </button>
        </div>

        {/* 카테고리 */}
        <div className="flex-none flex justify-center gap-3 mt-[20px]">
          {categories.map((category, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded-[5px] text-sm ${
                activeCategory === category
                  ? 'bg-[#6E6053] text-white'
                  : 'bg-white text-[#4A483F]'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              #{category}
            </button>
          ))}
        </div>

        {/* 챌린지 카드 */}
        <div className="flex-1 overflow-y-auto p-4 pb-[18px] main overflow-scroll">
          {loading ? <div className="w-full h-full grid items-center">
                  <div className="spinner"></div>
              </div>
            :<div className="grid grid-cols-2 gap-4">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} 
                setShowInviteModal={setShowInviteModal} setCorrectCode={setCorrectCode} setChallengeID={setChallengeID}/>
            ))}
          </div>}
        </div>

        
      </div>
      <Footer page="home" />
      {!isLoggedIn && requestLogin ? <RequestLogin onClose={setRequestLogin} purpose={"생성"} prevPage="home"/> : "" }
    
      {showInviteModal && (
        <InviteCodeModal
          onClose={() => setShowInviteModal(false)}
          challengeId={challengeID}
          correctCode={correctCode}
        />
      )}
    </div>
  );
};

export default Home;