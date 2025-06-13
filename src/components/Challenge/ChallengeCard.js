import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import "../../styles/Challenge/ChallengeCard.css";
// import InviteCodeModal from "./InviteCodeModal";

export default function ChallengeCard({challenge, setShowInviteModal, setCorrectCode, setChallengeID}){

  const navigate = useNavigate();

  // const correctCode="123456";

  const now = new Date();
  const startDate = new Date(challenge.start_date);
  const endDate = new Date(challenge.end_date);
  const timeDiff = startDate.getTime() - now.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  // const [showInviteModal, setShowInviteModal] = useState(false);

  const statusLabel =
    now < startDate
      ? `D-${dayDiff}`
      : now <= endDate
      ? "진행중"
      : "완료";

  const handleClickCard = () => {
    if (!challenge.challenge_public) {
      setCorrectCode(challenge.invite_code);  
      setChallengeID(challenge.challenge_id);
      setShowInviteModal(true);
    } else {
      navigate(`/challenge/${challenge.challenge_id}`, {
        state: { tab: 'info', prevPage: 'home', challenge: challenge },
      });
    }
  }
  /*
  useEffect(()=>{
    setCorrectCode("123456");
    setChallengeID(challenge.challenge_id);
  }, []);
  */

  return (
    <>
    <div
      className="card hover:bg-[#FAB809]"
      onClick={handleClickCard}
    >
      {/* 내부 박스 */}
        <div className="card-image">
            <p className="challenge-title text-[#4A483F] z-10">{challenge.challenge_name}</p>

            <img
            src={challenge.challenge_thumbnail}
            alt={challenge.challenge_name}
            className="chall-thumbnail"
            />

            <p className="due-date">{statusLabel}</p>
        </div>

        <div className="w-full pl-[15px] mt-[10px] mb-[8px]">
            <p className="card-text">#{challenge.challenge_shortintro}</p>
        </div>

    </div>
    {/* {showInviteModal && (
        <InviteCodeModal
          onClose={() => setShowInviteModal(false)}
          challengeId={challenge.challenge_id}
          correctCode={correctCode}
        />
      )} */}
  </>
  );
}

