import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TotalFinanceBox from "../components/Finance/TotalFinanceBox";
import FinanceRecord from "../components/Finance/FinanceRecord";
import WithdrawalModal from "../components/Finance/WithdrawalModal";

import books from "../assets/images/finance/books.png";
import water from "../assets/images/finance/water.png";
import dumbell from "../assets/images/finance/dumbell.png";

import "../styles/finance/finance.css";
import { useLocation } from "react-router-dom";
import useAuthStore from "../components/User/UseAuthStore";

export default function Finance() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const page = "finance";

  const { user_token } = useAuthStore();

  const location = useLocation();

  const { deposit, reward } = location.state || {};

  const [loading, setLoading] = useState(true);

  const [financeStatus, setFinanceStatus] = useState([]);

  const dummyFinanceStatus = [
    {
      challenge_id: 1,
      challenge_name: "하루에 물 한 잔잔",
      challenge_thumbnail: water,
      deposit: 100000,
      deposit_date: "2025-03-01",
      status: "진행중",
      return: 0,
      deposit_return_date: null,
    },
    {
      challenge_id: 2,
      challenge_name: "하루 30분 운동",
      challenge_thumbnail: dumbell,
      deposit: 100000,
      deposit_date: "2025-03-05 10:43:15",
      status: "정산중",
      return: 0,
      deposit_return_date: null,
    },
    {
      challenge_id: 3,
      challenge_name: "30분 독서",
      challenge_thumbnail: books,
      deposit: 100000,
      deposit_date: "2025-03-13 19:43:15",
      status: "정산완료",
      return: 120000,
      deposit_return_date: "2025-03-27",
    },
  ];

  useEffect(() => {
    const getChallengeList = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/challenge/my`, {
          method: "GET",
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${user_token}`,
          },
        });

        const data = await res.json();
        console.log("my challenge Data check", data.isSuccess, data.result);

        if (data.isSuccess) {
          console.log("마이챌린지 조회 성공했습니다.");

          return data.result;
        } else {
          console.log(`⚠ ${data.message}`);
        }
      } catch (error) {
        console.error("마이챌린지 페이지 조회 오류:", error);
      }
    };

    const getMyDepositRecord = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/challenge/my/deposit`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user_token}`,
          },
        });

        const data = await res.json();
        console.log("get my Deposit Record check", data.isSuccess, data.result);

        if (data.isSuccess) {
          const getData = await getChallengeList();

          const updatedResult = await Promise.all(
            data.result.map(async (record) => {
              // 해당 challenge_id와 일치하는 authData 항목 찾기

              const matchingData = getData.find(
                (data) => data.challenge_id == record.challengeId
              );

              console.log("getData matchingData", getData, matchingData);

              const today = new Date();
              const endDate = new Date(matchingData.end_date);

              return {
                ...record,
                // auth_image가 존재하면 true, 없거나 없으면 false
                refund_status: today <= endDate ? "진행중" : "정산중",
              };
            })
          );

          console.log("updatedResult", updatedResult);
          setFinanceStatus(updatedResult);
          console.log("챌린지 팀원 투표 현황 리스트 조회에 성공하였습니다.");
          setLoading(false);
        } else {
          console.log(`⚠ ${data.message}`);
        }
      } catch (error) {
        console.error("챌린지 팀원 투표 현황 리스트 조회 오류:", error);
      }
    };

    getMyDepositRecord();
  }, []);

  const [withdrawal, setWithdrawal] = useState(0);

  // const totalDeposit = financeStatus.reduce((sum, item) => sum + item.deposit, 0);
  // const totalReturn = financeStatus.reduce((sum, item) => sum + item.return, 0) - withdrawal;
  const totalDeposit = deposit;
  const totalReturn = reward;

  // Whether to display withdrawal modal window
  const [wdModal, setWdModal] = useState(false);

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        {/* Header */}
        <Header title={"챌린지 비용 및 보상"} totalReturn={totalReturn} />
        <hr className="m-0" />

        {/* Main Content */}
        {/* 전체 챌린지 비용(예치금) 및 보상 박스 */}
        <TotalFinanceBox
          totalDeposit={totalDeposit}
          totalReturn={totalReturn}
          withdrawal={withdrawal}
          setWithdrawal={setWithdrawal}
          onClose={setWdModal}
        />

        {/* 챌린지별 예치금 및 보상 기록 */}
        <FinanceRecord financeStatus={financeStatus} loading={loading} />

        {/* Footer Navigation */}
        <Footer page={page} />
      </div>

      {wdModal && (
        <WithdrawalModal
          onClose={setWdModal}
          setWithdrawal={setWithdrawal}
          totalReturn={totalReturn}
        />
      )}
    </div>
  );
}
