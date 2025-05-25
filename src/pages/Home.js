import React, { useState } from 'react';
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

import "../styles/Challenge/ChallengeCard.css";
import "../styles/Home/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const { isLoggedIn } = useAuthStore();

  const [activeTab, setActiveTab] = useState('participating');
  const [activeCategory, setActiveCategory] = useState('전체');
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const categories = ['전체', '운동', '공부', '생활', '기타'];

  const challenges = [
    {
      id: 1,
      title: '하루 30분 운동',
      start_date: '2025-05-03',
      end_date: '2025-05-10',
      tag: '#아침 운동',
      image: dumbell,
      challenge_public: false, //테스트용
      invite_code: '123456' //테스트용
    },
    {
      id: 2,
      title: '30분 독서',
      start_date: '2025-05-02',
      end_date: '2025-05-05',
      tag: '#공부',
      image: books
    },
    {
      id: 3,
      title: '일어나서 물 한 잔',
      start_date: '2025-05-04',
      end_date: '2025-05-09',
      tag: '#생활',
      image: water
    },
    {
      id: 4,
      title: '아침 8시 기상',
      start_date: '2025-05-06',
      end_date: '2025-05-12',
      tag: '#생활',
      image: sun
    },
    {
      id: 4,
      title: '아침 8시 기상',
      start_date: '2025-05-06',
      end_date: '2025-05-12',
      tag: '#생활',
      image: sun
    },
    {
      id: 4,
      title: '아침 8시 기상',
      start_date: '2025-05-06',
      end_date: '2025-05-12',
      tag: '#생활',
      image: sun
    },
    {
      id: 4,
      title: '아침 8시 기상',
      start_date: '2025-05-06',
      end_date: '2025-05-12',
      tag: '#생활',
      image: sun
    }
  ];

  const filteredChallenges = challenges
  .filter((c) =>
    activeCategory === '전체' ? true : c.tag.includes(activeCategory)
  )
  .filter((c) =>
    c.title.toLowerCase().includes(query) ||
    c.description?.toLowerCase().includes(query)
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
          {categories.map((category) => (
            <button
              key={category}
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
          <div className="grid grid-cols-2 gap-4">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
          </div>
        </div>

        
      </div>
      <Footer page="home" />
      {!isLoggedIn && requestLogin ? <RequestLogin onClose={setRequestLogin} purpose={"생성"}/> : "" }
    </div>
  );
};

export default Home;