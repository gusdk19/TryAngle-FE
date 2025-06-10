import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/user/user.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useAuthStore from "../components/User/UseAuthStore.js";

export default function Login(){

    const page = "login";

    const navigate = useNavigate();

    const { user, login } = useAuthStore();
    
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState([]);

    // API 연동 결과 저장
    const [token, setToken] = useState(''); // Login api token
    const [error, setError] = useState(''); // 로그인 성공 여부
    const [loading, setLoading] = useState(false);

    const validateEmail = (value) => {
        // 간단한 이메일 정규표현식
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const handleClick = async ()=>{
         console.log("tray post login");
         setLoading(true);
         try {
            const res = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password : pw }),
            });

            const data = await res.json();
            // console.log("data", data);

            if (data.isSuccess) {
                setToken(data.result.token);
                setError('');

                localStorage.setItem('accessToken', data.result.token);

                login(data.result.token, data.result.username);

                console.log("nickname", data.result)
                // navigate("/mypage", {state:{success:true}});
                navigate(-1);
            } else {
                setLoading(false);
                setError(data.message || '로그인 실패');
                const newErrors = [];

                newErrors.push(`⚠ ${data.message}`);
            
                setErrors(newErrors);
                setEmail("");
                setPW("");
            }
        } catch (err) {
            setError('서버 오류');
        }
        
        
        // if 로그인 성공
        // navigate("/mypage", {state:{success:true}});
        // if 로그인 실패
        // const newErrors = [];

        // newErrors.push("⚠ 이메일과 암호가 일치하지 않습니다.");
    
        // setErrors(newErrors);
        // setEmail("");
        // setPW("");
    }

    const changeEmail = (e)=>{
        setEmail((e.target.value).trim()); 
        setIsValid(validateEmail((e.target.value).trim()));
        const newErrors = [];

        if (!isValid) {
            newErrors.push("⚠ 이메일 형식이 올바르지 않습니다.");
        }
    
        setErrors(newErrors);
    }

    if(loading){
        return(<div>
            {/* <Header title={"로그인"} />
            <div className="mx-[34px]"></div> */}
            <div className="w-full h-[852px] grid items-center">    
                <div className="spinner"></div>
            </div>
        </div>)
    }

    return(
        <div>
            <Header title={"로그인"} />
            <div className="mx-[34px]">
                <h1 className="mt-[80px] text-[35px] font-bold">로그인</h1>

                {/* Login */}
                <div className="flex flex-col gap-[9px] mt-[40px]">
                    <div className="flex flex-col gap-1">
                        <label className="pl-[3px]" htmlFor="email">이메일</label>
                        <input 
                            id="email" 
                            className="input" 
                            type="text" 
                            placeholder="이메일을 입력해주세요"
                            value={email}
                            onChange={(e)=>{changeEmail(e)}}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="pl-[3px]" htmlFor="password">비밀번호</label>
                        <input 
                            id="password" 
                            className="password-input pr-[10px]" 
                            type="password" 
                            placeholder="비밀번호를 입력해주세요"
                            value={pw}
                            onChange={(e)=>{setPW((e.target.value).trim());}}/>
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