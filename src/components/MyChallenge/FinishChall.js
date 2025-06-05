import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//onProgressChall와 동일한 css 사용
import "../../styles/myChallenge/onProgressChall.css";

import { MdStar } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";

export default function FinishChall({finishedChallengeList }){

    const navigate = useNavigate();

    const sortedFinishedChallengeList = finishedChallengeList.sort((a, b) => {
        // 1단계: participation_success 기준
        if (a.participation_success !== b.participation_success) {
            return b.participation_success - a.participation_success; // 1이 앞에 오도록
        }
    
        // 2단계: deposit_status 기준 (참여 성공자 중에서는 미정산(0)이 먼저)
        if (a.participation_success === 1 && b.participation_success === 1) {
            return a.deposit_status - b.deposit_status; // 0이 앞에 오도록
        }
    
        // 3단계: 기타 - 그대로 두거나 날짜 기준 등 추가 정렬 가능
        return 0;
    });


    return(
        <div className='main w-full h-[666px] px-5 pb-4 mt-4 overflow-scroll'>
            
            {/* Challenge List */}
            <div className='card-container'>
                {sortedFinishedChallengeList.map((challenge)=>{
                    const startDate = new Date(challenge.start_date);
                    const endDate = new Date(challenge.end_date);

                    // 날짜 차이 계산 (밀리초 단위)
                    const timeDiff = endDate.getTime() - startDate.getTime();

                    // 밀리초 → 일수 (1일 = 1000 * 60 * 60 * 24)
                    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                    return(
                        <div className={`${challenge.participation_success ? "card-success" : "card-fail"}`} onClick={()=>{navigate(`/challenge/${challenge.challenge_id}`, {state:{
                            tab: "info",
                            challenge: challenge,
                        }})}}>
                            <div className='card-image flex flex-col'>
                                <div className='chall-title flex-none'>{challenge.challenge_name}</div>
                                <img className='chall-thumbnail flex-1' src={challenge.challenge_thumbnail} />
                                {challenge.leader === 1 && <MdStar className='leader-mark' color='#FFCC5D'/> }
                            </div>
                            <div className='card-text flex flex-row'>
                                <span className='main-tag'>
                                    #{challenge.challenge_shrotintro}
                                </span>
                                {challenge.participation_success === 1 && 
                                <div className={`${challenge.deposit_status ? "adjust-done" : "adjust-progress"}`}>
                                    {challenge.deposit_status ? "정산완료" : "정산중"}
                                </div>}
                            </div>
                        </div>
                )})}
            </div>

            
        </div>
    )
}