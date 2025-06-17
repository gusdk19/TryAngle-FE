import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

import "../styles/friend/friend.css";
import RecommendNav from "../components/Recommend/RecommendNav";
import SuggestFollower from "../components/Recommend/SuggestFollower";
import SuggestFollowing from "../components/Recommend/SuggestFollowing";
import useAuthStore from "../components/User/UseAuthStore";

export default function Recommend() {
  const location = useLocation();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { participant_list, challengeID, inviteCode } = location.state || {};

  const { id } = useParams(); // URL에 있는 id 값(challenge_id) 가져오기

  const { user_token } = useAuthStore();

  const [loading, setLoading] = useState(true);

  const [recommendList, setRecommendList] = useState([]);

  // followers, followings 리스트
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  // Follower, Following 수
  const [userFollowing, setUserFollowing] = useState(followings.length);
  const [userFollower, setUserFollower] = useState(followers.length);

  // followers, following, allUsers api 호출 필요
  useEffect(() => {
    const getFollowersFollowings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user/followers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user_token}`,
          },
        });

        const data = await res.json();
        console.log("Followers List check", data.isSuccess, data.result);

        if (data.isSuccess) {
          setFollowers(data.result);
          setUserFollower(data.result.length);
        } else {
          console.log(`⚠ ${data.message}`);

          setFollowers([
            {
              userId: 2,
              nickname: "고은츄",
              profileImage:
                "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
            },
            {
              userId: 3,
              nickname: "혜원츄",
              profileImage:
                "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
            },
          ]);
          setUserFollower(2);
        }

        const res2 = await fetch(`${API_BASE_URL}/user/followings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user_token}`,
          },
        });

        const data2 = await res2.json();
        console.log("Followings List check", data2.isSuccess, data2.result);

        if (data2.isSuccess) {
          setFollowings(data2.result);
          setUserFollowing(data2.result.length);
        } else {
          console.log(`⚠ ${data2.message}`);

          setFollowings([
            {
              userId: 2,
              nickname: "고은츄",
              profileImage:
                "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
            },
            {
              userId: 3,
              nickname: "혜원츄",
              profileImage:
                "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
            },
          ]);
          setUserFollowing(2);
        }
        setLoading(false);
      } catch (error) {
        console.error("팔로워 팔로잉 리스트 조회 오류:", error);
      }
    };

    if (user_token) {
      getFollowersFollowings();
    } else console.warn("토큰이 없습니다.");
  }, []);

  const page = "recommend";

  const [tab, setTab] = useState("follower"); // tab type(3) : follower, following, add

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue("");
  }, [tab]);

  console.log(loading, "loading");

  if (loading) {
    return (
      <div>
        <Header title={"권유하기"} id={id} />
        <hr className="m-0" />
        <div className="w-full h-[752px] grid items-center">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        {/* Header */}
        <Header title={"권유하기"} id={id} />
        <hr className="m-0" />

        {/* Navigator */}
        <RecommendNav
          tab={tab}
          setTab={setTab}
          following={userFollowing}
          follower={userFollower}
        />

        {/* Search Bar */}
        <div className="search-friend-container">
          <input
            type="text"
            placeholder="검색"
            value={searchValue}
            className="search-input"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <IoIosSearch className="search-icon" />
          {/* <span>🔍</span> */}
        </div>

        {/* Main Content */}
        {tab === "follower" ? (
          <SuggestFollower
            searchValue={searchValue}
            followers={followers}
            participant_list={participant_list}
            recommendList={recommendList}
            setRecommendList={setRecommendList}
            inviteCode={inviteCode}
            challengeID={challengeID}
          />
        ) : tab === "following" ? (
          <SuggestFollowing
            searchValue={searchValue}
            followings={followings}
            participant_list={participant_list}
            recommendList={recommendList}
            setRecommendList={setRecommendList}
            inviteCode={inviteCode}
            challengeID={challengeID}
          />
        ) : (
          ""
        )}

        {/* Footer Navigation */}
        <Footer page={page} />
      </div>
    </div>
  );
}
