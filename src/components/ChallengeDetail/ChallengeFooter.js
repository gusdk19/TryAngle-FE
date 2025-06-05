import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChallengeFooter({status, challengeID, setChallengeData, participant_list, isLoggedIn, setRequestLogin}){
    const navigate = useNavigate();

    return(
        <footer className="flex absolute w-full h-[70px] bottom-0 left-0 bg-white ">
          <button className={`flex-1 font-semibold text-[20px] 
            ${status >= 2 ? "bg-[#D9D9D9] text-[#B3B3B3] cursor-default" : "bg-[#F8A70C] text-[#4A483F] cursor-pointer"}`}
            onClick={()=>{
                if(!isLoggedIn){
                    setRequestLogin(true);
                    return;
                }

                if(status == 1){
                    setChallengeData((prev)=>({
                        ...prev,
                        status : 0,
                    }))
                }
                else if(status == 0){
                    setChallengeData((prev)=>({
                        ...prev,
                        status : 1,
                    }))
                }
            }}>
            {status == -1 ? "참가하기" :
             status == 0 ? "참여취소" : 
             status == 1 ? "참가중" : "참가완료"}
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