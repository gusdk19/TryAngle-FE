import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChallengeFooter({status, challengeID, setChallengeData, participant_list, isLoggedIn, setRequestLogin, chall_status}){
    const navigate = useNavigate();

    // console.log("status", status);

    return(
        <footer className="flex absolute w-full h-[70px] bottom-0 left-0 bg-white ">
          <button className={`flex-1 font-semibold text-[20px] 
            ${status == 0 && chall_status == 0 || status == 1 && chall_status == 0 ? "bg-[#F8A70C] text-[#4A483F] cursor-pointer" : "bg-[#D9D9D9] text-[#B3B3B3] cursor-default" }`}
            onClick={()=>{
                if(!isLoggedIn){
                    setRequestLogin(true);
                    return;
                }

                if(status === 1){
                    setChallengeData((prev)=>({
                        ...prev,
                        status : 0,
                    }))
                }
                else if(status === 0){
                    setChallengeData((prev) => ({
                        ...prev,
                        status: 1,
                    }))
                    navigate (`/challenge/${challengeID}/fee`);
                    // fee 부분에서 status 값이 1로 바뀌도록 해야함.
                }
                else if(status === 2) {
                    // setChallengeData((prev) => ({
                    //     ...prev,
                    //     status: 1,
                    // }))
                }
            }}>
            {status == 0 ? chall_status != 0 ? "모집종료" : "참가하기" :
             status == 1 && chall_status == 0 ? "참여취소" : 
             status == 2 && chall_status == 2 ? "참가완료" : "참가중"}
          </button>
          <button className="flex-1 font-semibold text-[20px] bg-[#FAB809] text-[#4A483F]"
            onClick={()=>{
                if(!isLoggedIn){
                    setRequestLogin(true);
                }else{
                    navigate(`/challenge/${challengeID}/recommend`, {state:{
                        'participant_list': participant_list,
                    }})
                }
            }}>
            권유하기
          </button>
        </footer>
    )
    
}