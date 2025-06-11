import React, {useState, useEffect, useRef} from "react";
import Webcam from 'react-webcam';
import { HiOutlineCamera } from "react-icons/hi";
import { FaRegCircle } from "react-icons/fa";
import { BiPhotoAlbum } from "react-icons/bi";
import VertifyMethodModal from "./VertifyMethodModal";
import useAuthStore from "../User/UseAuthStore";

const addAuth = async (formData, user_token, image, setAuthImage, setAuthId) => {

  console.log("user_token", user_token);

  if (!user_token) {
    console.warn('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
    return;
  }

  console.log("✅ 챌린지 생성 요청 데이터 (FormData):");
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    const res = await fetch('http://localhost:8080/authentication', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
      body: formData, 
    });

    const data = await res.json();
    console.log("인증 추가 응답:", data);

    if (!res.ok || !data.isSuccess) {
      throw new Error(data.message || '인증 추가 실패');
    } else {
        setAuthImage(image);
        // setAuthId(data.result.auth_id);
    }
  } catch (error) {
    console.error('인증 추가 오류:', error);
  }
};

const editAuth = async (formData, user_token, image, setAuthImage, setAuthId, authenticationId) => {

  console.log("user_token", user_token);

  if (!user_token) {
    console.warn('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
    return;
  }

  console.log("✅ 챌린지 생성 요청 데이터 (FormData):");
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    const res = await fetch(`http://localhost:8080/authentication/${authenticationId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
      body: formData, 
    });

    const data = await res.json();
    console.log("인증 수정 응답:", data);

    if (!res.ok || !data.isSuccess) {
      throw new Error(data.message || '인증 수정 실패');
    } else {
        setAuthImage(image);
        // setAuthId(data.result.auth_id);
    }
  } catch (error) {
    console.error('인증 수정 오류:', error);
  }
};


export default function Vertify({vertifyMethod, challengeId}){

    const {user_token, user_nickName} = useAuthStore();

    const [authImage, setAuthImage] = useState("");
    const [authId, setAuthId] = useState("");

    const [vtMethod, setVtMethod] = useState("");
    const [closeModal, setCloseModal] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getAuthList = async()=>{
            try {
                const res = await fetch(`http://localhost:8080/authentication/all/${challengeId}`, {
                    method: 'GET',
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user_token}`
                    },
                    // body: JSON.stringify({ "challenge_id" : cancelChallID }), 
                });
        
                const data = await res.json();

                console.log("find whole Authentication list check", data, data.isSuccess, data.message);
        
                if(data.isSuccess){
                    const filteredResult = data.result.filter((auth)=>{
                        // console.log("auth", auth.user_nickname, user_nickName);
                        return(auth.user_nickname === user_nickName)
                    });
                    const myAuth = filteredResult[filteredResult.length - 1]
                    console.log("filteredResult",myAuth);
                    setAuthId(myAuth ? myAuth.auth_id : "");
                    setAuthImage(myAuth ? myAuth.auth_image : "");
                    console.log("인증 전체를 조회하였습니다.");
                } else{
                    setAuthId("");
                    setAuthImage("");
                    console.log(`⚠ ${data.message}`);
                }
                setLoading(false);
            } catch (error) {
                setAuthId("");
                setAuthImage("");
                console.error('인증 전체 조회 오류:', error);
            }
        }
    
        getAuthList();
    }, [authImage, authId]);

    // Vertify : camera
    const webcamRef = useRef(null);

    const dataURLtoFile = (dataUrl, fileName) => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while(n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, { type: mime });
    }
    

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log("imageSrc", imageSrc);
        const file = dataURLtoFile(imageSrc, 'webcam_capture.jpg');

        const authData = authImage == "" ? { "challenge_id": challengeId, "comment": `챌린지 ${challengeId} 인증` } : {"comment": `챌린지 ${challengeId} 인증` }

        const formData = new FormData();
        formData.append('authData', new Blob([JSON.stringify(authData)], { type: 'application/json' }));
        if (imageSrc) {
            formData.append('authImage', file); // ✅ 이렇게 전송
        }

        if(authImage == ""){
            addAuth(formData, user_token, imageSrc, setAuthImage, setAuthId);        
        } else {
            editAuth(formData, user_token, imageSrc, setAuthImage, setAuthId, authId);
        }
    };

    // Vertify : album
    const inputRef = useRef(null);

    const openAlbum = () => {
        inputRef.current.click();
    };

    const getImageFromAlbum = (e) => {
        const file = e.target.files[0];
        if (file) {
          const url = URL.createObjectURL(file);
          console.log('Selected file URL:', url);

          const authData = authImage == "" ? { "challenge_id": challengeId, "comment": `챌린지 ${challengeId} 인증` } : {"comment": `챌린지 ${challengeId} 인증` }

          const formData = new FormData();
          formData.append('authData', new Blob([JSON.stringify(authData)], { type: 'application/json' }));
          formData.append('authImage', file); // ✅ 이렇게 전송
          
          // preview or upload logic here
          if(authImage == ""){
            addAuth(formData, user_token, url, setAuthImage, setAuthId);
          } else {
            editAuth(formData, user_token, url, setAuthImage, setAuthId, authId);
          }
        }
    };

    const cancelAuth = async () => {

        const authenticationId = authId;

        const delAuth = async()=>{
            try {
                const res = await fetch(`http://localhost:8080/authentication/${authenticationId}`, {
                    method: 'DELETE',
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user_token}`
                    },
                    // body: JSON.stringify({ "challenge_id" : cancelChallID }), 
                });
        
                const data = await res.json();
                console.log("delete Authentication check", data, data.isSuccess, data.message);
        
                if(data.isSuccess){
                    console.log("챌린지 인증을 삭제하였습니다.");
                    setAuthImage("");
                    setAuthId("");
                } else{
                    console.log(`⚠ ${data.message}`);
                }
            } catch (error) {
                console.error('챌린지 인증 삭제 오류:', error);
            }
        }
    
        delAuth();
        // setAuthImage("");
        // setAuthId("");
    }

    return(
        <div className="mt-3">

            {loading ? <div className="grid grid-center h-[260px] px-auto bg-transparent rounded-lg">
                <div className="w-full h-full grid items-center">
                    <div className="spinner"></div>
                </div>
            </div>            
             : vtMethod == "" ?
              authImage ? 
                <>
                    <div className="grid grid-center h-[260px] px-auto bg-transparent rounded-lg">
                        <img className="overflow-auto mx-auto rounded-md max-w-full max-h-full" src={authImage}/>
                    </div>
                    <div className="flex justify-center mt-2 px-auto">
                        <button className={`flex-none mx-auto font-medium text-[#d9d9d9] px-3 py-1 
                            hover:font-semibold hover:text-[#bdbdbd] hover:border-[#bdbdbd]`}
                        onClick={()=>{cancelAuth()}}>
                            인증 취소하기
                        </button>
                    </div>
                    <div className="mt-2 text-sm text-red-500 text-center">※ 인증을 성공적으로 완료하였습니다.</div>
                </>
                :<>
                    <div className="grid grid-center h-[260px] bg-[#D9D9D9] rounded-lg">
                        <HiOutlineCamera className="m-auto w-[48px] h-[48px] text-white cursor-pointer" 
                        onClick={()=>{setCloseModal(1)}}/>
                    </div>
                    <div className="mt-2 text-sm text-red-500 text-left">※ 인증을 진행해주십시오.</div>
                </>
            :
            <>
                {vtMethod == "camera" ? 
                  authImage ?
                    <div className="grid grid-center h-[260px] px-auto bg-transparent rounded-lg"
                    hidden={vtMethod=="album" ? false : true}>
                        <img className="overflow-auto mx-auto rounded-md max-w-full max-h-full" src={authImage}/>
                    </div>
                  : <>
                    {/* Camera */}
                    <Webcam
                        className="rounded-lg"
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        hidden={vtMethod=="camera" ? false : true}
                    />
                    <FaRegCircle className="w-[40px] h-[40px] m-3 mx-auto text-[#D9D9D9] cursor-pointer" onClick={capture} 
                        hidden={vtMethod=="camera" ? false : true}/>
                  </>
                : <>
                    {/* Album */}
                    {authImage ? 
                      <div className="grid grid-center h-[260px] px-auto bg-transparent rounded-lg"
                    hidden={vtMethod=="album" ? false : true}>
                        <img className="overflow-auto mx-auto rounded-md max-w-full max-h-full" src={authImage}/>
                      </div>
                    : <div className="grid grid-center h-[260px] bg-[#D9D9D9] rounded-lg"
                    hidden={vtMethod=="album" ? false : true}>
                        <BiPhotoAlbum className="m-auto w-[48px] h-[48px] text-white cursor-pointer" 
                            onClick={openAlbum} />
                    </div>}
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={getImageFromAlbum}
                        hidden={vtMethod=="album" ? false : true}
                    />
                  </>
                }
                
                {authImage ?
                <>
                    <div className="flex justify-center mt-2 px-auto">
                        <button className={`flex-none mx-auto font-medium text-[#d9d9d9] px-3 py-1 
                            hover:font-semibold hover:text-[#bdbdbd] hover:border-[#bdbdbd]`}
                        onClick={()=>{cancelAuth()}}>
                            인증 취소하기
                        </button>
                    </div>
                </>
                :<div className="flex mt-2">
                    <button className={`flex-1 ${vtMethod == "camera" ? "font-semibold text-[#bdbdbd] " : "font-medium text-[#d9d9d9] "}`}
                     onClick={()=>{setVtMethod("camera")}}>
                        카메라
                    </button>
                    <button className={`flex-1 ${vtMethod == "album" ? "font-semibold text-[#bdbdbd] " : "font-medium text-[#d9d9d9] "}`}
                     onClick={()=>{setVtMethod("album")}}>
                        앨범
                    </button>
                </div>}

                {authImage ? <div className="mt-2 text-sm text-red-500 text-center">※ 인증을 성공적으로 완료하였습니다.</div>
                : <div className="mt-2 text-sm text-red-500 text-left">※ 인증을 진행해주십시오.</div>}
            </>}

            {/* Method Explanation */}
            <div className="flex-none mt-3 mb-1 rounded-md px-1 pt-[2px] text-center text-[11px] w-[60px] h-[20px] text-white bg-[#6E6053] cursor-default">
                인증방법
            </div>
            <div className="px-1 pb-3 text-[#6E6053] text-[14px]">
                {vertifyMethod}
            </div>

            {closeModal ? <VertifyMethodModal onClose={setCloseModal} setVtMethod={setVtMethod} /> : ""}
        </div>
    )
};