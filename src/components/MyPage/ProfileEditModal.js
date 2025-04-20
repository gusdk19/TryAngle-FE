import React, {useState, useEffect} from "react";
import "../../styles/mypage/ProfileEditModal.css";

// Basic Profile Image
import bpi_1 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_1.png";
import bpi_2 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_2.png";
import bpi_3 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_3.png";
import bpi_4 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_4.png";
import bpi_5 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_5.png";
import bpi_6 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_6.png";
import bpi_7 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_7.png";
import bpi_8 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_8.png";
import bpi_9 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_9.png";
import bpi_10 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_10.png";
import bpi_11 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_11.png";
import bpi_12 from "../../assets/images/mypage/basic_profile_image/basic_profile_image_12.png";

import { IoMdClose } from "react-icons/io";

export default function ProfileEditModal({origNickname, onClose, changeUserData, origPI}){
    const [profileImage, setProfileImage] = useState(origPI);
    const [prePI, setPrePI] = useState(origPI);

    useEffect(()=>{
        setPrePI(prePI);
    }, [profileImage]);

    const basic_profile_image = [bpi_1, bpi_2, bpi_3, bpi_4, bpi_5, bpi_6, bpi_7, bpi_8, bpi_9, bpi_10, bpi_11, bpi_12];


    const [nickname, setNickname] = useState(origNickname);
    const [errors, setErrors] = useState("");
    const [choiceBasicImage, setChoiceBasicImage] = useState(false);

    const usableNickname = "사용 가능한 닉네임입니다.";

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file)); // 미리보기용 URL 생성
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setNickname(value);

        const newErrors = [];

        if (value.length < 2 || value.length > 10) {
        newErrors.push("⚠ 닉네임은 2~10글자로 설정해주세요.");
        }

        if (usableNickname != "사용 가능한 닉네임입니다.") {
        newErrors.push("⚠ 이미 존재하는 닉네임입니다.");
        }

        setErrors(newErrors);
    };

    const handleChange=()=>{
        changeUserData(prevData => ({
            ...prevData,
            nickname: nickname,
            profileImage: profileImage
        }));

        onClose(false);
    }

    return (
        <>
          <div className="inner-backdrop" onClick={onClose}></div>
          <div className="inner-modal">
            <div className="modal-sq w-full h-full">
                {/* Title */}
                <h2 className="text-[16px] text-[#6e6053] font-semibold text-center pt-[1px]">개인정보 변경</h2>
                
                {/* Close Button */}
                <button className="close-btn" onClick={()=>{onClose(false)}}>
                        <IoMdClose className="text-[#6e6053] w-[25px] h-[25px]" color="#6e6053"/>
                    </button>
                {!choiceBasicImage ? 
                // 기본 이미지 버튼 누리지 않았을 때
                <>
                    {/* Profile Image */}
                    <div className="mx-auto mt-[30px] rounded-lg w-[192px] h-[192px] bg-white">
                        <div className="profile-image grid items-center w-full h-full">
                            <div className="image-btn ">
                                <button className={`basic-image-btn h-fit`}
                                onClick={()=>{setChoiceBasicImage(true)}}>기본 이미지 선택</button>
                                <label htmlFor="imageUpload" className="upload-button grid items-center cursor-pointer">
                                    <span className={`upload-image-btn `}>사진 업로드</span>
                                </label>
                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {profileImage && (
                                <div className="preview-image" style={{padding:"15px" }}>
                                    <img src={profileImage} alt="preview" style={{ width: "100%", height:"100%" }} />
                                </div>
                            )}
                        
                        </div>
                    </div>

                    {/* 닉네임 */}
                    <div className="mx-auto px-4 mt-[25px] flex flex-row justify-between gap-2">
                        <label htmlFor="nickname" className="text-[12px] mt-[2.5px] flex-none text-[#6e6053]">
                            <span className={``}>닉네임</span>
                        </label>
                        <input
                            id="nickname"
                            className="text-[12px] h-[25px] flex-1 rounded-md text-[#6e6053] pl-2 align-middle"
                            type="input"
                            value={nickname}
                            onChange={(e)=>handleInputChange(e)}
                        />
                    </div>

                    {/* 닉네임 에러 */}
                    {errors.length > 0 && (
                        <ul className="mt-[10px] px-4 text-[10px] text-[red]">
                        {errors.map((err, idx) => (
                            <li key={idx}>{err}</li>
                        ))}
                        </ul>
                    )}

                    {/* 변경 버튼 */}
                    <div className="w-full grid items-center">
                        <button className={`mx-auto w-[192px] h-[38px] mt-[20px] mb-[5px] px-2 py-1 rounded-md 
                        text-white font-medium text-[15px] text-center items-center 
                        ${errors.length > 0 ? "bg-[#D9D9D9] cursor-not-allowed" : "bg-[#FFC421] cursor-pointer"}`}
                            onClick={handleChange} disabled={errors.length > 0 ? true : false}>
                            변경
                        </button>
                    </div>
                </>
                :
                // 기본 이미지 선택 버튼 눌렀을 때
                <div className="mx-auto mt-[30px] rounded-lg w-[223px] p-[20px] bg-white">
                    <div className="grid-container ">
                        {basic_profile_image.map((img, idx) => (
                            <img key={idx} src={img} alt={`basic-profile-image-${idx}`} 
                            className={`grid-image w-[50px] h-[50px] 
                            ${prePI == img ? "border-[3px] border-[#4A483F] border-solid rounded-[15px]":""}`}
                            onClick={()=>{setPrePI(img)}} />
                        ))}
                    </div>

                    {/* 선택 버튼 */}
                    <div className="w-full grid items-center">
                        <button className={`mx-auto w-[192px] h-[38px] mt-[15px] mb-[5px] px-2 py-1 rounded-md 
                        text-white font-medium text-[15px] text-center items-center 
                        bg-[#FFC421] cursor-pointer`}
                         onClick={()=>{setProfileImage(prePI); setChoiceBasicImage(false);}} >
                            선택
                        </button>
                    </div>

                </div>}
            </div>
          </div>
        </>
      );
}