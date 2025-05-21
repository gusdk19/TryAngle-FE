import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/user/user.css";

export default function SUStepOne({email, setEmail, errors, setErrors, setEmailExisted}){

    const navigate = useNavigate();

    const [isValid, setIsValid] = useState(true);

    const validateEmail = (value) => {
        // 간단한 이메일 정규표현식
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const changeEmail = async (e)=>{
        setEmail((e.target.value).trim()); 
        setIsValid(validateEmail((e.target.value).trim()));
        const newErrors = [];

        if (!isValid) {
            newErrors.push("⚠ 이메일 형식이 올바르지 않습니다.");
        }else{
            // try {
            //     const res = await fetch('http://localhost:8080/user/checkEmail', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({ email: (e.target.value).trim() }),
            //     });

            //     const data = await res.json();
            //     console.log("email check", data.isSuccess, data.message);

            //     if(data.isSuccess){
            //         setEmailExisted(false);
            //     } else{
            //         setEmailExisted(true);
            //         newErrors.push(`⚠ ${data.message}`);
            //     }
            // } catch (error) {
            //     console.error('이메일 확인 오류:', error);
            // }
        }
    
        setErrors(newErrors);
    }

    return(
        <div className="mx-[34px]">
            {/* SignUp One*/}
            <h1 className="mt-[30px] text-[25px] font-bold">이메일 주소를 입력해주세요</h1>
            <div className="flex flex-col gap-[9px] mt-[10px]">
                <div className="flex flex-col gap-1">
                    <label className="pl-[3px] mb-[10px] text-[#838687]" for="email">자주 쓰는 이메일을 입력해주세요</label>
                    <input 
                        id="email" 
                        className="input text-[#838687] placeholder-[#d9d9d9]" 
                        type="text" 
                        placeholder="이메일 주소 입력"
                        value={email}
                        onChange={(e)=>{changeEmail(e)}}/>
                </div>

                {/* 에러 메세지 */}
                {errors.length > 0 && (
                    <ul className="flex flex-col gap-1 mt-[4px] px-[5px] text-[12px] text-left text-[red]">
                    {errors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                    ))}
                    </ul>
                )}

            </div>
        </div>
    )
}