import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../User/UseAuthStore";

export default function VoteFooter({onVoteUser, onVoteUserID, setVoteStatusList, setOnVote}){
    const navigate = useNavigate();

    const {user_token} = useAuthStore();

    const vote = async(voteType)=>{
      const authenticationId = onVoteUser.auth_id;

      console.log("authenticationId", authenticationId);

      try {
          const res = await fetch(`http://localhost:8080/authentication/${authenticationId}/vote`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user_token}`
              },
              body: JSON.stringify({ 
                  "vote_type": voteType
              }), 
          });
  
          const data = await res.json();

          console.log("vote add check", data.isSuccess, data.message);
  
          if(data.isSuccess){
              console.log("인증 투표를 성공적으로 완료하였습니다.");
              setVoteStatusList(prevList =>
                prevList.map(item =>
                  item.voter_id === onVoteUserID
                    ? { ...item, voted: !item.voted }
                    : item
                )
              );
              setOnVote("");
          } else{
              console.log(`⚠ ${data.message}`);
          }
      } catch (error) {
          console.error('인증 투표 오류:', error);
      }
    }

    return(
        <footer className="flex absolute w-full h-[70px] bottom-0 left-0 bg-white ">
          <button className={`flex-1 font-semibold text-[20px] 
            ${"bg-[#FAB809] text-[#4A483F] cursor-pointer"}`}
            onClick={()=>{
                vote(true);
            }}>
            인정
          </button>
          <button className="flex-1 font-semibold text-[20px] bg-[#838687] text-[#4A483F]"
            onClick={()=>{
                vote(false);
            }}>
            거부
          </button>
        </footer>
    )
    
}