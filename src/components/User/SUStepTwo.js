import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/user/user.css";

export default function SUStepTwo({pw, setPW, checkPW, setCheckPW, errors, setErrors}){

    const navigate = useNavigate();

    const [isValid, setIsValid] = useState(true);

    const validatePassword = (value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(value);
    };

    const changePW = (e)=>{
        setPW(e.target.value); 
        setIsValid(validatePassword(e.target.value));
        const newErrors = pw == checkPW ? [] : ["⚠ 비밀번호가 동일하지 않습니다"];

        if (!isValid) {
            newErrors.push("⚠ 비밀번호는 영문, 숫자, 특수문자 포함 8자 이상으로 설정해주세요");
        }
    
        setErrors(newErrors);
    }

    const changeCheckPW = (e)=>{
        setCheckPW(e.target.value); 
        const newErrors = isValid ? [] : ["⚠ 비밀번호는 영문, 숫자, 특수문자 포함 8자 이상으로 설정해주세요"];

        if (pw !== e.target.value) {
            newErrors.push("⚠ 비밀번호가 동일하지 않습니다");
        }
    
        setErrors(newErrors);
    }    

    return(
        <div className="mx-[34px]">
            {/* SignUp Two */}
            <h1 className="mt-[30px] text-[25px] font-bold">비밀번호 입력</h1>
            <div className="flex flex-col gap-[9px] mt-[10px]">
                <div className="flex flex-col gap-1">
                    <input 
                        id="pw" 
                        className="input text-[#838687] placeholder-[#d9d9d9]" 
                        type="text" 
                        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                        value={pw}
                        onChange={(e)=>{changePW(e)}}/>
                </div>
                

                {/* 에러 메세지 */}
                {!isValid ? <ul className="mt-[4px] px-[5px] text-[12px] text-left text-[red]">
                    <li>
                        ⚠ 비밀번호는 영문, 숫자, 특수문자 포함 8자 이상으로 설정해주세요
                    </li>
                </ul> : <></>}

            </div>
            
            <h1 className="mt-[30px] text-[25px] font-bold">비밀번호 확인</h1>
            <div className="flex flex-col gap-[9px] mt-[10px]">
                <div className="flex flex-col gap-1">
                    <input 
                        id="checkPW" 
                        className="input text-[#838687] placeholder-[#d9d9d9]" 
                        type="text" 
                        placeholder="다시 한 번 비밀번호를 입력해주세요"
                        value={checkPW}
                        onChange={(e)=>{changeCheckPW(e)}}/>
                </div>
                

                {/* 에러 메세지 */}
                {pw !== checkPW ? <ul className="mt-[4px] px-[5px] text-[12px] text-left text-[red]">
                    <li>
                        ⚠ 비밀번호가 동일하지 않습니다
                    </li>
                </ul> : <></>}

            </div>
            
        </div>
    )
}