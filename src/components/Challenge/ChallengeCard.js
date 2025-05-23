import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import "../../styles/Challenge/ChallengeCard.css";
import InviteCodeModal from "./InviteCodeModal";

export default function ChallengeCard({challenge}) {

  const navigate = useNavigate();

  const correctCode="123456";

  const now = new Date();
  const startDate = new Date(challenge.start_date);
  const endDate = new Date(challenge.end_date);
  const timeDiff = startDate.getTime() - now.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const [showInviteModal, setShowInviteModal] = useState(false);

  const statusLabel =
    now < startDate
      ? `D-${dayDiff}`
      : now <= endDate
      ? "진행중"
      : "완료";

  const handleClickCard = () => {
    if (!challenge.challenge_public) {
      setShowInviteModal(true);
    } else {
      navigate(`/challenge/${challenge.challenge_id}`, {
        state: { tab: 'info' },
      });
    }
  }

  return (
    <>
    <div
      className="card hover:bg-[#FAB809]"
      onClick={handleClickCard}
    >
      {/* 내부 박스 */}
        <div className="card-image">
            <p className="challenge-title text-[#4A483F]">{challenge.title}</p>

            <img
            src={challenge.image}
            alt={challenge.title}
            className="chall-thumbnail"
            />

            <p className="due-date">{statusLabel}</p>
        </div>

        <div className="w-full pl-[15px] mt-[13px] mb-[8px]">
            <p className="card-text">{challenge.tag}</p>
        </div>

    </div>
    {showInviteModal && (
        <InviteCodeModal
          onClose={() => setShowInviteModal(false)}
          challengeId={challenge.challenge_id}
          correctCode={correctCode}
        />
      )}
  </>
  );
}

