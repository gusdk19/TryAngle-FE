import React, { useRef,useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import FieldError from '../components/FieldError';

export default function InviteCode() {
  const location = useLocation();
  const navigate = useNavigate();

  const { visibility, from } = location.state || {};

  console.log("from", from);

  const [code, setCode] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [isValidate, setIsValidate] = useState(false);


  const handleChange = (index, value) => {
    if (value.length > 1) return;

    // 숫자 유효성 검사
    if (isNaN(value)) {
      setErrorMessage("초대 코드는 숫자로 입력해주세요");
      setIsValidate(true);
      return;
    }

    setErrorMessage(""); // 유효하면 메시지 초기화
    setIsValidate(false);

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // 다음 input으로 포커스
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputsRef.current[index - 1]?.focus();
    }
  };


  const handleSubmit = () => {
    const inviteCode = code.join('');
    if (inviteCode.length < 6) {
      alert('초대 코드를 설정해주세요!');
      return;
    }

    if (from == "add-challenge"){
      navigate('/add-challenge/content', {
        state: { visibility, inviteCode },
      });
    } else{
      // 챌린지 정보 확인 및 참여 목적 초대코드 입력 시시
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      {/* 모바일 프레임 */}
      <div className="bg-white w-[393px] h-[852px] relative">
        <Header />

        {/* 본문 */}
        <div className="p-[18px] pt-20">
          <h2 className="text-[24px] px-1 font-bold mb-6 text-[#4A483F]">
            초대 코드를 설정해주세요!
          </h2>
          <h3 className="text-[#3D3D3D] text-[15px] px-1 mb-6">친구들을 초대할 수 있는 초대 코드를 만들어주세요</h3>

          {/* 초대 코드 입력 필드 위에 라벨과 에러 함께 표시 */}
            <FieldError
              error={isValidate ? errorMessage : ''}
             />
          {/* 1자씩 입력하는 회색 박스 */}
          <div className="flex ml-8 gap-2 mb-6">
            {code.map((char, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={char}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-[40px] h-[40px] border bg-[#D9D9D9] text-center text-lg rounded-md"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-[#FAB809] hover:bg-yellow-500 text-white font-bold py-2 w-full rounded-xl"
          >
            다음
          </button>
        </div>
      </div>
      <Footer page="home" />
    </div>
  );
}