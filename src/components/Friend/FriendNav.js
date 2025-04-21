import React from "react";

export default function FriendNav({tab, setTab, following, follower}){


    return(
        <div className="w-full px-5 mt-4 flex flex-row gap-5 justify-around text-center font-[#4A483F]">
            <div className={`flex-1 text-lg pb-1 cursor-pointer ${tab=="follower" ? "border-b-[2.5px] border-b-[#4A483F] border-solid" : ""}`}
              onClick={()=>{setTab("follower")}}>
                팔로워 <span className="font-semibold">{follower}</span>명
            </div>
            <div className={`flex-1 text-lg pb-1 cursor-pointer ${tab=="following" ? "border-b-[2.5px] border-b-[#4A483F] border-solid" : ""}`}
              onClick={()=>{setTab("following")}}>
                팔로잉 <span className="font-semibold">{following}</span>명
            </div>
            <div className={`flex-1 text-lg pb-1 cursor-pointer ${tab=="add" ? "border-b-[2.5px] border-b-[#4A483F] border-solid" : ""}`}
              onClick={()=>{setTab("add")}}>
                추가
            </div>
        </div>

    )
}
