import React, {useState, useEffect} from "react";
import "../../styles/finance/withdrawalModal.css";

import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../User/UseAuthStore";

export default function FailPartChallModal({onClose, error, challengeID, prevPage}){

    const navigate = useNavigate();

    const {user_token} = useAuthStore();

    const [success, setSuccess] = useState(true);

    const handleClick=()=>{
        navigate(`/challenge/${challengeID}`, {state:{prevPage:prevPage}});
    }

    return (
        <>
          <div className="inner-backdrop" onClick={onClose}></div>
          <div className="inner-modal">
            <div className="modal-sq w-full h-full">
                {/* Title */}
                <h2 className="text-[16px] text-[#6e6053] font-semibold text-center pt-[1px]">
                    챌린지 참가 실패
                </h2>
                
                {/* Close Button */}
                <button className="close-btn" onClick={()=>{onClose(false)}}>
                    <IoMdClose className="text-[#6e6053] w-[25px] h-[25px]" color="#6e6053"/>
                </button>

                
                {/* 의사 재확인 */}
                <div className="mx-auto my-[15px] flex flex-col justify-between gap-2 text-center">
                    <span htmlFor="withdrawal" className="ml-[2px] mt-[2px] flex-none text-[#6e6053] text-[15px]">
                        <span className="flex flex-col gap-1">
                            <span className="text-red-500 font-semibold">{error}</span>
                        </span>
                    </span>
                </div>


                {/* 변경 버튼 */}
                <div className="w-full grid items-center">
                    <button className={`mx-auto w-[192px] h-[38px] mt-[2px] mb-[5px] py-1 rounded-md 
                    text-white font-medium text-[15px] text-center items-center 
                    ${"bg-[#FFC421] cursor-pointer"}`}
                        onClick={handleClick} >
                        이전 페이지로 돌아가기
                    </button>
                </div>
                
            </div>
          </div>
        </>
      );
}