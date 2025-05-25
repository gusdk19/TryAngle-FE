import React, {useState, useRef} from "react";
import Webcam from 'react-webcam';
import { HiOutlineCamera } from "react-icons/hi";
import { FaRegCircle } from "react-icons/fa";
import { BiPhotoAlbum } from "react-icons/bi";
import VertifyMethodModal from "./VertifyMethodModal";

export default function Vertify({vertifyMethod}){

    const [vtMethod, setVtMethod] = useState("");
    const [closeModal, setCloseModal] = useState(0);

    // Vertify : camera
    const webcamRef = useRef(null);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
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
          // preview or upload logic here
        }
    };

    return(
        <div className="mt-3">

            {vtMethod == "" ?
            <div className="grid grid-center h-[260px] bg-[#D9D9D9] rounded-lg">
                <HiOutlineCamera className="m-auto w-[48px] h-[48px] text-white cursor-pointer" 
                onClick={()=>{setCloseModal(1)}}/>
            </div>
            :
            <>
                {vtMethod == "camera" ? 
                  <>
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
                    <div className="grid grid-center h-[260px] bg-[#D9D9D9] rounded-lg"
                    hidden={vtMethod=="album" ? false : true}>
                        <BiPhotoAlbum className="m-auto w-[48px] h-[48px] text-white cursor-pointer" 
                        onClick={openAlbum} />
                    </div>
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
                
                <div className="flex mt-1">
                    <button className={`flex-1 ${vtMethod == "camera" ? "font-semibold text-[#bdbdbd] " : "font-medium text-[#d9d9d9] "}`}
                     onClick={()=>{setVtMethod("camera")}}>
                        카메라
                    </button>
                    <button className={`flex-1 ${vtMethod == "album" ? "font-semibold text-[#bdbdbd] " : "font-medium text-[#d9d9d9] "}`}
                     onClick={()=>{setVtMethod("album")}}>
                        앨범
                    </button>
                </div>
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