import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/user/user.css";

export default function SUStepFour({nickname, setNickname, errors, setErrors}){

    const navigate = useNavigate();

    const isExisted = true; // 존재하는 닉네임인지 api로 받아오기
    const [isValid, setIsValid] = useState(true);

    const validateNickname = (value) => {
        // 간단한 이메일 정규표현식
        const length = nickname.trim().length;
        return length >= 2 && length <= 10;
    };

    const changeNickname = (e)=>{
        setNickname(e.target.value); 
        setIsValid(validateNickname(e.target.value));
        const newErrors = [];

        if (!isValid) {
            newErrors.push("⚠ 닉네임은 2~10글자로 설정해주세요");
        }
    
        setErrors(newErrors);
    }

    return(
        <div className="mx-[34px]">
            {/* SignUp Four*/}
            <h1 className="mt-[30px] text-[25px] font-bold">닉네임 만들기</h1>
            <div className="flex flex-col gap-[9px] mt-[10px]">
                <div className="flex flex-col gap-1">
                    <input 
                        id="nickname" 
                        className="input text-[#838687] placeholder-[#d9d9d9]" 
                        type="text" 
                        placeholder="닉네임은 2~10글자로 설정해 주세요"
                        value={nickname}
                        onChange={(e)=>{changeNickname(e)}}/>
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