import { ChevronRight } from "lucide-react";
import deposit_image from "../../assets/images/mypage/deposit_image.png";
import reward_image from "../../assets/images/mypage/reward_image.png";

import "../../styles/mypage/UserDepositReward.css";
import React from "react";

export default function UserDepositReward({deposit, reward}) {
  // Data for the financial summary
  return (
    <div className="FinanceBox border-[#B8AA96] border-[1px] rounded-md">
      <div className="deposit">
        <div className="text-index">
          <img className="depositImage" width="32px" height="22px" alt="depositImage" src={deposit_image} />
          <div className="deposit-title font-bold">챌린지 비용</div>
        </div>
        <div className="deposit-text font-bold">{deposit}원</div>
      </div>
      <hr orientation="vertical" className="h-[18px] mt-[2px] mx-[8px] border-[#B8AA96] border-l-[0.1px]" />
      <div className="reward">
        <div className="text-index">
          <img className="rewardImage" width="25px" height="25px" alt="rewardImage" src={reward_image} />
          <div className="reward-title font-bold">환급금</div>
        </div>
        <div className="reward-text font-bold">{reward}원</div>
      </div>
      <ChevronRight className="chevron-right mx-[1px] my-auto" color="#B8AA96" />
    </div>
  );
}
