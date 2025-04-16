import { Bell, Home, SmileIcon, Trophy, User, Users } from "lucide-react";
import React from "react";

export default function BeforeLoginMain(){

    return(
        <main className="px-4">
            {/* Login Prompt */}
            <div className="flex items-center gap-1 mt-[20px]">
                <div className="font-['Roboto-Black',Helvetica] font-bold text-[#4a483f] text-[18px] tracking-[0] leading-normal">
                로그인을 해주세요.
                </div>
                <SmileIcon className="w-[18px] h-[18px] text-[#4a483f]" />
            </div>

            {/* Login Button */}
            <button className="w-full h-10 mt-[15px] bg-[#fab809] hover:bg-[#fab809]/90 text-[#4a483f] rounded-[5px]">
                <span className="font-m3-body-bold font-bold text-[14px] text-center grid items-center">로그인하기</span>
            </button>

            {/* Contact Link */}
            <div className="flex justify-end mt-[7px] mr-[2px]">
                <div className="text-[12px] [-webkit-text-stroke:0.1px_#838687] font-m3-label-medium text-[#838687] whitespace-nowrap underline">
                문의하기
                </div>
            </div>
        </main>
    );
}