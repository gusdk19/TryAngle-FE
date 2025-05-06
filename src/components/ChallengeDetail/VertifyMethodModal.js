import React, {useState, useEffect} from "react";
import "../../styles/finance/withdrawalModal.css";

import { IoMdClose } from "react-icons/io";

export default function VertifyMethodModal({onClose, setVtMethod}){

    const [method, setMethod] = useState("");
    
    const handleChange=()=>{
        setVtMethod(method);
        onClose(false);
    }

    return (
        <>
          <div className="inner-backdrop" onClick={onClose}></div>
          <div className="inner-modal">
            <div className="modal-sq w-full h-full">
                {/* Title */}
                <h2 className="text-[16px] text-[#6e6053] font-semibold text-center pt-[1px]">인증방법 선택</h2>
                
                {/* Close Button */}
                <button className="close-btn" onClick={()=>{onClose(false)}}>
                    <IoMdClose className="text-[#6e6053] w-[25px] h-[25px]" color="#6e6053"/>
                </button>

                
                {/* 인증방법 선택 */}
                <div className="flex justify-center gap-6 my-5 mx-auto py-auto h-[32px] ">
                    <button className={`${method == "camera" ? "text-white bg-[#B8AA96] rounded-md py-1 px-3 font-medium text-[16px]" : "text-[#B8AA96] font-medium text-[16px]" }`}
                     onClick={()=>{setMethod("camera")}}>
                        카메라
                    </button>
                    <button className={`${method == "album" ? "text-white bg-[#B8AA96] rounded-md py-1 px-3 font-medium text-[16px]" : "text-[#B8AA96] font-medium text-[16px]" }`}
                     onClick={()=>{setMethod("album")}}>
                        앨범에서 선택
                    </button>
                </div>

                {/* 변경 버튼 */}
                <div className="w-full grid items-center">
                    <button className={`mx-auto w-[192px] h-[38px] mb-[5px] py-1 rounded-md 
                    text-white font-medium text-[15px] text-center items-center 
                    ${!method ? "bg-[#D9D9D9] cursor-default" : "bg-[#FFC421] cursor-pointer"}`}
                        onClick={handleChange} disabled={method ? false : true}>
                        선택
                    </button>
                </div>
                
            </div>
          </div>
        </>
      );
}