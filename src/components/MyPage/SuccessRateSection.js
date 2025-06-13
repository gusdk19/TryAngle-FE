import React, {useState, useEffect} from "react";
import "../../styles/mypage/SuccessRateSection.css";
import useAuthStore from "../User/UseAuthStore";

export default function SuccessRateSection(){

    const {user_token} = useAuthStore();

    const [successRate, setSuccessRate] = useState({});
    const dummySuccessRate = {
        total_success_rate: 72,
        category_success_rate: [
          {
            category: "운동",
            success_rate: 72
          },
           {
            category: "공부",
            success_rate: 72
          },
            {
            category: "생활",
            success_rate: 72
          },
            {
            category: "기타",
            success_rate: 72
          },
        ]
    }

    useEffect(()=>{
      const getSuccessRateData = async ()=>{
        try {
            const res = await fetch('http://localhost:8080/challenge/rate/total', {
                method: 'GET',
                headers: {
                  // 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user_token}`
                },
            });

            const data = await res.json();
            console.log("Success Rate Data check", data.isSuccess, data.result);

            if(data.isSuccess){
                setSuccessRate(data.result);
            } else{
                console.log(`⚠ ${data.message}`);
                setSuccessRate(dummySuccessRate);
            }
        } catch (error) {
            console.error('성공률 조회 오류:', error);
        }
      }

      if(user_token){
        getSuccessRateData();
      }

    }, [])


    return(
        <div className="mt-[23px]">
            <h3 className="text-sm font-semibold text-[#6e6053] ml-[2px]">
                챌린지 달성률
            </h3>
            <div className="mt-1">
                <div className="text-xs text-[#6e6053] ml-1 " >(전체)</div>
                <div className="flex flex-row gap-[5px] mt-[6px] pl-[2px] pr-[10px]">
                    <progress className="flex-1 ml-1 w-full" value={successRate.total_success_rate/100} />
                    <div className="flex-none text-xs text-[#6e6053] mt-[-1.5px] items-center">({successRate.total_success_rate}%)</div>
                </div>
                {successRate?.category_success_rate?.map((item,idx) => {
                    return(
                        <div key={idx} className="flex flex-row gap-[5px] mt-[6px] pl-[9px] pr-[10px]">
                            <div className="flex-none text-xs text-[#6e6053] mt-[-1.5px] items-center">{item.category}</div>
                            <progress className="flex-1 ml-1 w-full" value={item.success_rate/100} />
                            <div className="flex-none text-xs text-[#6e6053] mt-[-1.5px] items-center">({item.success_rate}%)</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}