import React from "react";

export default function MyChallNav({tab, setTab}){

    return(
        <div className="w-full px-5 mt-4 flex flex-row gap-5 justify-around text-center text-[#4A483F]">
            <div className={`flex-1 text-[#4A483F] text-lg pb-1 cursor-pointer ${tab=="onProgress" ? "border-b-[2.5px] border-b-[#4A483F] border-solid font-bold" : "font-medium"}`}
              onClick={()=>{setTab("onProgress")}}>
                참여중
            </div>
            <div className={`flex-1 text-[#4A483F] text-lg pb-1 cursor-pointer ${tab=="finish" ? "border-b-[2.5px] border-b-[#4A483F] border-solid font-bold" : "font-medium"}`}
              onClick={()=>{setTab("finish")}}>
                참여완료
            </div>
            <div className={`flex-1 text-[#4A483F] text-lg pb-1 cursor-pointer ${tab=="create" ? "border-b-[2.5px] border-b-[#4A483F] border-solid font-bold" : "font-medium"}`}
              onClick={()=>{setTab("create")}}>
                개설
            </div>
        </div>

    )
}
