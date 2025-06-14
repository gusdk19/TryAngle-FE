import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FriendNav from "../components/Friend/FriendNav";
import { useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

import "../styles/friend/friend.css";
import Follower from "../components/Friend/Follower";
import Following from "../components/Friend/Following";
import AddFriend from "../components/Friend/AddFriend";
import useAuthStore from "../components/User/UseAuthStore";

export default function Friend() {
  const location = useLocation();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { following, follower, userData } = location.state || {};

  const { user_token } = useAuthStore();

  const [loading, setLoading] = useState(true);

  // following, follower 리스트 변경에 따라 userData following, follower 수 업데이트 필요

  const [userFollowing, setUserFollowing] = useState(
    following == null ? 2 : following
  );
  const [userFollower, setUserFollower] = useState(
    follower == null ? 2 : follower
  );
  const [modifiedUD, setModifiedUD] = useState(userData);

  const [followers, setFollowers] = useState([]);

  const [followings, setFollowings] = useState([]);

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    setModifiedUD((prevData) => ({
      ...prevData,
      followers: userFollower,
      followees: userFollowing,
    }));
  }, [userFollowing, userFollower]);

  // followers, following, allUsers api 호출 필요
  useEffect(() => {
    const getFriendData = async () => {
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
        }

        const res3 = await fetch(`${API_BASE_URL}/user/userlist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user_token}`,
          },
        });

        const data3 = await res3.json();
        console.log("All User List check", data3.isSuccess, data3.result);

        if (data3.isSuccess) {
          setAllUsers(data3.result);
        } else {
          console.log(`⚠ ${data3.message}`);

          setAllUsers([
            {
              userId: 2,
              nickname: "고은츄",
              profileImage:
                "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
              isFollowing: true,
            },
            {
              userId: 3,
              nickname: "혜원츄",
              profileImage:
                "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
              isFollowing: true,
            },
            {
              userId: 4,
              nickname: "다연츄",
              profileImage:
                "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
              isFollowing: false,
            },
          ]);
        }
        setLoading(false);
      } catch (error) {
        console.error("팔로워 리스트 조회 오류:", error);
      }
    };

    if (user_token) {
      getFriendData();
    } else console.warn("토큰이 없습니다.");
  }, []);

  const page = "friend";

  const [tab, setTab] = useState("follower"); // tab type(3) : follower, following, add

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue("");
  }, [tab]);

  if (loading) {
    return (
      <div>
        <Header
          title={"친구"}
          following={userFollowing}
          follower={userFollower}
          userData={modifiedUD}
        />
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
        <Header
          title={"친구"}
          following={userFollowing}
          follower={userFollower}
          userData={modifiedUD}
        />
        <hr className="m-0" />

        {/* Navigator */}
        <FriendNav
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
          <Follower
            searchValue={searchValue}
            setUserFollower={setUserFollower}
            followers={followers}
            setFollowers={setFollowers}
            user_token={user_token}
          />
        ) : tab === "following" ? (
          <Following
            searchValue={searchValue}
            followings={followings}
            setFollowings={setFollowings}
            setAllUsers={setAllUsers}
            setUserFollowing={setUserFollowing}
            user_token={user_token}
          />
        ) : tab === "add" ? (
          <AddFriend
            searchValue={searchValue}
            allUsers={allUsers}
            setFollowings={setFollowings}
            setAllUsers={setAllUsers}
            setUserFollowing={setUserFollowing}
            user_token={user_token}
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
