import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FriendNav from "../components/Friend/FriendNav";
import { useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

import "../styles/friend/friend.css"
import Follower from "../components/Friend/Follower";

export default function Friend() {
    const location = useLocation();

    const { following, follower } = location.state || {};

    const page="friend";

    const [tab, setTab] = useState("follower"); // tab type(3) : follower, following, add

    return(
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white w-[393px] h-[852px] relative">
            {/* Header */}
            <Header title={"친구"}/>
            <hr className="m-0"/>
            
            {/* Navigator */}
            <FriendNav tab={tab} setTab={setTab} following={following} follower={follower}/>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="검색"
                    className="search-input"
                />
                <IoIosSearch className="search-icon"/>
                {/* <span>🔍</span> */}
            </div>

            {/* Main Content */}
            {tab === "follower" ?
             <Follower/>
            : tab === "following" ?
             <></>
            : tab === "add" ?
             <></>
            : ""}
            
    
            {/* Footer Navigation */}
            <Footer page={page}/>
            
            </div>
        </div>
    );

}