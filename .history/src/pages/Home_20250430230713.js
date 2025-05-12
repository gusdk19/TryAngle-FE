import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dumbell from '../assets/images/finace/dumbell.png';
import books from '../assets/images/finace/books.png';
import water from '../assets/images/finace/water.png';
import sun from '../assets/images/finace/Sun.png';
import bannerImage from '../assets/images/common/banner_image.png';

const Home = () => {
  const [activeTab, setActiveTab] = useState('participating');
  const [activeCategory, setActiveCategory] = useState('전체');

  const categories = ['전체', '운동', '공부', '생활', '기타'];

  const challenges = [
    { id: 1, title: '하루 30분 운동', dday: 5, tag: '#아침 운동', image: dumbell },
    { id: 2, title: '30분 독서', dday: 1, tag: '#공부', image: books },
    { id: 3, title: '일어나서 물 한 잔', dday: 2, tag: '#생활', image: water },
    { id: 4, title: '아침 8시 기상', dday: 7, tag: '#생활', image: sun },
  ];

  const filteredChallenges =
    activeCategory === '전체'
      ? challenges
      : challenges.filter((c) => c.tag.includes(activeCategory));

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      {/* 모바일 프레임 */}
      <div className="bg-white w-[393px] h-[852px] relative">
        <Header />
        {/* 배너 이미지 삽입 (Header 아래에 추가) */}
        <img src={bannerImage} alt="banner" className="w-full" /> 

        {/* 탭 + 버튼 묶기 */}
        <div className="flex justify-between items-center px-4 mt-4">
        <div className="flex space-x-6">
            <button className={`text-lg font-semibold ...`}>참여모집</button>
            <button className={`text-lg font-semibold ...`}>진행중</button>
        </div>
        <button
            className="bg-yellow-400 text-white text-xl w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-yellow-500"
            //onClick={() => navigate('/challenge/add')}
        >
            +
        </button>
        </div>

        {/* 카테고리 */}
        <div className="flex justify-center gap-3 mt-3">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === category
                  ? 'bg-yellow-400 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              #{category}
            </button>
          ))}
        </div>

        {/* 챌린지 카드 */}
        <div className="flex-grow overflow-y-auto p-4 pb-[100px]">
          <div className="grid grid-cols-2 gap-4">
            {filteredChallenges.map((c) => (
              <div
                key={c.id}
                className="bg-white p-3 rounded-xl shadow hover:bg-yellow-200 transition"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-24 object-contain mb-2"
                />
                <p className="font-semibold">{c.title}</p>
                <p className="text-sm text-gray-600">D-{c.dday}</p>
                <p className="text-xs text-gray-400 mt-1">{c.tag}</p>
              </div>
            ))}
          </div>
        </div>

        <Footer page="home" />
      </div>
    </div>
  );
};

export default Home;