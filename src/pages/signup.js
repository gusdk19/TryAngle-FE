import React, { useEffect, useState } from "react";
import "../styles/user/user.css";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SUStepOne from "../components/User/SUStepOne";
import SUStepTwo from "../components/User/SUStepTwo";
import SUFooter from "../components/User/SUFooter";
import SUStepThree from "../components/User/SUStepThree";
import SUStepFour from "../components/User/SUStepFour";
import CheckSignUpModal from "../components/User/CheckSignUpModal";

export default function SignUp(){

    const page = "signup";

    const location = useLocation();

    const {prevPage} = location.state || {};

    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cn, setCN] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");
    const [checkPW, setCheckPW] = useState("");

    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState([]);

    const [emailIsExisted, setEmailExisted] = useState(false);
    const [nicknameIsExisted, setNicknameIsExisted] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [success, setSuccess] = useState(false);

    return(
        <div>
            <Header title={"회원가입"} />
            
            {step == 1
              ? <SUStepOne email={email} setEmail={setEmail} errors={errors} setErrors={setErrors} setEmailExisted={setEmailExisted}/>
              : step == 2 ? <SUStepTwo pw={pw} setPW={setPW} checkPW={checkPW} setCheckPW={setCheckPW} errors={errors} setErrors={setErrors}/>
              : step == 3 ? <SUStepThree name={name} setName={setName} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} 
                             cn={cn} setCN={setCN} errors={errors} setErrors={setErrors} />
              : <SUStepFour nickname={nickname} setNickname={setNickname} errors={errors} setErrors={setErrors} setNicknameIsExisted={setNicknameIsExisted}/>}
            

            <SUFooter step={step} setStep={setStep} email={email} pw={pw} checkPW={checkPW} name={name} nickname={nickname} phoneNumber={phoneNumber} cn={cn} errors={errors}
                     emailIsExisted={emailIsExisted} nicknameIsExisted={nicknameIsExisted} setErrors={setErrors} setEmail={setEmail} setNickname={setNickname} setSuccess={setSuccess} setOpenModal={setOpenModal}/>
        
            {openModal ? <CheckSignUpModal onClose={setOpenModal} isSuccess={success} prevPage={prevPage}/> : ""}
        </div>
    )
}