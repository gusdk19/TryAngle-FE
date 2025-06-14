import React, { useEffect, useState } from "react";
import "../../styles/friend/friend.css";
import "../../styles/friend/follower.css";
import useAuthStore from "../User/UseAuthStore";

export default function SuggestFollower({
  searchValue,
  followers,
  participant_list,
  recommendList,
  setRecommendList,
  challengeID,
  inviteCode,
}) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { user_id, user_token } = useAuthStore();

  // const [followers, setFollowers] = useState([
  //     {
  //         userId: 2,
  //         nickname: "고은츄",
  //         profileImage: "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp"
  //     },
  //     {
  //         userId: 3,
  //         nickname: "혜원츄",
  //         profileImage: "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp"
  //     }
  // ]);

  const filteredFollowers = followers.filter((follower) =>
    follower.nickname.includes(searchValue)
  );

  const addRecommend = async (targetId) => {
    console.log("targetId", targetId, user_id);

    try {
      const res = await fetch(`${API_BASE_URL}/user/invite/notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
        body: JSON.stringify({
          senderId: user_id,
          receiverId: targetId,
          challengeId: challengeID,
          inviteCode: inviteCode || "",
        }),
      });

      const data = await res.json();
      console.log("data", data);

      if (data.isSuccess) {
        console.log("권유하기 성공공");

        if (!recommendList.includes(targetId)) {
          setRecommendList((prev) => [...prev, targetId]);
        }
      } else {
        console.log("권유하기 실패");
      }
    } catch (err) {
      console.error("권유하기 서버 오류류");
    }
  };

  return (
    <div className="main h-[612px] px-[20px] flex flex-col gap-[13px] overflow-scroll">
      {(searchValue != "" ? filteredFollowers : followers).map(
        (follower, index) => {
          return (
            <div
              key={follower.userId}
              className="flex flex-row gap-4 py-auto align-center"
            >
              <img
                className="flex-none w-[43px] h-[43px] rounded-full p-[1px] border-[0.5px] border-[#D9D9D9]"
                src={follower.profileImage}
                alt={`${follower.userId}-profileImage`}
              />
              <span className="flex-1 my-auto text-[15px] text-[#6E6053] font-medium">
                {follower.nickname}
              </span>
              <button
                className={`add-recommend-btn flex-none h-fit px-5 py-[6px] my-auto text-[13px] font-medium  text-[#4A483F] ${
                  !participant_list.includes(follower.userId) &&
                  !recommendList.includes(follower.userId)
                    ? "bg-[#FAB809]"
                    : "bg-[#F4F4F4] cursor-default"
                } rounded-lg`}
                onClick={() => {
                  addRecommend(follower.userId);
                }}
              >
                {participant_list.includes(follower.userId)
                  ? "참여중"
                  : recommendList.includes(follower.userId)
                  ? "권유완료"
                  : "권유하기"}
              </button>
            </div>
          );
        }
      )}
    </div>
  );
}
