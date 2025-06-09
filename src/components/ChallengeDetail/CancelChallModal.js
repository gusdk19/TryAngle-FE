import React, {useState, useEffect} from "react";
import "../../styles/finance/withdrawalModal.css";

import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../User/UseAuthStore";

export default function CancelChallModal({onClose, cancelChallName, cancelChallID}){

    const navigate = useNavigate();

    const {user_token} = useAuthStore();

    const [success, setSuccess] = useState(true);

    const handleClick=()=>{
        const delChallenge = async()=>{
            try {
                const res = await fetch(`http://localhost:8080/challenge/${cancelChallID}`, {
                    method: 'DELETE',
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user_token}`
                    },
                    // body: JSON.stringify({ "challenge_id" : cancelChallID }), 
                });
        
                const data = await res.json();
                console.log("delete Challenge check", data, data.isSuccess, data.message);
        
                if(data.isSuccess){
                    // challengeFeeRefund에서 post만 제대로 되면 data.result 저장하는 것만으로 충분
                    console.log("챌린지를 삭제하였습니다.");
                    navigate(-1);
                } else{
                    setSuccess(false);
                    console.log(`⚠ ${data.message}`);
                }
            } catch (error) {
                setSuccess(false);
                console.error('챌린지 삭제 오류:', error);
            }
        }
    
        delChallenge();
        
    }

    return (
        <>
          <div className="inner-backdrop" onClick={onClose}></div>
          <div className="inner-modal">
            <div className="modal-sq w-full h-full">
                {/* Title */}
                <h2 className="text-[16px] text-[#6e6053] font-semibold text-center pt-[1px]">
                    챌린지 삭제
                </h2>
                
                {/* Close Button */}
                <button className="close-btn" onClick={()=>{onClose(false)}}>
                    <IoMdClose className="text-[#6e6053] w-[25px] h-[25px]" color="#6e6053"/>
                </button>

                
                {/* 의사 재확인 */}
                <div className="mx-auto my-[15px] flex flex-col justify-between gap-2 text-center">
                    <span htmlFor="withdrawal" className="ml-[2px] mt-[2px] flex-none text-[#6e6053] text-[15px]">
                        {success ? <span>
                            <span className="font-bold">{cancelChallName}</span> 챌린지를 <span className="font-bold text-[red]">삭제</span>하시겠습니까?
                        </span>
                        : <span className="flex flex-col gap-1">
                            <span><span className="font-bold">챌린지 삭제</span>에 <span className="font-bold text-[red]">실패</span>했습니다.</span>
                            <span className="font-medium">다시 시도해 주십시오.</span>
                        </span>}
                    </span>
                </div>


                {/* 변경 버튼 */}
                <div className="w-full grid items-center">
                    <button className={`mx-auto w-[192px] h-[38px] mt-[2px] mb-[5px] py-1 rounded-md 
                    text-white font-medium text-[15px] text-center items-center 
                    ${"bg-[#FFC421] cursor-pointer"}`}
                        onClick={handleClick} >
                        {success ? "삭제하기" : "재시도하기"}
                    </button>
                </div>
                
            </div>
          </div>
        </>
      );
}