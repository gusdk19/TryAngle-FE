import React, {useState, useEffect} from "react";
import "../../styles/finance/withdrawalModal.css";

import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function ChangePWModal({onClose, tempPW, setTempPW, email, setEmail, prevPage}){

    const navigate = useNavigate();
    const [resend, setResend] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleResend=async()=>{
        const newErrors = [];

        // 비밀번호 재설정 (변경 요청) api
        try {
            const res = await fetch('http://localhost:8080/user/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            const data = await res.json();
            console.log("set new password check", data.isSuccess, data.message);

            if(data.isSuccess){
                setTempPW(data.result);
            } else{
                newErrors.push("재전송에 실패했습니다.");
                newErrors.push(`(실패 사유 : ${data.message})`);
                setEmail("");
            }
        } catch (error) {
            console.error('비밀번호 변경 확인 오류:', error);
        }

        setErrors(newErrors);
        setResend(true);
    }

    const handleCheck=()=>{
        navigate("/login", {state: {prevPage: prevPage}});
    }

    return (
        <>
          <div className="inner-backdrop" onClick={onClose}></div>
          <div className="inner-modal">
            <div className="modal-sq w-full h-full">
                {/* Title */}
                <h2 className="flex justify-center text-[16px] text-[#6e6053] font-semibold text-center pt-[1px]">
                    <div className="flex-none my-auto">비밀번호 변경 요청</div>
                </h2>
                
                {/* Close Button */}
                <button className="close-btn" onClick={()=>{onClose(false)}}>
                    <IoMdClose className="text-[#6e6053] w-[25px] h-[25px]" color="#6e6053"/>
                </button>

                
                {/* 비밀번호 변경 이메일 전송 완료 문구 */}
                {errors.length == 0 
                    ? <div className="mx-auto my-[15px] flex flex-col justify-between gap-2 text-center">
                        <span htmlFor="withdrawal" className="ml-[2px] mt-[2px] flex-none text-[#6e6053] text-[16px]">
                            <span className="flex flex-col gap-2">
                                <span>임시 비밀번호가 이메일로 {resend ? <span className="font-bold">재전송</span> : "전송"}되었습니다.</span>
                                <span>(임시 비밀번호 : <span className="font-bold text-[red]">{tempPW}</span>)</span>
                                <span>이메일 확인 후, <span className="font-bold">확인 버튼</span>을 눌러 주시기 바랍니다.</span>
                                <span className="text-[red] text-[15px]">※ 이메일이 전송되지 않았을 경우, 아래 <span className="font-bold">재전송 버튼</span>을 눌러주시기 바랍니다.</span>
                            </span>
                        </span>
                    </div>
                    :<ul className="flex flex-col gap-1 mt-[4px] px-[5px] text-[15px] text-left text-[red]">
                        {errors.map((err, idx) => (
                            <li key={idx}>{err}</li>
                        ))}
                    </ul>
    
                }


                {/*변경 버튼 */}
                <div className="w-full flex flex-row gap-2">
                    {errors.length == 0 ?
                    <button className={`flex-1 mx-auto h-[38px] mt-[2px] mb-[5px] py-1 rounded-md 
                    text-white font-medium text-[15px] text-center items-center 
                    ${"bg-[#F8A70C] cursor-pointer"}`}
                        onClick={handleResend} >
                        재전송
                    </button> : ""}
                    <button className={`flex-1 mx-auto h-[38px] mt-[2px] mb-[5px] py-1 rounded-md 
                    text-white font-medium text-[15px] text-center items-center 
                    ${"bg-[#FFC421] cursor-pointer"}`}
                        onClick={()=>{
                            if(errors.length > 0){
                                onClose(false);
                            }else{
                                handleCheck();
                            }}} >
                        확인
                    </button>
                </div>
                
            </div>
          </div>
        </>
      );
}