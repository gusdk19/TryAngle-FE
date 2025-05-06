import React from "react";

export default function RecommendNav({tab, setTab, following, follower}){


    return(
        <div className="w-full px-5 mt-4 flex flex-row gap-5 justify-start text-center text-[#4A483F]">
            <div className={`flex-none w-[120px] text-lg pb-1 cursor-pointer ${tab=="follower" ? "border-b-[2.5px] border-b-[#4A483F] border-solid font-bold" : ""}`}
              onClick={()=>{setTab("follower")}}>
                팔로워 <span className="font-semibold">{follower}</span>명
            </div>
            <div className={`flex-none w-[120px] text-lg pb-1 cursor-pointer ${tab=="following" ? "border-b-[2.5px] border-b-[#4A483F] border-solid font-bold" : ""}`}
              onClick={()=>{setTab("following")}}>
                팔로잉 <span className="font-semibold">{following}</span>명
            </div>
        </div>

    )
}
