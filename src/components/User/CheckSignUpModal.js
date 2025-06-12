import React, {useState, useEffect} from "react";
import "../../styles/finance/withdrawalModal.css";
import { Navigate, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

export default function CheckSignUpModal({onClose, isSuccess}){

    const navigate = useNavigate();

    const handleChange=()=>{
        if(isSuccess){
            navigate("/login");
        }else{
            navigate("/signup");
        }

        onClose(false);
    }

    return (
        <>
          <div className="inner-backdrop" onClick={onClose}></div>
          <div className="inner-modal">
            <div className="modal-sq w-full h-full">
                {/* Title */}
                <h2 className="text-[16px] text-[#6e6053] font-semibold text-center pt-[1px]">
                    회원가입
                </h2>
                
                {/* Close Button */}
                {/* <button className="close-btn" onClick={()=>{onClose(false)}}>
                    <IoMdClose className="text-[#6e6053] w-[25px] h-[25px]" color="#6e6053"/>
                </button> */}

                
                {/* 의사 재재확인 */}
                <div className="mx-auto my-[15px] flex flex-col justify-between gap-2 text-center">
                    <span htmlFor="withdrawal" className="ml-[2px] mt-[2px] flex-none text-[#6e6053] text-[15px]">
                        <span>
                            <span className="font-bold">회원가입</span>에 <span className="font-bold text-[red]">{isSuccess ? "성공" : "실패"}</span>했습니다.
                        </span>
                    </span>
                </div>


                {/* 변경 버튼 */}
                <div className="w-full grid items-center">
                    <button className={`mx-auto w-[192px] h-[38px] mt-[2px] mb-[5px] py-1 rounded-md 
                    text-white font-medium text-[15px] text-center items-center 
                    ${"bg-[#FFC421] cursor-pointer"}`}
                        onClick={handleChange} >
                        {isSuccess ? "로그인 페이지로 이동" : "회원가입 재시도"}
                    </button>
                </div>
                
            </div>
          </div>
        </>
      );
}