import React from "react";
import { useNavigate } from "react-router-dom";

export default function VoteFooter({onVoteUserID, setVoteStatusList, setOnVote}){
    const navigate = useNavigate();

    return(
        <footer className="flex absolute w-full h-[70px] bottom-0 left-0 bg-white ">
          <button className={`flex-1 font-semibold text-[20px] 
            ${"bg-[#FAB809] text-[#4A483F] cursor-pointer"}`}
            onClick={()=>{
                setVoteStatusList(prevList =>
                    prevList.map(item =>
                      item.voter_id === onVoteUserID
                        ? { ...item, voted: !item.voted }
                        : item
                    )
                );
                // auth_success true로 post
                setOnVote("");
            }}>
            인정
          </button>
          <button className="flex-1 font-semibold text-[20px] bg-[#838687] text-[#4A483F]"
            onClick={()=>{
                setVoteStatusList(prevList =>
                    prevList.map(item =>
                      item.voter_id === onVoteUserID
                        ? { ...item, voted: !item.voted }
                        : item
                    )
                );
                // auth_success false로로 post
                setOnVote("");
            }}>
            거부
          </button>
        </footer>
    )
    
}