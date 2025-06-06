import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import "../styles/Challenge/ChallengeFeeRefund.css";

export default function ChallengeFeeRefund() {

  const location = useLocation();

  const {prevPage} = location.state || {};

  const [inputAmount, setInputAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id: challengeID } = useParams(); // URL의 challengeID

  const formatWithCommas = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const removeCommas = (value) => {
    return value.replace(/,/g, '');
  }

  const handleInputChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, ''); // 숫자만
    const formatted = formatWithCommas(raw);
    setInputAmount(formatted);
    setError('');
  }

  const isValidAmount = (amountStr) => {
    const amount = parseInt(removeCommas(amountStr), 10);
    return amount >= 1000 && amount <= 200000 && amount % 1000 === 0;
  }

  const handleCharge = () => {
    const amount = removeCommas(inputAmount);

    if (!amount) {
      setError('⚠ 챌린지 비용을 입력해주세요');
      return;
    }

    if (!isValidAmount(inputAmount)) {
      setError('⚠ 1천원 이상 20만원 이하, 1천원 단위로 입력해주세요');
      return;
    }

    // status(참여상태) : 1로 바꾸는 api post 또는 put 요청 필요

    navigate(`/challenge/${challengeID}`, {state:{tab: "info", updatedStatus : 1, prevPage: prevPage}});
  }

  return (
    <div  className="bg-white flex flex-row justify-center w-full ">
      {/* 모바일 프레임 */}
      <div className="bg-white w-[393px] h-[852px] relative">
        <Header title="참가비 설정" />

        {/* 안내 문구 및 입력 영역 */}
        <main className="flex-1 max-h-[690px] overflow-scroll scrollbar-hide px-4 pb-4">
          <div className="flex flex-col gap-6">
            <section>
              <h2 className="pt-8 text-[26px] font-bold">챌린지 비용 💰</h2>
              <p className=" pt-3 text-sm mt-1 text-[#5C5C5C]">
                시작 전에 돈을 걸면, 종료 시점 달성률에 따라 환급해드립니다!
              </p>
            </section>

            <section className="pt-10 flex flex-col gap-2">
              <input
                type="text"                
                value={inputAmount}
                onChange={handleInputChange}
                className="w-full text-[25px] text-center font-bold py-2 outline-none border-b border-black block"
              />
              <p className='text-sm mt-1 text-[#5C5C5C]'>
                최소 1,000원 ~ 최대 200,000원 (1천원, 1만원 단위 가능)
              </p>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </section>

            <div className="border border-[#D9D9D9] rounded-[15px] p-4 text-sm text-[#3D3D3D]">
            <section className="text-s text-[#3D3D3D]">
              <ul className="list-disc list-inside">
                <p>100% 성공 ---------------------------10,000 + α원</p>
                <p>90% 이상 성공 ---------------------------10,000원</p>
                <p>50% 이상 90% 미만 ----------------------일부 환급</p>
                <p>50% 미만 성공 ----------------------------환급 없음</p>
              </ul>
              
            </section>
            </div>

            <button
              onClick={handleCharge}
              disabled={!!error || !inputAmount}
              className={`w-full py-3 rounded-lg font-bold text-white ${
                error || !inputAmount
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#FAB809]'
              }`}
            >
              {inputAmount ? `${inputAmount}원 충전하기` : '충전하기'}
            </button>

            <p className="mt-2 text-s text-[#5C5C5C]">
                ※ α란? <br />
                챌린지를 성공하지 못한 챌린저들의 환급되지 못한 <br />
                예치금을 성공한 챌린저들이 나눠 갖게 됩니다
              </p>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}