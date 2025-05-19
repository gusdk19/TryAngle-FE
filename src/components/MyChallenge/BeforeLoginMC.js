import { Bell, Home, SmileIcon, Trophy, User, Users } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import InquiryModal from "../MyPage/InquiryModal";

export default function BeforeLoginMC(){

    const navigate = useNavigate();

    const [inquiryModal, setInquiryModal] = useState(false);

    return(
        <main className="px-4">
            {/* Login Prompt */}
            <div className="flex items-center gap-1 mt-[20px]">
                <div className="font-['Roboto-Black',Helvetica] font-bold text-[#4a483f] text-[18px] tracking-[0] leading-normal">
                    로그인이 필요한 서비스 입니다.
                </div>
                <SmileIcon className="w-[18px] h-[18px] text-[#4a483f]" />
            </div>

            {/* Login Button */}
            <button className="w-full h-10 mt-[15px] bg-[#fab809] hover:bg-[#fab809]/90 text-[#4a483f] rounded-[5px]"
                onClick={()=>{
                    navigate("/login");
                }}>
                <span className="font-m3-body-bold font-bold text-[14px] text-center grid items-center">로그인하기</span>
            </button>

        </main>
    );
}