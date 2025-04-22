import React from "react";

export default function FinanceRecord({financeStatus}){


    return(
        <div className="flex flex-col gap-[18px] mt-[20px] mx-auto w-[350px] ">
            {financeStatus.map((challenge)=>(
                <div key={challenge.challenge_id} 
                    className="w-full flex flex-col gap-[10px] px-[15px] py-[13px] mx-auto bg-[#FDF8ED] rounded-md">
                    <div className="font-bold text-[14.5px] text-[#6E6053]">
                        [{challenge.challenge_name}]
                    </div>
                    <div className="flex flex-row gap-[25px] justisfy-between items-center px-1">
                        <img className="flex-none w-[60px] h-[60px] rounded-lg p-1 bg-[#E5E0D5]"
                            src={challenge.challenge_thumbnail} alt={`${challenge.challenge_name}-thumbnail`}/>
                        <div className="flex-1 flex flex-col gap-[2.5px] text-[#B8AA96] pr-[4px]">
                            <div className="text-[13px] flex flex-row gap-[10px]">
                                <span className="flex-none font-medium">예치금</span>
                                <span className="flex-1 font-normal text-center">{challenge.deposit_date}</span>
                                <span className="flex-none mt-[-1px] text-[15px] font-bold text-[#6E6053]">{challenge.deposit}원</span>
                            </div>
                            <div className="text-[13px] flex flex-row gap-[10px]">
                                <span className="flex-none font-medium">반환액</span>
                                <span className="flex-1 font-normal text-center">{challenge.deposit_return_date}</span>
                                <span className="flex-none mt-[-1.5px] text-[15px] font-bold text-[#6E6053]">
                                    {challenge.status != "정산완료" ? challenge.status : challenge.return+"원"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}