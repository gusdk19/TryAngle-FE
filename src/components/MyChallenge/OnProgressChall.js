import React, { useState } from 'react';
import "../../styles/myChallenge/onProgressChall.css";

import CancelModal from './CancelModal';

import { MdStar } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function OnProgressChall({onProgressChallengeList, dueChallengeList, setChallengeList}){

    const navigate = useNavigate();
    
    const [filter, setFilter] = useState("due"); // filter(2) : "due" - 예정, "onProgress" - 진행중

    const [openModal, setOpenModal] = useState(false);
    const [cancelChallID, setCancelChallID] = useState();
    const [cancelChallName, setCancelChallName] = useState();

    const cancelChall = (challenge)=>{
        setOpenModal(true);
        setCancelChallID(challenge.challenge_id);
        setCancelChallName(challenge.challenge_name);
    }

    return(
        <div className='w-full px-5 mt-4'>
            {/* Navbar */}
            <div className='flex flex-row gap-2 mb-4'>
                <button className={`${filter == "due" ? "filter-selected font-medium" : "filter-unselected font-semibold"}`}
                    onClick={()=>{setFilter("due")}}>
                    예정
                </button>
                <button className={`${filter == "onProgress" ? "filter-selected font-medium" : "filter-unselected font-semibold"}`}
                    onClick={()=>{setFilter("onProgress")}}>
                    진행중
                </button>
            </div>
            {/* main */}
            <div className='main h-[619px] pb-4 overflow-scroll'>
                {/* Challenge List */}
                <div className='card-container'>
                    {(filter == "due" ? dueChallengeList : onProgressChallengeList).map((challenge)=>{
                        const startDate = new Date(challenge.start_date);
                        const now = new Date();

                        // 날짜 차이 계산 (밀리초 단위)
                        const timeDiff = startDate.getTime() - now.getTime();

                        // 밀리초 → 일수 (1일 = 1000 * 60 * 60 * 24)
                        const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                        return(
                            <div className="card" key={challenge.challenge_id} onClick={()=>{navigate(`/challenge/${challenge.challenge_id}`, {state:{
                                tab: "info",
                                challenge: challenge,
                            }})}}>
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
                                    <button className={`${filter == "due" ? "cancel-btn" : challenge.auth_status ? "auth-done-btn" : "auth-btn"}`}
                                        onClick={(e)=>{
                                            e.stopPropagation(); 
                                            if(filter == "due"){
                                                cancelChall(challenge)
                                            }
                                            else{
                                                if(!challenge.auth_status){
                                                    navigate(`/challenge/${challenge.challenge_id}`, {state:{
                                                        tab: "vertify",
                                                    }});
                                                }
                                            }
                                        }}>
                                        {filter == "due" ? "참가 취소" : challenge.auth_status ? "인증완료" : "인증하기"}
                                    </button>
                                </div>
                            </div>
                    )})}
                </div>

                <button className='more-btn flex flex-row justify-center gap-[4px] mt-3 w-full text-center'
                    onClick={()=>{navigate("/")}}>
                    <span className=""> 모집중인 챌린지 더보기 </span>
                    <FaAngleRight className='my-auto' color="#B8AA96"/>
                </button>
            </div>
            {openModal && 
                <CancelModal onClose={setOpenModal} cancel={"participate"} 
                    cancelChallID={cancelChallID} cancelChallName={cancelChallName} setChallengeList={setChallengeList}/>}
        </div>
    )
}