import React, { useEffect, useState } from "react";
import "../styles/user/user.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Login(){

    const page = "login";

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState([]);

    const validateEmail = (value) => {
        // 간단한 이메일 정규표현식
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const handleClick = ()=>{
        // if 로그인 성공
        // navigate("/mypage", {state:{success:true}})
        // if 로그인 실패
        const newErrors = [];

        newErrors.push("⚠ 이메일과 암호가 일치하지 않습니다.");
    
        setErrors(newErrors);
        setEmail("");
        setPW("");
    }

    const changeEmail = (e)=>{
        setEmail(e.target.value); 
        setIsValid(validateEmail(e.target.value));
        const newErrors = [];

        if (!isValid) {
            newErrors.push("⚠ 이메일 형식이 올바르지 않습니다.");
        }
    
        setErrors(newErrors);
    }

    return(
        <div>
            <Header title={"로그인"} />
            <div className="mx-[34px]">
                <h1 className="mt-[80px] text-[35px] font-bold">로그인</h1>

                {/* Login */}
                <div className="flex flex-col gap-[9px] mt-[40px]">
                    <div className="flex flex-col gap-1">
                        <label className="pl-[3px]" for="email">이메일</label>
                        <input 
                            id="email" 
                            className="input" 
                            type="text" 
                            placeholder="이메일을 입력해주세요"
                            value={email}
                            onChange={(e)=>{changeEmail(e)}}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="pl-[3px]" for="email">비밀번호</label>
                        <input 
                            id="email" 
                            className="input" 
                            type="text" 
                            placeholder="비밀번호를 입력해주세요"
                            value={pw}
                            onChange={(e)=>{setPW(e.target.value);}}/>
                    </div>

                    {/* 에러 메세지 */}
                    {errors.length > 0 && (
                        <ul className="mt-[4px] px-[5px] text-[12px] text-left text-[red]">
                        {errors.map((err, idx) => (
                            <li key={idx}>{err}</li>
                        ))}
                        </ul>
                    )}

                    <div className="w-full grid items-center">
                        <button className={`mx-auto w-full h-[38px] mt-[5px] mb-[5px] py-1 rounded-md 
                        font-bold text-[15px] text-center items-center 
                        ${errors.length > 0 || email.length <= 0 || !isValid || pw.length <= 0 ? "bg-[#D9D9D9] text-[#838687] cursor-default" : "bg-[#FFC421] text-white cursor-pointer"}`}
                            onClick={handleClick} disabled={errors.length > 0 || email.length <= 0 || !isValid || pw.length <= 0 ? true : false}>
                            로그인
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mx-[34px] text-[#838687] text-[12px]">
                <div className="flex-none flex my-auto">
                    <span className="flex-none text-[12px] underline cursor-pointer"
                        onClick={()=>{navigate("/signup")}}>
                        회원가입
                    </span>
                </div>
                <div className="flex-none flex gap-[2px] my-auto">
                    <span className="text-[12px] underline cursor-pointer"
                        onClick={()=>{navigate("/findEmail")}}>
                            이메일 찾기
                    </span>
                    <hr orientation="vertical" className="h-[12px] mt-[4px] mx-[8px] border-[#D9D9D9] border-l-[0.1px]" />
                    <span className="text-[12px] underline cursor-pointer"
                        onClick={()=>{navigate("/findPW")}}>
                            비밀번호 재설정
                    </span>
                </div>
            </div>

            {/* Footer Navigation */}
            {/* <Footer page={page}/> */}
        </div>
    )
}