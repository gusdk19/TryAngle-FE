import React, { useEffect, useState } from "react";
import "../../styles/challengeDetail/vote.css";
import report_icon from "../../assets/images/challenge/report-icon.png";
import heart_icon from "../../assets/images/challenge/heart.png";
import cheerup_icon from "../../assets/images/challenge/cheer-up.png";
import clap_icon from "../../assets/images/challenge/clap.png";
import doubt_icon from "../../assets/images/challenge/doubt.png";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import VoteFooter from "./VoteFooter";
import ReportModal from "./ReportModal";
import useAuthStore from "../User/UseAuthStore";

export default function Vote({ challengeID }) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { user_token, user_nickName } = useAuthStore();

  const [loading, setLoading] = useState(true);

  const [onReport, setOnReport] = useState(false);

  const [onVote, setOnVote] = useState("");

  const [voteStatusList, setVoteStatusList] = useState([]);

  const dummyVoteStatusList = [
    {
      nickname: "다연츄",
      voter_id: 1,
      profileImage:
        "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
      voted: false,
      auth_image:
        "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
    },
    {
      nickname: "혀나츄",
      voter_id: 2,
      profileImage:
        "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
      voted: true,
      auth_image:
        "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
    },
    {
      nickname: "혜원츄",
      voter_id: 3,
      profileImage:
        "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
      voted: false,
      auth_image: null,
    },
  ];

  useEffect(() => {
    const getAuthList = async (challengeId) => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/authentication/all/${challengeId}`,
          {
            method: "GET",
            headers: {
              // 'Content-Type': 'application/json',
              Authorization: `Bearer ${user_token}`,
            },
            // body: JSON.stringify({ "challenge_id" : cancelChallID }),
          }
        );

        const data = await res.json();

        console.log(
          "find whole Authentication list check",
          data,
          data.isSuccess,
          data.message
        );

        if (data.isSuccess) {
          const filteredResult = data.result.filter((auth) => {
            // console.log("auth", auth.user_nickname, user_nickName);
            return auth.user_nickname != user_nickName;
          });

          console.log("filteredResult", filteredResult);
          console.log("인증 전체를 조회하였습니다.");

          return filteredResult;
        } else {
          console.log(`⚠ ${data.message}`);
        }
        setLoading(false);
      } catch (error) {
        console.error("인증 전체 조회 오류:", error);
      }
    };

    const getVoteStatusList = async () => {
      const challengeId = parseInt(challengeID, 10);

      try {
        const res = await fetch(
          `${API_BASE_URL}/challenge/${challengeId}/users/vote`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user_token}`,
            },
          }
        );

        const data = await res.json();
        console.log("get Vote Status List check", data.isSuccess, data.result);

        if (data.isSuccess) {
          const getData = await getAuthList(challengeId);
          const updatedResult = await Promise.all(
            data.result.map(async (user, idx) => {
              // 해당 challenge_id와 일치하는 authData 항목 찾기

              const matchingAuth = getData.find(
                (data) => data.user_nickname == user.nickname
              );

              console.log("getData matchingAuth", getData, matchingAuth);

              return {
                ...user,
                // auth_image가 존재하면 true, 없거나 없으면 false
                auth_image: matchingAuth?.auth_image
                  ? matchingAuth?.auth_image
                  : null,
                voter_id: idx,
                auth_id: matchingAuth?.auth_id ? matchingAuth?.auth_id : "",
              };
            })
          );

          console.log("updatedResult", updatedResult);

          setVoteStatusList(updatedResult);
          console.log("챌린지 팀원 투표 현황 리스트 조회에 성공하였습니다.");
          setLoading(false);
        } else {
          console.log(`⚠ ${data.message}`);
        }
      } catch (error) {
        console.error("챌린지 팀원 투표 현황 리스트 조회 오류:", error);
      }
    };

    getVoteStatusList();
  }, []);

  const [onVoteUser, setOnVoteUser] = useState("");

  useEffect(() => {
    const filtered = voteStatusList.filter(
      (voteStatus) => voteStatus.voter_id === onVote
    );

    if (filtered.length === 1) {
      setOnVoteUser(filtered[0]); // 요소 하나일 경우 객체로
    } else {
      setOnVoteUser(filtered); // 0개 또는 여러 개일 경우 배열로
    }

    console.log("onVote, onVoteUser", onVote, filtered, onVote === "");
  }, [onVote]);

  const sortedVoteStatusList = voteStatusList.sort((a, b) => {
    // auth_image가 null이면 우선순위 2 (맨 마지막)
    const aPriority = a.auth_image === null ? 2 : a.voted ? 1 : 0;
    const bPriority = b.auth_image === null ? 2 : b.voted ? 1 : 0;
    return aPriority - bPriority;
  });

  const [emotionModal, setEmotionModal] = useState(0);
  const [emotionChoice, setEmotionChoice] = useState("");

  const report = async () => {
    setOnReport(true);
  };

  const postEmotion = async (icon) => {
    const authenticationId = onVoteUser.auth_id;

    console.log("authenticationId", authenticationId);

    try {
      const res = await fetch(
        `${API_BASE_URL}/authentication/${authenticationId}/reaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user_token}`,
          },
          body: JSON.stringify({
            reaction_id:
              icon == "heart"
                ? 0
                : icon == "doubt"
                ? 1
                : icon == "cheerup"
                ? 2
                : 3,
          }),
        }
      );

      const data = await res.json();

      console.log("emotion add check", data);

      if (data.isSuccess) {
        setEmotionChoice(icon);
        console.log("인증 리액션을 성공적으로 추가했습니다.");
      } else {
        console.log(`⚠ ${data.message}`);
      }
    } catch (error) {
      console.error("인증 리액션 추가 오류:", error);
    }

    setEmotionModal(0);
  };

  return (
    <div className="px-5">
      {onVote === "" ? (
        <div>
          <div className="text-[#6E6053] font-semibold">멤버</div>
          <div
            className="flex flex-col gap-3 mt-3 text-[#6E6053] 
                        overflow-scroll main h-[635px]"
          >
            {loading ? (
              <div className="w-full h-full grid items-center">
                <div className="spinner"></div>
              </div>
            ) : (
              sortedVoteStatusList.map((voteStatus, id) => {
                return (
                  <div
                    className="flex flex-row gap-3 justify-between h-[45px] py-auto object-contain"
                    id={id}
                  >
                    <div className="flex-1 flex flex-row gap-4">
                      <img
                        className="max-w-[45px] max-h-[45px] border-[1.5px] border-[#D9D9D9] border-solid rounded-full"
                        src={voteStatus.profileImage}
                        width="45px"
                        height="45px"
                        alt={`user-${id} profileImage`}
                      />
                      <div className="my-auto text-[15px] font-semibold">
                        {voteStatus.nickname}
                      </div>
                    </div>
                    <button
                      className={`w-[120px] h-[30px] my-auto rounded-md text-[#4A483F] flex-none text-[12px] text-center font-semibold
                                    ${
                                      voteStatus.voted || !voteStatus.auth_image
                                        ? "bg-[#D9D9D9] cursor-default"
                                        : "bg-[#FFC421] cursor-pointer"
                                    }`}
                      onClick={() => {
                        if (!(voteStatus.voted || !voteStatus.auth_image)) {
                          setOnVote(voteStatus.voter_id);
                        }
                      }}
                    >
                      {voteStatus.voted
                        ? "투표완료"
                        : voteStatus.auth_image
                        ? "투표하기"
                        : "인증 미완료"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <div className="">
          <div className="flex flex-row gap-3 justify-between h-[45px] py-auto object-contain">
            <div className="flex-1 flex flex-row gap-4">
              <img
                className="max-w-[45px] max-h-[45px] border-[1.5px] border-[#D9D9D9] border-solid rounded-full"
                src={onVoteUser.profileImage}
                width="45px"
                height="45px"
                alt={`user-${onVoteUser.voter_id}} profileImage`}
              />
              <div className="my-auto text-[17px] font-semibold">
                {onVoteUser.nickname}
              </div>
            </div>
            <img
              className="my-auto cursor-pointer"
              src={report_icon}
              alt="report-icon"
              width="36px"
              onClick={() => {
                report();
              }}
            />
          </div>

          <div className="rounded-md mt-3 overflow-scroll main h-[615px]">
            <div className="relative">
              <img
                className="max-w-[360px] rounded-md"
                src={onVoteUser.auth_image}
                alt={`user-${onVoteUser.voter_id}} auth-image`}
                width="360px"
                height="235px"
              />
              {emotionModal ? (
                <div
                  className="absolute bottom-[13px] right-[8px] h-[60px] px-5
                            bg-[#fdf8edea] rounded-3xl flex flex-row gap-4"
                >
                  <img
                    className="w-[40px] h-[40px] max-w-[40px] max-h-[40px] my-auto cursor-pointer"
                    src={heart_icon}
                    alt="heart-icon"
                    title="좋아요"
                    onClick={() => {
                      postEmotion("heart");
                    }}
                  />
                  <img
                    className="w-[40px] h-[40px] max-w-[40px] max-h-[40px] my-auto cursor-pointer"
                    src={cheerup_icon}
                    alt="cheerup-icon"
                    title="힘내세요"
                    onClick={() => {
                      postEmotion("cheerup");
                    }}
                  />
                  <img
                    className="w-[40px] h-[40px] max-w-[40px] max-h-[40px] my-auto cursor-pointer"
                    src={clap_icon}
                    alt="cheerup-icon"
                    title="최고에요"
                    onClick={() => {
                      postEmotion("clap");
                    }}
                  />
                  <img
                    className="w-[40px] h-[40px] max-w-[40px] max-h-[40px] my-auto cursor-pointer"
                    src={doubt_icon}
                    alt="cheerup-icon"
                    title="의심스러워요"
                    onClick={() => {
                      postEmotion("doubt");
                    }}
                  />
                </div>
              ) : emotionChoice == "" ? (
                <FaRegHeart
                  className="absolute bottom-[13px] right-[8px] w-[40px] h-[40px] cursor-pointer"
                  color="#FDE0CE"
                  onClick={() => {
                    setEmotionModal(1);
                  }}
                />
              ) : (
                <img
                  className="absolute bottom-[13px] right-[8px] w-[60px] h-[60px] cursor-pointer"
                  src={
                    emotionChoice == "heart"
                      ? heart_icon
                      : emotionChoice == "cheerup"
                      ? cheerup_icon
                      : emotionChoice == "clap"
                      ? clap_icon
                      : emotionChoice == "doubt"
                      ? doubt_icon
                      : ""
                  }
                  alt={
                    emotionChoice == "heart"
                      ? "heart-icon"
                      : emotionChoice == "cheerup"
                      ? "cheerup-icon"
                      : emotionChoice == "clap"
                      ? "clap-icon"
                      : emotionChoice == "doubt"
                      ? "doubt-icon"
                      : ""
                  }
                  title={
                    emotionChoice == "heart"
                      ? "좋아요"
                      : emotionChoice == "cheerup"
                      ? "힘내세요"
                      : emotionChoice == "clap"
                      ? "최고에요"
                      : emotionChoice == "doubt"
                      ? "의심스러워요"
                      : ""
                  }
                  onClick={() => {
                    setEmotionModal(1);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {onVote === "" ? (
        ""
      ) : (
        <VoteFooter
          onVoteUser={onVoteUser}
          onVoteUserID={onVoteUser.voter_id}
          setVoteStatusList={setVoteStatusList}
          setOnVote={setOnVote}
        />
      )}

      {onReport ? (
        <ReportModal onClose={setOnReport} onVoteUser={onVoteUser} />
      ) : (
        ""
      )}
    </div>
  );
}
