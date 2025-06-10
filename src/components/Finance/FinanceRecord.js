import React from "react";
import "../../styles/finance/financeRecord.css";

export default function FinanceRecord({financeStatus, loading}){


    
    return(
        <div className="main max-h-[480px] overflow-scroll flex flex-col gap-[18px] my-[20px] mx-auto w-[350px] ">
            {loading ? <div className="grid items-center w-full h-[480px]">
                <div className="spinner"></div>
            </div>
            : financeStatus.map((challenge)=>{
                
                const depositDate = challenge.depositDate ? challenge.depositDate.split('T')[0] : "";
                const depositReturnDate = challenge.depositReturnDate ? challenge.depositReturnDate.split('T')[0] : "";


                return(<div key={challenge.challengeId} 
                    className="w-full flex flex-col gap-[10px] px-[15px] py-[13px] mx-auto bg-[#FDF8ED] rounded-md">
                    <div className="flex flex-row justify-between font-bold text-[14.5px] text-[#6E6053]">
                        <div className="flex-none">[{challenge.challengeName}]</div>
                            {challenge.status != "not_refunded_yet" && <div className="flex-none text-red-500">
                                {challenge.status == "refunded" ? "정산완료" : "기부완료"}
                            </div>}
                    </div>
                    <div className="flex flex-row gap-[25px] justisfy-between items-center px-1">
                        <img className="flex-none w-[60px] h-[60px] rounded-lg bg-[#E5E0D5]"
                            src={challenge.challengeThumbnail} alt={`${challenge.challengeName}-thumbnail`}/>
                        <div className="flex-1 flex flex-col gap-[2.5px] text-[#B8AA96] pr-[4px]">
                            <div className="text-[13px] flex flex-row gap-[10px]">
                                <span className="flex-none font-medium">예치금</span>
                                <span className="flex-1 font-normal pl-[20px] text-left">{depositDate}</span>
                                <span className="flex-none mt-[-1px] text-[15px] font-bold text-[#6E6053]">{challenge.deposit}원</span>
                            </div>
                            <div className="text-[13px] flex flex-row gap-[10px]">
                                <span className="flex-none font-medium">반환액</span>
                                <span className="flex-1 font-normal pl-[20px] text-left">{depositReturnDate}</span>
                                <span className="flex-none mt-[-1.5px] text-[15px] font-bold text-[#6E6053]">
                                    {challenge.status == "not_refunded_yet" ? challenge.refund_status : <span>{challenge.refundAmount}원</span>}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )})}
        </div>
    );
}