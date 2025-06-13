import React from "react";
import useAuthStore from "../User/UseAuthStore";

export default function DetailNav({tab, setTab, status}){

    const {isLoggedIn} = useAuthStore();

    console.log("nav status",status);

    return(
        <div className={`${status != 0 ? "w-[250px]" : "w-[80px]"} px-5 my-3 flex flex-row gap-5 justify-around text-center text-[#4A483F]`}>
            {status != 0 && <div className={`flex-1 text-[#4A483F] text-lg pb-1 cursor-pointer ${tab=="vertify" ? "border-b-[2.5px] border-b-[#4A483F] border-solid font-bold" : "font-medium"}`}
              onClick={()=>{setTab("vertify")}}>
                인증
            </div>}
            <div className={`flex-1 text-[#4A483F] text-lg pb-1 cursor-pointer ${tab=="info" ? "border-b-[2.5px] border-b-[#4A483F] border-solid font-bold" : "font-medium"}`}
              onClick={()=>{setTab("info")}}>
                정보
            </div>
            {status != 0 && <div className={`flex-1 text-[#4A483F] text-lg pb-1 cursor-pointer ${tab=="vote" ? "border-b-[2.5px] border-b-[#4A483F] border-solid font-bold" : "font-medium"}`}
              onClick={()=>{setTab("vote")}}>
                투표
            </div>}
        </div>
    )
}