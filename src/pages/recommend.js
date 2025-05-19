import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

import "../styles/friend/friend.css";
import RecommendNav from "../components/Recommend/RecommendNav";
import SuggestFollower from "../components/Recommend/SuggestFollower";
import SuggestFollowing from "../components/Recommend/SuggestFollowing";

export default function Recommend() {
    const location = useLocation();

    const {participant_list} = location.state || {};

    const { id } = useParams(); // URL에 있는 id 값(challenge_id) 가져오기

    const [recommendList, setRecommendList] = useState([2]);

    // followers, following, allUsers api 호출 필요

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


    // Follower, Following 수수
    const [userFollowing, setUserFollowing] = useState(followings.length);
    const [userFollower, setUserFollower] = useState(followers.length);

    const page="recommend";

    const [tab, setTab] = useState("follower"); // tab type(3) : follower, following, add

    const [searchValue, setSearchValue] = useState("");

    useEffect(()=>{
        setSearchValue("");
    },[tab]);

    return(
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white w-[393px] h-[852px] relative">
            {/* Header */}
            <Header title={"권유하기"} id={id}/>
            <hr className="m-0"/>
            
            {/* Navigator */}
            <RecommendNav tab={tab} setTab={setTab} following={userFollowing} follower={userFollower}/>

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
             <SuggestFollower searchValue={searchValue} followers={followers} participant_list={participant_list}
               recommendList={recommendList} setRecommendList={setRecommendList}/>
            : tab === "following" ?
             <SuggestFollowing searchValue={searchValue} followings={followings} participant_list={participant_list}
               recommendList={recommendList} setRecommendList={setRecommendList}/>
            : ""}
            
    
            {/* Footer Navigation */}
            <Footer page={page}/>
            
            </div>
        </div>
    );

}