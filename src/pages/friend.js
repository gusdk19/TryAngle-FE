import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FriendNav from "../components/Friend/FriendNav";
import { useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

import "../styles/friend/friend.css"
import Follower from "../components/Friend/Follower";
import Following from "../components/Friend/Following";
import AddFriend from "../components/Friend/AddFriend";


export default function Friend() {
    const location = useLocation();

    const { following, follower } = location.state || {};

    // following, follower 리스트트 변경에 따라 userData following, follower 수 업데이트 필요

    const [userFollowing, setUserFollowing] = useState(following);
    const [userFollower, setUserFollower] = useState(follower);

    // followers, following, allUsers api 호출 필요요

    const [followers, setFollowers] = useState([
        {
            user_id: 2,
            nickname: "고은츄",
            profileImage: "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp"
        },
        {
            user_id: 3,
            nickname: "혜원츄",
            profileImage: "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp"
        }
    ]);
    
    const [followings, setFollowings] = useState([
        {
            "user_id": 2,
            "nickname": "고은츄",
            "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp"
        },
        {
            "user_id": 3,
            "nickname": "혜원츄",
            "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp"
        }
    ]);

    const [allUsers, setAllUsers] = useState([
        {
            "user_id": 2,
            "nickname": "고은츄",
            "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
            "following":true,
        },
        {
            "user_id": 3,
            "nickname": "혜원츄",
            "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
            "following":true,
        },
        {
            "user_id": 4,
            "nickname": "다연츄",
            "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
            "following":false,
        },
    ]);

    const page="friend";

    const [tab, setTab] = useState("follower"); // tab type(3) : follower, following, add

    const [searchValue, setSearchValue] = useState("");

    useEffect(()=>{
        setSearchValue("");
    },[tab]);

    return(
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white w-[393px] h-[852px] relative">
            {/* Header */}
            <Header title={"친구"} following={userFollowing} follower={userFollower}/>
            <hr className="m-0"/>
            
            {/* Navigator */}
            <FriendNav tab={tab} setTab={setTab} following={userFollowing} follower={userFollower}/>

            {/* Search Bar */}
            <div className="search-friend-container">
                <input
                    type="text"
                    placeholder="검색"
                    value={searchValue}
                    className="search-input"
                    onChange={(e)=>{setSearchValue(e.target.value)}}
                />
                <IoIosSearch className="search-icon"/>
                {/* <span>🔍</span> */}
            </div>

            {/* Main Content */}
            {tab === "follower" ?
             <Follower searchValue={searchValue} setUserFollower={setUserFollower} followers={followers} setFollowers={setFollowers}/>
            : tab === "following" ?
             <Following searchValue={searchValue} followings={followings} setFollowings={setFollowings} setAllUsers={setAllUsers} setUserFollowing={setUserFollowing} />
            : tab === "add" ?
             <AddFriend searchValue={searchValue} allUsers={allUsers} setFollowings={setFollowings} setAllUsers={setAllUsers} setUserFollowing={setUserFollowing} />
            : ""}
            
    
            {/* Footer Navigation */}
            <Footer page={page}/>
            
            </div>
        </div>
    );

}