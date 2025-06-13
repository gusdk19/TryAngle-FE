import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/Challenge/Add.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import FieldError from '../components/FieldError';
import useAuthStore from "../components/User/UseAuthStore";

// Basic Profile Image
import bpi_1 from "../assets/images/basic_profile_image/basic_profile_image_1.png";
import bpi_2 from "../assets/images/basic_profile_image/basic_profile_image_2.png";
import bpi_3 from "../assets/images/basic_profile_image/basic_profile_image_3.png";
import bpi_4 from "../assets/images/basic_profile_image/basic_profile_image_4.png";
import bpi_5 from "../assets/images/basic_profile_image/basic_profile_image_5.png";
import bpi_6 from "../assets/images/basic_profile_image/basic_profile_image_6.png";
import bpi_7 from "../assets/images/basic_profile_image/basic_profile_image_7.png";
import bpi_8 from "../assets/images/basic_profile_image/basic_profile_image_8.png";
import bpi_9 from "../assets/images/basic_profile_image/basic_profile_image_9.png";
import bpi_10 from "../assets/images/basic_profile_image/basic_profile_image_10.png";
import bpi_11 from "../assets/images/basic_profile_image/basic_profile_image_11.png";
import bpi_12 from "../assets/images/basic_profile_image/basic_profile_image_12.png";

//API
// ✅ createChallenge.js 내부 수정
const createChallenge = async ({ formData, user_token }) => {


  if (!user_token) {
    console.warn('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
    return;
  }

  console.log("✅ 챌린지 생성 요청 데이터 (FormData):");
    for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
    }

  try {
    const res = await fetch('http://localhost:8080/challenge', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
      body: formData, 
    });

    const data = await res.json();
    console.log("챌린지 생성 응답:", data);

    if (!res.ok || !data.isSuccess) {
      throw new Error(data.message || '챌린지 생성 실패');
    }

    return data;
  } catch (error) {
    console.error('챌린지 생성 오류:', error);
    // alert(`챌린지 생성 실패: ${error.message}`);
  }
};

export default function Add() {

    const location = useLocation();
    const { visibility, inviteCode } = location.state || {};
    const { user_token } = useAuthStore(); //API 연결 시 토큰 전달

    const [challengeName, setChallengeName] = useState('');
    const [challengeNameError, setChallengeNameError] = useState(false);

    const [category, setCategory] = useState('');
    const [categoryError, setCategoryError] = useState(false);

    const [shortIntro, setShortIntro] = useState('');
    const [shortIntroError, setShortIntroError] = useState(false);

    const [startYear, setStartYear] = useState('');
    const [startMonth, setStartMonth] = useState('');
    const [startDay, setStartDay] = useState('');
    const [endYear, setEndYear] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [endDay, setEndDay] = useState('');
    const [dateError, setDateError] = useState('');

    const [certifyPeriod, setCertifyPeriod] = useState('');
    const [certifyPeriodError, setCertifyPeriodError] = useState(false);
    const CERTIFY_OPTIONS = ['매일', '평일 매일', '주말 매일', '주 1일', '주 2일','주 3일', '주 4일', '주 5일', '주 6일']

    const [maxParticipant, setMaxParticipant] = useState('');
    const [maxParticipantError, setMaxParticipantError] = useState(false);
    
    const [challExplain, setChallExplain] = useState('');
    const [challExplainError, setChallExplainError] = useState(false);

    const [depositType, setDepositType] = useState('');
    const [amount, setAmount] = useState('');
    const [depositTypeError, setDepositTypeError] = useState(false);
    const [amountError, setAmountError] = useState(false);


    const [depositManageMethod, setDepositManageMethod] = useState('');
    const [depositManageMethodError, setDepositManageMethodError] = useState('');
    
    const [challAuth, setChallAuth] = useState('');
    const [challAuthError, setChallAuthError] = useState('');

    const [challVote, setChallVote] = useState('');
    const [challVoteError, setChallVoteError] = useState('');

    const [profileImage, setProfileImage] = useState('');
    const [profileImageError, setProfileImageError] = useState('');
    const [prePI, setPrePI] = useState('');
    const [choiceBasicImage, setChoiceBasicImage] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const [bI, setBI] = useState(false);

    const navigate = useNavigate();

    const basicImages = [
    bpi_1, bpi_2, bpi_3, bpi_4, bpi_5, bpi_6,
    bpi_7, bpi_8, bpi_9, bpi_10, bpi_11, bpi_12,
    ];

    const fetchImageAsFile = async (link) => {
        const response = await fetch(link);
        const blob = await response.blob();
        const file = new File([blob], 'profile.png', { type: blob.type });
        return file;
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setImageFile(file);
        setProfileImage(URL.createObjectURL(file));
        setBI(false);
        }
    };

    useEffect(()=>{
        const startDate = new Date(
            parseInt(startYear),
            parseInt(startMonth) - 1,
            parseInt(startDay)
        );
        const endDate = new Date(
            parseInt(endYear),
            parseInt(endMonth) - 1,
            parseInt(endDay)
        );

        if (startDate > endDate) {
            setDateError('wrong input');
            return;
        }

        if (startYear && startMonth && startDay && endYear && endMonth && endDay) {
            setDateError(false);
        }
    },[startYear, startMonth, startDay, endYear, endMonth, endDay])

    // 이미지 -> base64 변환 함수
    const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result); // 예: "data:image/jpeg;base64,...."
        reader.onerror = reject;
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
 
        if (challengeName.trim() === '') {
        setChallengeNameError(true);
        hasError = true;
        }

        if (category === '') {
        setCategoryError(true);
        hasError = true;
        }

        if (shortIntro.trim() === '' || shortIntro.length > 10) {
        setShortIntroError(true);
        hasError = true;
        }

        const startDate = new Date(
            parseInt(startYear),
            parseInt(startMonth) - 1,
            parseInt(startDay)
        );
        const endDate = new Date(
            parseInt(endYear),
            parseInt(endMonth) - 1,
            parseInt(endDay)
        );

        if (startDate > endDate) {
            setDateError('wrong input');
            hasError = true;
        }

        if (!startYear || !startMonth || !startDay || !endYear || !endMonth || !endDay) {
            setDateError(true);
            hasError = true;
        }

        if (!certifyPeriod) {
            setCertifyPeriodError(true);
            hasError = true;
        }

        if (!maxParticipant) {
            setMaxParticipantError(true);
            hasError = true;
        }

        if (challExplain.trim() === '') {
        setChallExplainError(true);
        hasError = true;
        }

        if (!depositType) {
            setDepositTypeError(true);
            hasError = true;
        }

        if (amount.trim() === '') {
        setAmountError(true);
        hasError = true;
        }

        if(depositManageMethod.trim() === ''){
            setDepositManageMethodError(true);
            hasError = true;
        }

        if (challAuth.trim() === '') {
        setChallAuthError(true);
        hasError = true;
        }

        if (challVote.trim() === '') {
            setChallVoteError(true);
            hasError = true;
        }

        if (!profileImage){
            setProfileImageError(true);
            hasError = true;
        }

        if (hasError) return;

        //API
        if (!user_token) {
            // alert('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
            return;
        }

        console.log("String(imageFile)", String(imageFile));

        const challengeData = {
            challenge_name: challengeName,
            challenge_thumbnail: bI ? String(profileImage) : String(imageFile),
            challenge_shortintro: shortIntro,
            challenge_description: challExplain,
            category: Number(category) - 1,
            challenge_public: visibility === 'public',
            start_date: `${startYear}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`,
            end_date: `${endYear}-${String(endMonth).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`,
            auth_time_start: '06:00',
            auth_time_end: '22:00',
            max_people: Number(maxParticipant),
            min_deposit: Number(amount),
            return_type: depositType === '예치금' ? 1 : 0,
            auth_frequency: certifyPeriod,
            deposit_manage_method: depositManageMethod,
            auth_method: challAuth,
            vote_method: challVote,
        };

        const leaderJoinData = {
            deposit: Number(amount),
        };

        console.log('challengeData:', challengeData);
        console.log('typeof category:', typeof challengeData.category);

        // FormData 구성
        const formData = new FormData();
        formData.append('challengeData', new Blob([JSON.stringify(challengeData)], { type: 'application/json' }));
        formData.append('leaderJoinData', new Blob([JSON.stringify(leaderJoinData)], { type: 'application/json' }));
        if (imageFile) {
            formData.append('thumbnailImage', bI ? fetchImageAsFile(profileImage) : imageFile); // ✅ 이렇게 전송
        }

        try {
        const result = await createChallenge({
            formData,
            user_token,
        });

        console.log('result:', result);

        if (result?.isSuccess) {
            // alert('챌린지 생성 성공');
            navigate('/');
    
        }
        } catch (error) {
        console.error("챌린지 생성 중 예외 발생:", error);
        }
    
  };

    // console.log("date", "certify", dateError, certifyPeriod);

    return (
        <div className="bg-white flex justify-center w-full">
            {/* 모바일 프레임 */}
            <div className="bg-white w-[393px] h-[852px]">
                <Header title={"챌린지 추가"}/>
    
            {/*본문 */}
                <main className="main h-[730px] overflow-auto px-5 mt-[20px] pb-6">
                    <h2 className="text-[24px] font-bold mb-4 text-[#4A483F]">챌린지 추가</h2>

                    {/* 입력 폼들 */}
                    <form onSubmit={handleSubmit}>
                        {/* 챌린지 이름*/}
                        <div className="mb-6">
                            <FieldError
                                label="챌린지 이름"
                                error={challengeNameError ? "챌린지 이름을 입력해주세요" : ""}
                            />
                            <input
                                type="text"
                                value={challengeName}
                                onChange={(e) => {
                                setChallengeName(e.target.value);
                                setChallengeNameError(false);
                                }}
                                placeholder="챌린지 이름을 입력해주세요"
                                className={`min-w-[240px] px-4 py-2 border rounded-md text-sm outline-none transition ${
                                challengeNameError ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                        </div>
                        {/* 카테고리 선택 */}
                        <div className="mb-6">
                            <FieldError
                                label="카테고리 선택"
                                error={categoryError ? "카테고리를 선택해주세요" : ""}
                            />
                            <select
                                value={category}
                                onChange={(e) => {
                                setCategory(e.target.value);
                                setCategoryError(false);
                                }}
                                className={`w-[138px] px-4 py-2 border rounded-md text-sm outline-none transition bg-white ${
                                    category === '' ? 'text-gray-400' : 'text-black'
                                } ${categoryError ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">카테고리 선택</option>
                                <option value="1">운동</option>
                                <option value="2">공부</option>
                                <option value="3">생활</option>
                                <option value="4">기타</option>
                            </select>
                        </div>
                        {/* 10글자 소개*/}
                        <div className="mb-6">
                            <FieldError
                                label="10글자 소개"
                                error={shortIntroError ? "10글자 이내로 소개글을 입력해주세요" : ""}
                            />
                            <input
                                type="text"
                                value={shortIntro}
                                onChange={(e) => {
                                setShortIntro(e.target.value);
                                setShortIntroError(false);
                                }}
                                placeholder="챌린지에 대한 짧은 소개를 입력해주세요"
                                className={`min-w-[354px] px-4 py-2 border rounded-md text-sm outline-none transition ${
                                shortIntroError ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            <p className='px-1 mt-2 text-sm text-[#B3B3B3]'>※ 짧은 소개글은 섬네일에 표시됩니다</p>
                        </div>
                        {/*챌린지 기간*/}
                        <div className="mb-6">
                            <FieldError
                                label="챌린지 기간"
                                error={dateError ? dateError == 'wrong input' ? '신청기간을 올바르게 입력해주세요' : '신청 기간을 입력해주세요' : ''}
                            />
                            <div className="scroll overflow-x-auto overflow-y-hidden whitespace-nowrap rounded px-2 py-1 flex gap-2">
                                {/* 시작일 */}
                                <select value={startYear} onChange={(e) => setStartYear(e.target.value)} className={`border w-[85px] px-2 py-1 rounded text-sm ${
                                    startYear === '' ? 'text-gray-400' : 'text-black'
                                }`}>
                                <option value="">년도</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                </select>
                                <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)} className={`border w-[60px] px-2 py-1 rounded text-sm ${
                                    startMonth === '' ? 'text-gray-400' : 'text-black'
                                }`}>
                                <option value="">월</option>
                                {[...Array(12)].map((_, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                                </select>
                                <select value={startDay} onChange={(e) => setStartDay(e.target.value)} className={`border w-[60px] px-2 py-1 rounded text-sm ${
                                    startDay === '' ? 'text-gray-400' : 'text-black'
                                }`}>
                                <option value="">일</option>
                                {[...Array(31)].map((_, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                                </select>
                                
                                <span className="mx-1 text-[#838687]">-</span>

                                {/* 종료일 */}
                                <select value={endYear} onChange={(e) => setEndYear(e.target.value)} className={`border w-[85px] px-2 py-1 rounded text-sm ${
                                    endYear === '' ? 'text-gray-400' : 'text-black'
                                }`}>
                                <option value="">년도</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                </select>
                                <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)} className={`border w-[60px] px-2 py-1 rounded text-sm ${
                                    endMonth === '' ? 'text-gray-400' : 'text-black'
                                }`}>
                                <option value="">월</option>
                                {[...Array(12)].map((_, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                                </select>
                                <select value={endDay} onChange={(e) => setEndDay(e.target.value)} className={`border w-[60px] px-2 py-1 rounded text-sm ${
                                    endDay === '' ? 'text-gray-400' : 'text-black'
                                }`}>
                                <option value="">일</option>
                                {[...Array(31)].map((_, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                                </select>
                            </div>
                        </div>
                        {/*인증 기간*/}
                        <div className="mb-6">
                        
                            <FieldError
                                label="인증 기간"
                                error={certifyPeriodError ? '인증 기간을 선택해주세요' : ''}
                            />
                            <div className="scroll overflow-x-auto overflow-y-hidden whitespace-nowrap rounded p-1 flex gap-2">
                                {CERTIFY_OPTIONS.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => {setCertifyPeriod(option);setCertifyPeriodError(false);}}
                                    className={`px-4 py-1 rounded-full border text-sm transition-all
                                    ${certifyPeriod === option
                                        ? 'bg-gray-600 text-white'
                                        : 'border-gray-400 text-gray-700 bg-white hover:bg-gray-100'}
                                    `}
                                >
                                    {option}
                                </button>
                                ))}
                            </div>
                            <p className='px-1 mt-2 text-sm text-[#B3B3B3]'>※ 인증 요일은 월, 화, 수, 목, 금, 토, 일 입니다</p>
                        </div>
                        {/* 최대 모집 인원 */}
                        <div className="mb-6">
                            <FieldError
                                label="최대 모집 인원"
                                error={maxParticipantError? "최대 모집 인원을 선택해주세요" : ""}
                            />
                            <select
                                value={maxParticipant}
                                onChange={(e) => {
                                setMaxParticipant(e.target.value);
                                setMaxParticipantError(false);
                                }}
                                className={`w-[145px] px-4 py-2 border rounded-md text-sm outline-none transition bg-white ${
                                    maxParticipant === '' ? 'text-gray-400' : 'text-black'
                                } ${maxParticipantError ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">최대 모집 인원</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                            <p className='px-1 mt-2 text-sm text-[#B3B3B3]'>※ 1명을 선택할 경우, 혼자 참여하는 챌린지로 추가됩니다</p>
                        </div>
                        {/* 챌린지 소개*/}
                        <div className="mb-6">
                            <FieldError
                                label="챌린지 소개"
                                error={challExplainError ? "챌린지 내용을 입력해주세요" : ""}
                            />
                            <textarea
                                type="text"
                                value={challExplain}
                                onChange={(e) => {
                                setChallExplain(e.target.value);
                                setChallExplainError(false);
                                }}
                                placeholder="챌린지 소개를 입력해주세요"
                                className={`min-w-[354px] min-h-[80px] px-4 py-2 border rounded-md text-sm outline-none transition ${
                                challExplainError ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            
                        </div>
                        {/*챌린지 비용*/}
                        <div className="mb-6">
                            <FieldError
                            label = "챌린지 비용"
                            error={depositTypeError ? '챌린지 비용 방식을 선택해주세요' : ''}
                            />
                            {/* 선택 버튼(예치금/기부) */}
                            <div className='flex gap-2 py-1'>
                                {['예치금', '기부'].map((type) => (
                                    <button 
                                    key={type} 
                                    type="button"
                                    onClick={()=> {
                                        setDepositType(type);
                                        setDepositTypeError(false);
                                    }} 
                                    className={`px-3 py-1 rounded-full border text-sm ${
                                        depositType === type
                                        ? 'bg-[#4A483F] text-white'
                                        : 'border-gray-400 text-gray-700'
                                    }`}
                                    >
                                    {type}
                                    </button>
                                ))}
                            </div>
                            {/* 금액 입력 */}
                            <div className="flex flex-col gap-3 justify-between mt-2">
                                {amountError ? <FieldError className="max-h-[20px]"
                                    error={amountError ? '최소 챌린지 비용을 입력해주세요' : ''}
                                /> : ""}

                                <div className="flex items-center gap-2">
                                    <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                        setAmountError(false);
                                    }}
                                    className={`w-[120px] px-3 py-1 border rounded-md text-sm outline-none 
                                        appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                                        ${amountError ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    />
                                    <span className="text-sm">원</span>
                                </div>

                                {/* 동적으로 변경되는 문구 */}
                                {depositType && <p className="text-sm text-[#B3B3B3] px-1">
                                    ※ 최소 200,000원까지 {depositType} 비용을 입력할 수 있습니다
                                </p>}

                                {/* 선택한 방식에 따라 동적으로 안내 문구 변경 */}
                                <textarea
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    value={depositManageMethod}
                                    onChange={(e) => {
                                    setDepositManageMethod(e.target.value);
                                    setDepositManageMethodError(false);
                                    }}
                                    placeholder={
                                    depositType === '예치금'
                                        ? '예치금 관리 방식을 설명해주세요.'
                                        : '기부금 관리 방식을 설명해주세요.'
                                    }
                                />
                            </div>

                        </div>
                        {/* 챌린지 인증 방식*/}
                        <div className="mb-6">
                            <FieldError
                                label="챌린지 인증 방식"
                                error={challAuthError ? "챌린지 인증 방식을 입력해주세요" : ""}
                            />
                            <textarea
                                type="text"
                                value={challAuth}
                                onChange={(e) => {
                                setChallAuth(e.target.value);
                                setChallAuthError(false);
                                }}
                                placeholder="챌린지 인증 방식을 설명해주세요"
                                className={`min-w-[354px] min-h-[80px] px-4 py-2 border rounded-md text-sm outline-none transition ${
                                challAuthError ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            
                        </div>
                        {/* 챌린지 투표 방식*/}
                        <div className="mb-6">
                            <FieldError
                                label="챌린지 투표 방식"
                                error={challVoteError ? "챌린지 투표 방식을 입력해주세요" : ""}
                            />
                            <textarea
                                type="text"
                                value={challVote}
                                onChange={(e) => {
                                setChallVote(e.target.value);
                                setChallVoteError(false);
                                }}
                                placeholder="챌린지 투표 방식을 설명해주세요"
                                className={`min-w-[354px] min-h-[80px] px-4 py-2 border rounded-md text-sm outline-none transition ${
                                challVoteError ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            
                        </div>
                        {/* 챌린지 대표 이미지 설정 */}
                        <div className="mb-6">
                        <FieldError 
                            label="대표 이미지 설정" 
                            error={profileImageError ? "대표 이미지를 설정해주세요.": ""} />

                        {!choiceBasicImage ? (
                            <div className="w-full h-[190px] bg-white mx-auto mt-[10px] rounded-lg">
                            <div className="grid items-center w-full h-full">
                                <div className={`relative m-auto w-[150px] h-[145px] border border-gray-300 rounded-md flex flex-col justify-center items-center gap-2`}>
                                
                                {profileImage && (
                                <div className="absolute z-10">
                                    <img src={profileImage} alt="preview" className={`w-[150px] ${profileImage ? "h-fit max-h-[150px] opacity-[80%]" : "h-[145px]"} object-fill rounded-md`} />
                                </div>
                                )}

                                <button
                                    className="w-[115px] h-[24px] border border-gray-300 rounded-md flex flex-col justify-center items-center basic-image-btn text-sm text-[#B3B3B3] z-20"
                                    onClick={() => setChoiceBasicImage(true)}
                                >
                                    기본 이미지 선택
                                </button>

                                <label htmlFor="imageUpload" className="cursor-pointer z-20">                                   
                                    <span className=" w-[95px] h-[24px] border border-gray-300 rounded-md flex flex-col justify-center items-center upload-image-btn text-sm text-[#B3B3B3] ">사진 업로드</span>
                                </label>

                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                                </div>

                                
                            </div>
                            </div>
                        ) : (
                            <>
                            <div className="w-fit bg-white mx-auto rounded-lg mt-[20px] p-[20px] border-[1px] border-solid border-[#D9D9D9]">
                                <div className="w-fit mx-auto grid grid-cols-3 gap-2 ">
                                {basicImages.map((img, idx) => (
                                    <img
                                    key={idx}
                                    src={img}
                                    alt={`basic-${idx}`}
                                    className={`w-[56px] h-[56px] cursor-pointer object-cover ${
                                        prePI === img ? "border-[3px] border-[#4A483F] rounded-[15px]" : ""
                                    }`}
                                    onClick={() => {
                                        setPrePI(img);
                                        setProfileImage(img);
                                        setProfileImageError(false);
                                        setBI(true);
                                    }}
                                    />
                                ))}
                                </div>
                                <button
                                className="bg-[#FFC421] text-white font-medium w-[192px] h-[38px] mt-[15px] rounded-md mx-auto block"
                                onClick={() => setChoiceBasicImage(false)}
                                >
                                선택 완료
                                </button>
                            </div>
                            </>
                        )}
                        </div>
                        <button type="submit" className="w-[272px] ml-10 mt-[-8px] mb-[30px] py-3 text-white font-semibold rounded-lg bg-[#FAB809] transition duration-200 shadow-sm">
                            챌린지 추가
                        </button>
                    </form>
                </main>
    
                
            
            </div>
            <Footer page="home" />
        </div>
        );
}