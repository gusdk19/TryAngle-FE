import React, { useEffect, useState } from "react";
import "../styles/user/user.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SUStepOne from "../components/User/SUStepOne";
import SUStepTwo from "../components/User/SUStepTwo";
import SUFooter from "../components/User/SUFooter";
import SUStepThree from "../components/User/SUStepThree";
import SUStepFour from "../components/User/SUStepFour";

export default function SignUp(){

    const page = "signup";

    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cn, setCN] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");
    const [checkPW, setCheckPW] = useState("");

    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState([]);

    const emailIsExisted = true;
    const nicknameIsExisted = false;

    return(
        <div>
            <Header title={"회원가입"} />
            
            {step == 1
              ? <SUStepOne email={email} setEmail={setEmail} errors={errors} setErrors={setErrors}/>
              : step == 2 ? <SUStepTwo pw={pw} setPW={setPW} checkPW={checkPW} setCheckPW={setCheckPW} errors={errors} setErrors={setErrors}/>
              : step == 3 ? <SUStepThree name={name} setName={setName} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} 
                             cn={cn} setCN={setCN} errors={errors} setErrors={setErrors} />
              : <SUStepFour nickname={nickname} setNickname={setNickname} errors={errors} setErrors={setErrors}/>}
            

            <SUFooter step={step} setStep={setStep} email={email} pw={pw} checkPW={checkPW} name={name} nickname={nickname} phoneNumber={phoneNumber} cn={cn} errors={errors}
                     emailIsExisted={emailIsExisted} nicknameIsExisted={nicknameIsExisted} setErrors={setErrors} setEmail={setEmail} setNickname={setNickname}/>
        </div>
    )
}