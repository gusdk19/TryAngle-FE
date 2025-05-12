import React, {useState, useEffect} from "react";
import "../../styles/finance/withdrawalModal.css";

import { IoMdClose } from "react-icons/io";

export default function InquiryModal({onClose}){

    const [inquiry, setInquiry] = useState("");
    
    // const [errors, setErrors] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInquiry(value);

        // const newErrors = [];
    
        // setErrors(newErrors);
    };

    const handleChange=()=>{
        onClose(false);
    }

    return (
        <>
          <div className="inner-backdrop" onClick={onClose}></div>
          <div className="inner-modal">
            <div className="modal-sq w-full h-full">
                {/* Title */}
                <h2 className="text-[16px] text-[#6e6053] font-semibold text-center pt-[1px]">문의하기</h2>
                
                {/* Close Button */}
                <button className="close-btn" onClick={()=>{onClose(false)}}>
                    <IoMdClose className="text-[#6e6053] w-[25px] h-[25px]" color="#6e6053"/>
                </button>

                
                {/* 출금액 입력 */}
                <div className="mx-auto mt-[12px] flex flex-col justify-between gap-2">
                    <label htmlFor="withdrawal" className="ml-[2px] mt-[2.5px] flex-none text-[#6e6053]">
                        <span className={`text-[#6E6053] font-bold text-[15px]`}>문의사항</span>
                    </label>
                    <textarea
                        id="withdrawal"
                        className="text-[13px] h-[20px] flex-1 rounded-md text-[#6e6053] px-[12px] py-[9px] align-middle resize-none"
                        rows={5}
                        placeholder="문의사항을을 입력하세요"
                        value={inquiry}
                        onChange={(e)=>handleInputChange(e)}
                    />
                </div>

                {/* 출금 금액 에러 */}
                {/* {errors.length > 0 && (
                    <ul className="mt-[6px] px-[5px] text-[12px] text-left text-[red]">
                    {errors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                    ))}
                    </ul>
                )} */}

                {/* 변경 버튼 */}
                <div className="w-full grid items-center">
                    <button className={`mx-auto w-full h-[38px] mt-[20px] mb-[5px] py-2 rounded-md 
                    text-white font-medium text-[15px] text-center items-center 
                    ${!inquiry ? "bg-[#D9D9D9] cursor-not-allowed" : "bg-[#FFC421] cursor-pointer"}`}
                        onClick={handleChange} disabled={!inquiry ? true : false}>
                        문의하기
                    </button>
                </div>
                
            </div>
          </div>
        </>
      );
}