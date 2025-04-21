import React, { useState } from 'react';
import "../../styles/myChallenge/onProgressChall.css";

import { MdStar } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function OnProgressChall({onProgressChallengeList, dueChallengeList, setChallengeList}){

    const navigate = useNavigate();
    
    const [filter, setFilter] = useState("due"); // filter(2) : "due" - 예정, "onProgress" - 진행중중

    const cancelChall = (targetId)=>{
        setChallengeList((preChallList) =>
            preChallList.filter((challenge) => challenge.challenge_id !== targetId)
        );
    }

    return(
        <div className='w-full px-5 mt-4'>
            {/* Navbar */}
            <div className='flex flex-row gap-2'>
                <button className={`${filter == "due" ? "filter-selected font-medium" : "filter-unselected font-semibold"}`}
                    onClick={()=>{setFilter("due")}}>
                    예정
                </button>
                <button className={`${filter == "onProgress" ? "filter-selected font-medium" : "filter-unselected font-semibold"}`}
                    onClick={()=>{setFilter("onProgress")}}>
                    진행중
                </button>
            </div>

            {/* Challenge List */}
            <div className='card-container mt-4'>
                {(filter == "due" ? dueChallengeList : onProgressChallengeList).map((challenge)=>{
                    const startDate = new Date(challenge.start_date);
                    const endDate = new Date(challenge.end_date);

                    // 날짜 차이 계산 (밀리초 단위)
                    const timeDiff = endDate.getTime() - startDate.getTime();

                    // 밀리초 → 일수 (1일 = 1000 * 60 * 60 * 24)
                    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                    return(
                        <div className="card">
                            <div className='card-image flex flex-col'>
                                <div className='chall-title flex-none'>{challenge.challenge_name}</div>
                                <img className='chall-thumbnail flex-1' src={challenge.challenge_thumbnail} />
                                {dayDiff > 0 && <div className='due-date'>D-{dayDiff}</div>}
                                {challenge.leader === 1 && <MdStar className='leader-mark' color='#FFCC5D'/> }
                            </div>
                            <div className='card-text flex flex-row'>
                                <span className='main-tag'>
                                    #{challenge.challenge_shrotintro}
                                </span>
                                <button className={`${filter == "due" ? "cancel-btn" : challenge.status ? "auth-done-btn" : "auth-btn"}`}
                                    onClick={()=>{
                                        if(filter == "due"){
                                            cancelChall(challenge.challenge_id)
                                        }
                                        else{
                                            if(!challenge.status){
                                                navigate(`/challenge/${challenge.challenge_id}/auth`);
                                            }
                                        }
                                    }}>
                                    {filter == "due" ? "참가 취소" : challenge.status ? "인증완료" : "인증하기"}
                                </button>
                            </div>
                        </div>
                )})}
            </div>

            <button className='more-btn flex flex-row justify-center gap-[4px] mt-4 w-full text-center'
                onClick={()=>{navigate("/")}}>
                <span className=""> 모집중인 챌린지 더보기 </span>
                <FaAngleRight className='my-auto' color="#B8AA96"/>
            </button>
        </div>
    )
}