import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChallengeFooter({status, challengeID, setParticipate, participant_list, isLoggedIn, setRequestLogin, chall_status, prevPage, deleteChall, min_deposit, onClose, onClose2, inviteCode}){
    const navigate = useNavigate();

    console.log("footer : chall_status", status, chall_status);

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
                    // setUserChallengeData((prev)=>({
                    //     ...prev,
                    //     status : 0,
                    // }))
                    if(deleteChall){
                        onClose(true);
                    }else{
                        onClose2(true);
                    }
                }
                else if(status === 0){
                    // setUserChallengeData((prev) => ({
                    //     ...prev,
                    //     status: 1,
                    // }))
                    if(deleteChall){
                        onClose(true);
                    }else{
                        navigate (`/challenge/${challengeID}/fee`, {state: {prevPage : prevPage, minDeposit : min_deposit}});
                    }
                    // fee 부분에서 status 값이 1로 바뀌도록 해야함.
                }
                else if(status === 2) {
                    // setUserChallengeData((prev) => ({
                    //     ...prev,
                    //     status: 1,
                    // }))
                }
            }}>
            {status == 0 ? chall_status != 0 ? "모집종료" : "참가하기" :
             status == 1 && chall_status == 0 ? deleteChall ? "삭제하기" : "참가취소" : 
             chall_status == 2 ? "참가완료" : "참가중"}
          </button>
          {chall_status == 0 && <button className="flex-1 font-semibold text-[20px] bg-[#FAB809] text-[#4A483F]"
            onClick={()=>{
                if(!isLoggedIn){
                    setRequestLogin(true);
                }else{
                    navigate(`/challenge/${challengeID}/recommend`, {state:{
                        'participant_list': participant_list,
                        'challengeID': challengeID,
                        'inviteCode': inviteCode,
                    }})
                }
            }}>
            권유하기
          </button>}
        </footer>
    )
    
}
