// ChallengeCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Challenge/ChallengeCard.css";
import { MdStar } from "react-icons/md";
//import { TiDeleteOutline } from "react-icons/ti";

export default function ChallengeCard({
  challenge,
  filter,
  onCancel,
}) {
  const navigate = useNavigate();
  const now = new Date();
  const startDate = new Date(challenge.start_date);
  const endDate = new Date(challenge.end_date);
  const timeDiff = startDate.getTime() - now.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const isLeader = challenge.leader === 1;

  const statusLabel =
    now < startDate
      ? `D-${dayDiff}`
      : now <= endDate
      ? "진행중"
      : "완료";

  const handleClick = () => {
    navigate(`/challenge/${challenge.challenge_id}`, {
      state: { tab: "info" },
    });
  };

  return (
    <div className={`card`} onClick={handleClick}>
      <div className="card-image flex flex-col">
        <div className="chall-title flex-none">
          {challenge.challenge_name}
        </div>
        <img
          className="chall-thumbnail flex-1"
          src={challenge.challenge_thumbnail}
          alt={challenge.challenge_name}
        />
        <div className="due-date">{statusLabel}</div>
        {isLeader && <MdStar className="leader-mark" color="#FFCC5D" />}
      </div>

      <div className="card-text flex flex-row gap-[2px]">
        <span className="main-tag text-[11.5px] mt-[0.5px] ">
          #{challenge.challenge_shrotintro}
        </span>

        {filter === "recruiting" && (
          <button className="number-participants">
            참여인원(
            <span className="text-[#B8AA96]">
              {challenge.now_people}
            </span>
            /{challenge.max_people})
          </button>
        )}

        {filter === "recruit-fail" && (
          <button
            className="cancel-btn"
            onClick={(e) => {
              e.stopPropagation();
              onCancel && onCancel(challenge);
            }}
          >
            삭제하기
          </button>
        )}
      </div>
    </div>
  );
}