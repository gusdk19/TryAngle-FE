import React, {useState, useEffect} from "react";
import "../../styles/finance/withdrawalModal.css";

import { IoMdClose } from "react-icons/io";

export default function CancelModal({onClose, cancel, cancelChallID, cancelChallName, setChallengeList}){

    const [cancelModal, setCancelModal] = useState(""); // "participate" - 참가취소, "challenge" - "챌린지 삭제"

    const cancelChall = (targetId)=>{
        setChallengeList((preChallList) =>
            preChallList.filter((challenge) => challenge.challenge_id !== targetId)
        );
    }

    const handleChange=()=>{
        onClose(false);
        cancelChall(cancelChallID);
    }

    return (
        <>
          <div className="inner-backdrop" onClick={onClose}></div>
          <div className="inner-modal">
            <div className="modal-sq w-full h-full">
                {/* Title */}
                <h2 className="text-[16px] text-[#6e6053] font-semibold text-center pt-[1px]">
                    {cancel == "participate" ? "챌린지 참가 취소" : "챌린지 삭제"}
                </h2>
                
                {/* Close Button */}
                <button className="close-btn" onClick={()=>{onClose(false)}}>
                    <IoMdClose className="text-[#6e6053] w-[25px] h-[25px]" color="#6e6053"/>
                </button>

                
                {/* 의사 재재확인 */}
                <div className="mx-auto my-[15px] flex flex-col justify-between gap-2 text-center">
                    <span htmlFor="withdrawal" className="ml-[2px] mt-[2px] flex-none text-[#6e6053] text-[15px]">
                        {cancel == "participate" 
                        ? <span>
                            <span className="font-bold">{cancelChallName}</span> 참가를 <span className="font-bold text-[red]">취소</span>하시겠습니까?
                        </span>
                        : <span>
                            <span className="font-bold">{cancelChallName}</span>를 <span className="font-bold text-[red]">삭제</span>하시겠습니까?
                        </span>}
                    </span>
                </div>


                {/* 변경 버튼 */}
                <div className="w-full grid items-center">
                    <button className={`mx-auto w-[192px] h-[38px] mt-[2px] mb-[5px] py-1 rounded-md 
                    text-white font-medium text-[15px] text-center items-center 
                    ${"bg-[#FFC421] cursor-pointer"}`}
                        onClick={handleChange} >
                        {cancel == "participate" ? "참가 취소" : "삭제하기"}
                    </button>
                </div>
                
            </div>
          </div>
        </>
      );
}