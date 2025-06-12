import React, { useState } from 'react';
import "../../styles/finance/TotalFinanceBox.css";
import deposit_image from "../../assets/images/mypage/deposit_image.png";
import reward_image from "../../assets/images/mypage/reward_image.png";

export default function TotalFinanceBox({totalDeposit, totalReturn, onClose}){


    return(
        <div className="flex flex-col gap-[10px]
            mt-[20px] mx-auto px-[11px] py-[16px] w-[350px] border-[1px] border-[#B8AA96] border-solid rounded-md">
            {/* 예치금 - 챌린지 비용 */}
            <div className='px-[8px]'>
                <div className='text-[12px] text-[#B8AA96]'>
                    내가 걸고 있는 챌린지 비용
                </div>
                <div className='flex flex-row gap-[10px] pl-[2px] mt-[10px]'>
                    <img className="depositImage h-[30px] mt-[3.5px] " width="36px" height="24px" alt="depositImage" src={deposit_image} />
                    <span className='text-[24px] text-[#6E6053] font-bold'>
                        <span>{totalDeposit}</span>원
                    </span>
                </div>
            </div>

            {/* Separator */}
            <hr orientation="horizontal" className="w-full mt-[4px] border-[#B8AA96] border-l-[0.1px]" />
              
            {/* 환급금 - 반환받은 챌린지 비용 */}
            <div className='mt-[5px] px-[8px]'>
                <div className='flex flex-row justify-between'>
                    <span className='text-[12px] text-[#B8AA96] mt-[-1px]'>반환받은 챌린지 비용</span>
                    <button className='withdrawal-btn text-[11px] font-semibold h-fit px-[14px] pt-[0.5px] pb-[1px] my-auto mt-[1px] text-[#4A483F] bg-[#F4F4F4] rounded-md'
                        onClick={()=>{onClose(true)}}>
                        출금
                    </button>
                </div>
                <div className='flex flex-row gap-[10px] pl-[2px] mt-[7px]'>
                    <img className="rewardImage w-[36px] h-[36px]" width="33px" height="33px" alt="rewardImage" src={reward_image} />
                    <span className='text-[24px] mt-[-2px] text-[#6E6053] font-bold'>
                        <span className=''>{totalReturn}</span>원
                    </span>
                </div>
            </div>
        </div>
    )
}