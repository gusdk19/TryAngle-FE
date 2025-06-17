import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import rank_bannerImage from "../assets/images/common/rank_bannerimage.png";
import useAuthStore from "../components/User/UseAuthStore.js";
import RequestLogin from "../components/ChallengeDetail/RequestLogin";
import "../styles/Home/Home.css";
import { useNavigate } from "react-router-dom";

import bpi_1 from "../assets/images/mypage/basic_profile_image/basic_profile_image_1.png";
import bpi_2 from "../assets/images/mypage/basic_profile_image/basic_profile_image_2.png";
import bpi_3 from "../assets/images/mypage/basic_profile_image/basic_profile_image_3.png";
import bpi_4 from "../assets/images/mypage/basic_profile_image/basic_profile_image_4.png";
import bpi_5 from "../assets/images/mypage/basic_profile_image/basic_profile_image_5.png";

const mapToUIModel = (u) => ({
  userId: u.userId,
  name: u.nickname,
  total_success_rate: u.successRate,
  totalChallenges: u.challengeCount,
  profileImage: u.profileImage,
  description: u.description,
});

const Ranking = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { isLoggedIn } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overall");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [rankingData, setRankingData] = useState([]);
  const [rankingError, setRankingError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestLogin, setRequestLogin] = useState(false);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        let url = `${API_BASE_URL}/ranking`; // 기본: 전체 랭킹
        const headers = {};

        if (activeTab === "follower") {
          const token = localStorage.getItem("accessToken")?.trim();

          if (!token || !isLoggedIn) {
            setRankingError("로그인 후 팔로워 랭킹을 확인할 수 있습니다.");
            setRankingData([]);
            return;
          }
          url = "http://localhost:8080/ranking/following"; // 팔로잉 랭킹
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(url, { headers });
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`요청 실패 (HTTP ${res.status}): ${errText}`);
        }

        const json = await res.json();
        if (!json.isSuccess) {
          throw new Error(json.message || "랭킹 조회 실패");
        }

        const list = json.result.map((u, index) => mapToUIModel(u, index));

        const sorted = list.sort((a, b) => {
          if (b.total_success_rate !== a.total_success_rate)
            return b.total_success_rate - a.total_success_rate;
          return b.totalChallenges - a.totalChallenges;
        });
        console.log("rrr", sorted);
        setRankingData(sorted);
        setRankingError(null);
        setLoading(false);
      } catch (err) {
        console.error("랭킹 요청 오류:", err);
        setRankingError(err.message || "서버 오류");
      }
    };
    fetchRanking();
  }, [activeTab, isLoggedIn]);

  console.log("현재 rankingData:", rankingData);
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      {/* 모바일 프레임 */}
      <div className="bg-white w-[393px] h-[852px] relative">
        <Header className="flex-none" title="랭킹" />
        {/* 배너 이미지 삽입*/}
        <img src={rank_bannerImage} alt="banner" className="w-full" />

        {/* 탭 영역 */}
        <div className="flex justify-center items-center mt-[43px] space-x-10">
          <button
            className={`text-lg font-semibold ${
              activeTab === "overall"
                ? "border-b-2 border-[#4A483F] text-[#4A483F]"
                : "text-[#4A483F]"
            }`}
            onClick={() => setActiveTab("overall")}
          >
            전체 랭킹
          </button>
          <button
            className={`text-lg font-semibold ${
              activeTab === "follower"
                ? "border-b-2 border-[#4A483F] text-[#4A483F]"
                : "text-[#4A483F]"
            }`}
            onClick={() => setActiveTab("follower")}
          >
            팔로워 랭킹
          </button>
        </div>
        {/* 랭킹 */}
        <main className="main h-[593px] overflow-auto px-5 mt-[20px] pb-6">
          {loading ? (
            <div className="w-full h-full grid items-center">
              <div className="spinner"></div>
            </div>
          ) : (
            rankingData.map((user, index) => {
              console.log("u", user);
              return (
                <div key={index} className="flex items-center space-x-3 mb-4">
                  {/* 순위 동그라미 */}
                  <div className="relative w-11 h-11 flex items-center justify-center">
                    {/* 바깥 원 */}
                    <div
                      className={`
                        absolute inset-0 rounded-full z-0
                        ${
                          index + 1 === 1
                            ? "bg-[#FDE39D]"
                            : index + 1 === 2
                            ? "bg-[#E1E0E1]"
                            : index + 1 === 3
                            ? "bg-[#DFC891]"
                            : "bg-[#D9D9D9]"
                        }
                    `}
                    />

                    {/* 안쪽 원 (기존 내용) */}
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10
                        ${
                          index + 1 === 1
                            ? "bg-[#FED20D] text-white"
                            : index + 1 === 2
                            ? "bg-[#C2C4C5] text-white"
                            : index + 1 === 3
                            ? "bg-[#D3B05C] text-white"
                            : "bg-[#FFFFFF] text-[#838687]"
                        }
                    `}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* 유저 카드 */}
                  <div className="w-[293px] h-[80px] flex-1 bg-[#FFFAF0] p-3 rounded-xl flex items-center">
                    <div className="flex items-start space-x-3 w-full">
                      <img
                        src={user.profileImage}
                        alt="profile"
                        className="w-[40px] h-[40px] rounded-full"
                      />
                      <div className="flex flex-col w-full">
                        {/* 이름과 설명 가로로 */}
                        <div className="flex space-x-2 items-baseline">
                          <p className="font-bold text-base whitespace-nowrap">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {user.description}
                          </p>
                        </div>
                        {/* 진행률 바 */}
                        <div className="mt-2 w-full bg-[#ffc42164] rounded-full h-2">
                          <div
                            className="bg-[#FFC421] h-2 rounded-full"
                            style={{ width: `${user.total_success_rate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </main>
        <Footer page="ranking" />
      </div>
      {!isLoggedIn && requestLogin ? (
        <RequestLogin onClose={setRequestLogin} purpose={"생성"} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Ranking;
