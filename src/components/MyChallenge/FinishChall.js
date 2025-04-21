import React, { useState } from 'react';
//onProgressChall와 동일한 css 사용
import "../../styles/myChallenge/onProgressChall.css";

import { MdStar } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";

export default function FinishChall({finishedChallengeList }){



    return(
        <div className='w-full px-5 mt-4'>
            
            {/* Challenge List */}
            <div className='card-container mt-4'>
                {finishedChallengeList.map((challenge)=>{
                    const startDate = new Date(challenge.start_date);
                    const endDate = new Date(challenge.end_date);

                    // 날짜 차이 계산 (밀리초 단위)
                    const timeDiff = endDate.getTime() - startDate.getTime();

                    // 밀리초 → 일수 (1일 = 1000 * 60 * 60 * 24)
                    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                    return(
                        <div className={`${challenge.participation_success ? "card-success" : "card-fail"}`}>
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