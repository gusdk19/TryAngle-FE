import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
//import { FaRegBell } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function ChallengeAdd() {
  const [visibility, setVisibility] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (visibility == 'public') {
      navigate('/add-challenge/content', { state: { visibility: visibility, from:"add-challenge" } });
    } else if (visibility == 'private'){
      navigate('/add-challenge/invite', { state: { visibility: visibility, from:"add-challenge" } });
    } else {
      alert('챌린지 공개 여부를 선택해주세요!');
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      {/* 모바일 프레임 */}
      <div className="bg-white w-[393px] h-[852px] relative">
        <Header />

        {/* 본문 */}
        <div className="px-4 pt-[40px]">
          <h2 className="px-1 mb-[45px] text-[24px] font-bold text-[#4A483F]">
            챌린지 공개 여부를
            <p>선택해주세요!</p>
          </h2>

          {/* 공개 챌린지 */}
          <div
            onClick={() => {setVisibility('public')}}
            className={`border rounded-xl p-4 mb-8 cursor-pointer transition ${
              visibility === 'public'
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-300'
            }`}
          >
            <strong className="text-[#000] text-[20px]">공개 챌린지 👀</strong>
            <p className="text-[18px] text-[#3D3D3D] mt-1">
              트라이 앵글 이용자 모두와 함께 참여하는 열정적인 챌린지
            </p>
          </div>

          {/* 비공개 챌린지 */}
          <div
            onClick={() => {
              setVisibility("private");
            }}
            className={`border rounded-xl p-4 mb-8 cursor-pointer transition ${
              visibility === 'private'
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-300'
            }`}
          >
            <strong className="text-[#000] text-[20px]">비공개 챌린지 🔒</strong>
            <p className="text-[18px] text-[#3D3D3D] mt-1">
              초대받은 사람끼리 참여할 수 있는 비밀스러운 챌린지
            </p>
          </div>

          {/* 다음 버튼 */}
          <button
            onClick={handleNext}
            className="bg-[#FAB809] hover:bg-yellow-500 text-white font-bold py-2 w-full rounded-xl"
          >
            다음
          </button>
        </div>

      </div>
      <Footer page="home" />
    </div>
  );
}