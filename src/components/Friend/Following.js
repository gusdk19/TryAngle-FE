import React, { useState } from "react";
import "../../styles/friend/friend.css";
import "../../styles/friend/follower.css"; //follower와 사용하는 css 동일해서 따로 만들지 않고 재사용.

export default function Following({
  searchValue,
  followings,
  setFollowings,
  setAllUsers,
  setUserFollowing,
  user_token,
}) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  // const [followings, setFollowings] = useState([
  //     {
  //         "userId": 2,
  //         "nickname": "고은츄",
  //         "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp"
  //     },
  //     {
  //         "userId": 3,
  //         "nickname": "혜원츄",
  //         "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp"
  //     }
  // ]);

  const filteredFollowings = followings.filter((following) =>
    following.nickname.includes(searchValue)
  );

  const cancelFollow = (targetUser) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userId === targetUser.userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );

    setFollowings((preFollowing) =>
      preFollowing.filter((following) => following.userId !== targetUser.userId)
    );

    setUserFollowing((prev) => prev - 1);

    const unfollow = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user/unfollow`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user_token}`,
          },
          body: JSON.stringify({ nickname: targetUser.nickname }),
        });

        const data = await res.json();
        console.log("unfollow check", data.isSuccess, data.message);
      } catch (error) {
        console.error("언팔로우 오류:", error);
      }
    };

    unfollow();
  };

  return (
    <div className="main h-[612px] px-[20px] flex flex-col gap-[13px] overflow-scroll">
      {(searchValue != "" ? filteredFollowings : followings).map(
        (following, index) => {
          return (
            <div
              key={following.userId}
              className="flex flex-row gap-4 py-auto align-center"
            >
              <img
                className="flex-none w-[43px] h-[43px] rounded-full p-[1px] border-[0.5px] border-[#D9D9D9]"
                src={following.profileImage}
                alt={`${following.userId}-profileImage`}
              />
              <span className="flex-1 my-auto text-[15px] text-[#6E6053] font-medium">
                {following.nickname}
              </span>
              <button
                className="follow-cancel-btn flex-none h-fit px-5 py-[6px] my-auto text-[13px] font-medium  text-[#4A483F] bg-[#F4F4F4] rounded-lg"
                onClick={() => {
                  cancelFollow(following);
                }}
              >
                팔로우 취소
              </button>
            </div>
          );
        }
      )}
    </div>
  );
}
