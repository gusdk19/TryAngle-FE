import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//onProgressChall와 동일한 css 사용
import "../../styles/myChallenge/onProgressChall.css";

import { MdStar } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";

export default function CreateChall({leaderChallengeList, setChallengeList}){

    const navigate = useNavigate();

    const [filter, setFilter] = useState("recruiting"); // filter(3) : "recruiting" - 모집중, "recruit-complete" - 모집완료, "recruit-fail"-모집실패패

    const recruitFailChallenges = leaderChallengeList.filter((challenge)=>{
        const now = new Date();
        const startDate = new Date(challenge.start_date);
        const endDate = new Date(challenge.end_date);

        return((challenge.now_people == 1) && !(now > endDate))
    });

    const recruitingChallenges = leaderChallengeList.filter((challenge)=>{
        const now = new Date();
        const startDate = new Date(challenge.start_date);

        return((challenge.now_people < challenge.max_people)&&(now < startDate))
    });
    const recruitingChallengesSorted = recruitingChallenges.sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateB - dateA; // 최신 날짜가 앞으로 오도록 정렬
    });
    
    const recruiteCompleteChallenges = leaderChallengeList.filter(challenge => (challenge.now_people == challenge.max_people));
    const recruiteCompleteChallengesSorted = recruiteCompleteChallenges.sort((a, b) => {
        const now = new Date();
    
        const aEnded = new Date(a.end_date) < now;
        const bEnded = new Date(b.end_date) < now;
    
        // 종료 여부 우선 비교
        if (aEnded !== bEnded) {
            return aEnded ? 1 : -1; // 종료된 챌린지를 뒤로 보냄
        }
    
        // 종료 여부가 같으면 start_date 기준 최신순 정렬
        return new Date(b.start_date) - new Date(a.start_date);
    });

    const cancelChall = (targetId)=>{
        setChallengeList((preChallList) =>
            preChallList.filter((challenge) => challenge.challenge_id !== targetId)
        );
    }

    return(
        <div className='w-full px-5 mt-4'>
            {/* Navbar */}
            <div className='flex flex-row gap-2 mb-4'>
                <button className={`${filter == "recruiting" ? "filter-selected font-medium" : "filter-unselected font-semibold"}`}
                    onClick={()=>{setFilter("recruiting")}}>
                    모집중
                </button>
                <button className={`${filter == "recruit-complete" ? "filter-selected font-medium" : "filter-unselected font-semibold"}`}
                    onClick={()=>{setFilter("recruit-complete")}}>
                    모집완료
                </button>
                <button className={`${filter == "recruit-fail" ? "filter-selected font-medium" : "filter-unselected font-semibold"}`}
                    onClick={()=>{setFilter("recruit-fail")}}>
                    모집실패
                </button>
            </div>

            {filter == "recruit-fail" && <div className="mb-4 text-[14px] pl-[1px] text-[red]">
                ※ 신청인원 존재하지 않습니다.
            </div>}

            {/* main */}
            <div className={`main ${filter == "recruit-fail" ? "h-[583px]" : "h-[619px]"} pb-4 overflow-scroll`}>
                {/* Challenge List */}
                <div className='card-container'>
                    {(filter == "recruiting" ? recruitingChallengesSorted : 
                      filter == "recruit-fail" ? recruitFailChallenges : recruiteCompleteChallengesSorted).map((challenge)=>{
                        const now = new Date();

                        const startDate = new Date(challenge.start_date);
                        const endDate = new Date(challenge.end_date);

                        // 날짜 차이 계산 (밀리초 단위)
                        const timeDiff = startDate.getTime() - now.getTime();

                        // 밀리초 → 일수 (1일 = 1000 * 60 * 60 * 24)
                        const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                        return(
                            // <div className={`card ${now > endDate && (challenge.participation_success ? "card-success": "card-fail")}`} 
                            <div className={`card`}     
                                onClick={()=>{navigate(`/challenge/${challenge.challenge_id}`, {state:{
                                    tab: "info",
                            }})}}>
                                <div className='card-image flex flex-col'>
                                    <div className='chall-title flex-none'>{challenge.challenge_name}</div>
                                    <img className='chall-thumbnail flex-1' src={challenge.challenge_thumbnail} />
                                    <div className='due-date'>
                                        {now < startDate ? `D-${dayDiff}` : now <= endDate ? "진행중" : "완료"}
                                    </div>
                                    {challenge.leader === 1 && <MdStar className='leader-mark' color='#FFCC5D'/> }
                                </div>
                                <div className='card-text flex flex-row gap-[2px]'>
                                    <span className='main-tag text-[11.5px] mt-[0.5px] '>
                                        #{challenge.challenge_shrotintro}
                                    </span>
                                    {filter == "recruiting" &&
                                     <button className={`number-participants `}>
                                        참여인원(<span className='text-[#B8AA96]'>{challenge.now_people}</span>/{challenge.max_people})
                                    </button>}
                                    {filter == "recruit-fail" &&
                                    //  <button className={`number-participants-fail`}
                                    <button className={`cancel-btn`}
                                        onClick={()=>{cancelChall(challenge.challenge_id);}}>
                                        삭제하기
                                    </button>}
                                </div>
                            </div>
                    )})}
                </div>

                {filter == "recruiting" && <button className='more-btn flex flex-row justify-center gap-[4px] mt-3 w-full text-center'
                    onClick={()=>{navigate("/createchall")}}>
                    <span className=""> 나만의 챌린지 만들기 </span>
                    <FiPlus className='my-auto' color="#B8AA96"/>
                </button>}
            </div>
        </div>
    )
}