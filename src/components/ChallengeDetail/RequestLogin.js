import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../../styles/finance/withdrawalModal.css";

import { IoMdClose } from "react-icons/io";

export default function RequestLogin({onClose, purpose, prevPage}){

    const navigate = useNavigate();

    const handleChange=()=>{
        navigate("/login", {state:{back : true, prevPage: prevPage}});
    }

    return (
        <>
          <div className="inner-backdrop" onClick={onClose}></div>
          <div className="inner-modal">
            <div className="modal-sq w-full h-full">
                {/* Title */}
                <h2 className="flex justify-center text-[16px] text-[#6e6053] font-semibold text-center pt-[1px]">
                    <div className="flex-none my-auto">챌린지 {purpose} 요건</div>
                </h2>
                
                {/* Close Button */}
                <button className="close-btn" onClick={()=>{onClose(false)}}>
                    <IoMdClose className="text-[#6e6053] w-[25px] h-[25px]" color="#6e6053"/>
                </button>

                
                {/* 의사 재재확인 */}
                <div className="mx-auto my-[15px] flex flex-col justify-between gap-2 text-center">
                    <span htmlFor="withdrawal" className="ml-[2px] mt-[2px] flex-none text-[#6e6053] text-[15px]">
                        <span className="flex flex-col">
                            <span className="text-[14px]">챌린지에 {purpose}하려면 <span className="font-bold">로그인</span>이 필요합니다.</span>
                            <span><span className="font-bold text-[red]">로그인</span>하시겠습니까?</span>
                        </span>
                    </span>
                </div>


                {/* 변경 버튼 */}
                <div className="w-full grid items-center">
                    <button className={`mx-auto w-[192px] h-[38px] mt-[2px] mb-[5px] py-1 rounded-md 
                    text-white font-medium text-[15px] text-center items-center 
                    ${"bg-[#FFC421] cursor-pointer"}`}
                        onClick={handleChange} >
                        로그인 페이지로 이동
                    </button>
                </div>
                
            </div>
          </div>
        </>
      );
}