import React, { useRef, useState } from 'react';
import FieldError from '../FieldError';
import { useNavigate } from 'react-router-dom';


export default function InviteCodeModal({ onClose, challengeId, correctCode }) {
    const inputs = useRef([]);
  
    const navigate = useNavigate();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (value, index) => {
        if (/^\d$/.test(value)) {
          if (index < 5) {
            inputs.current[index + 1].focus();
          }
        }

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    };

    const handleVerify = async () => {
      const inputCode = code.join('');
      if (inputCode.length < 6) {
        setErrorMessage('6자리 초대 코드를 입력해주세요.');
        return;
      }

      try {
        const res = await fetch('http://localhost:8080/challenge/invite/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            challengeId: challengeId,
            inviteCode: inputCode,
          }),
        });

        const data = await res.json();

        if (res.ok && data.isSuccess) {
          // 인증 성공
          setErrorMessage('');
          navigate(`/challenge/${challengeId}`, {
            state: { tab: 'info', prevPage: 'home' },
          });
          onClose();
        } else {
          // 인증 실패
          setErrorMessage(data.message || '올바르지 않은 초대 코드입니다.');
        }
      } catch (error) {
        console.error('초대 코드 인증 중 오류:', error);
        setErrorMessage('서버 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        inputs.current[index - 1].focus();
      }
    };

    return (
    <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-[#FDF8ED] p-10 rounded w-[364px] h-[400px] relative">
        <button onClick={onClose} className=" text-[#6E6053] absolute top-3 right-3 w-8 h-8 text-2xl z-10 flex items-center justify-center hover:text-black">×</button>
        <h2 className=" text-[#6E6053] text-center text-[15px] font-bold mb-6">초대 코드</h2>
        <p className="mb-6 text-sm text-gray-600 whitespace-pre-line">비공개 챌린지예요👀 {"\n"}챌린지 초대 코드를 입력해주세요</p>

        {/* 6자리 코드 입력 UI */}
        <div className="flex gap-2 justify-center mb-4">
          {[...Array(6)].map((_, idx) => (
            <input
                key={idx}
                ref={(el) => (inputs.current[idx] = el)}
                maxLength={1}
                className="bg-[#D9D9D9] w-[40px] h-[40px] border rounded text-center text-lg"
                value={code[idx]}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
            />
            ))}
        </div>
        {errorMessage && (<div className="mb-10">
          <FieldError label="" error={errorMessage} />
          </div>
        )}

        <button
            onClick={handleVerify}
            className="w-full bg-[#FFC421] py-2 rounded font-bold text-white"
            >
            초대 코드 확인
        </button>
      </div>
    </div>
  );
}
