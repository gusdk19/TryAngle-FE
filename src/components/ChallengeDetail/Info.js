import React, { useState } from 'react';

export default function Info({challengeData}){
    
    const left_people = challengeData.max_people - challengeData.now_people;

    const application_period = challengeData.start_date ? new Date(challengeData.start_date) : "";
    if(application_period){
        application_period.setDate(application_period.getDate()-1);
    }
    // console.log("application_period", challengeData.start_date, application_period)
    const formattedAP = application_period ? application_period.toISOString().split('T')[0] : "";

    const [tab, setTab] = useState("basic_info");

    return(
        <div className="">
            <div className='pl-1 text-[12px] text-[#6E6053]'>
                #{challengeData.challenge_shortintro}
            </div>

            {/* 모집 현황 */}
            <div className="px-1 my-2">
                <div className="flex gap-1 px-3 py-[5px] bg-[#FDF8ED] text-[13px] rounded-md">
                    <div className='font-semibold text-[#6E6053]'>
                        {challengeData.now_people}명 참여중
                    </div>
                    <hr orientation="vertical" className="h-[15x] mt-[2px] mx-[8px] border-[#6E6053] border-l-[0.1px]" />
                    <div className='text-[#B8AA96]'>
                        {left_people > 0 ? 
                         <span>모집정원까지 <span className="font-semibold text-[#6E6053]">{left_people}명</span> 남았습니다!</span> 
                        : "현재 모집 정원이 모두 충족되어 모집이 마감된 상태입니다."}
                    </div>
                </div>
            </div>

            {/* 챌린지 정보 */}
            <div className="px-1 my-3">
                <div className='flex gap-3 mb-2'>
                    <button className={`flex-none text-[11px] rounded-lg w-[85px] h-[20px] py-auto pt-[2px] text-center font-semibold
                        ${tab=="basic_info" ? "text-[#FDF8ED] bg-[#6E6053]" : "text-[#6E6053] bg-[#FDF8ED] font-medium"}`}
                        onClick={()=>{setTab("basic_info")}}>
                        챌린지 소개
                    </button>
                    <button className={`flex-none text-[11px] rounded-lg w-[85px] h-[20px] py-auto pt-[2px] text-center font-semibold
                        ${tab=="vertify" ? "text-[#FDF8ED] bg-[#6E6053]" : "text-[#6E6053] pt-[2px] bg-[#FDF8ED] font-medium"}`}
                        onClick={()=>{setTab("vertify")}}>
                        인증방법
                    </button>
                    <button className={`flex-none text-[11px] rounded-lg w-[85px] h-[20px] py-auto pt-[2px] text-center font-semibold
                        ${tab=="vote" ? "text-[#FDF8ED] bg-[#6E6053]" : "text-[#6E6053] pt-[2px] bg-[#FDF8ED] font-medium"}`}
                        onClick={()=>{setTab("vote")}}>
                        투표방법
                    </button>
                </div>
                <div>
                    { tab == "basic_info" ? 
                    <div className="flex flex-col gap-2 px-2 text-[#6E6053] font-medium">
                        <div className="flex flex-row gap-1 text-[13px]">
                            <div className="w-[100px] font-semibold">신청기간</div>
                            <div className="text-[#B8AA96]">~{formattedAP ? formattedAP: ''}</div>
                        </div>
                        <div className="flex flex-row gap-1 text-[13px]">
                            <div className="w-[100px] font-semibold">인증기간</div>
                            <div className="text-[#B8AA96]">{challengeData.start_date}~{challengeData.end_date}</div>
                        </div>
                        <div className="flex flex-row gap-1 text-[13px]">
                            <div className="w-[100px] font-semibold">최소 예치금</div>
                            <div className="text-[#B8AA96]">{challengeData.min_deposit.toLocaleString()}원</div>
                        </div>
                        <div className="flex flex-row gap-1 text-[13px]">
                            <div className="w-[100px] font-semibold">최대모집인원</div>
                            <div className="text-[#B8AA96]">{challengeData.max_people}명</div>
                        </div>
                        <div className="flex flex-col gap-1 text-[13px]">
                            <div className="w-[100px] font-semibold">[ 챌린지 내용 ]</div>
                            <div className="text-[#B8AA96] px-1">
                                {challengeData?.challenge_description?.split('\n').map((line, idx) => (
                                    <div key={idx}>{line}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    : tab == "vertify" ? <div className="px-2 pb-3 text-[#6E6053] text-[13px]">
                        <div className='px-1'>
                            {challengeData?.auth_method?.split('\n').map((line, idx) => (
                                <div key={idx}>{line}</div>
                            ))}
                        </div>
                    </div>
                    : <div className="px-2 pb-3 text-[#6E6053] text-[13px]">
                        <div className='px-1'>
                            {challengeData?.vote_method?.split('\n').map((line, idx) => (
                                <div key={idx}>{line}</div>
                            ))}
                        </div>
                    </div>
                    }
                </div>
            </div>

        </div>
    )
}