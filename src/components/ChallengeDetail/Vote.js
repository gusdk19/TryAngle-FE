import React, {useEffect, useState} from "react";
import "../../styles/challengeDetail/vote.css";
import report_icon from "../../assets/images/challenge/report-icon.png";
import heart_icon from "../../assets/images/challenge/heart.png";
import cheerup_icon from "../../assets/images/challenge/cheer-up.png";
import clap_icon from "../../assets/images/challenge/clap.png";
import doubt_icon from "../../assets/images/challenge/doubt.png";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import VoteFooter from "./VoteFooter";
import ReportModal from "./ReportModal";

export default function Vote({challengeID}){

    const [onReport, setOnReport] = useState(false);

    const [onVote, setOnVote] = useState("");

    const [voteStatusList, setVoteStatusList] = useState([
        {
          "nickname": "다연츄",
          "voter_id" : 1,
          "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
          "voted": false,
          "auth_image": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
        },
        {
          "nickname": "혀나츄",
          "voter_id" : 2,
          "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
          "voted": true,
          "auth_image": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
        },
        {
          "nickname": "혜원츄",
          "voter_id" : 3,
          "profileImage": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
          "voted": false,
          "auth_image": null,
        }
    ]);

    const [onVoteUser, setOnVoteUser] = useState("");

    useEffect(() => {
        const filtered = voteStatusList.filter(voteStatus => voteStatus.voter_id === onVote);
      
        if (filtered.length === 1) {
          setOnVoteUser(filtered[0]); // 요소 하나일 경우 객체로
        } else {
          setOnVoteUser(filtered);    // 0개 또는 여러 개일 경우 배열로
        }
      
        console.log("onVote, onVoteUser", onVote, filtered);
    }, [onVote]);
    
    const sortedVoteStatusList = voteStatusList.sort((a, b) => {
        // auth_image가 null이면 우선순위 2 (맨 마지막)
        const aPriority = a.auth_image === null ? 2 : (a.voted ? 1 : 0);
        const bPriority = b.auth_image === null ? 2 : (b.voted ? 1 : 0);
        return aPriority - bPriority;
    });

    const [emotionModal, setEmotionModal] = useState(0);
    const [emotionChoice, setEmotionChoice] = useState("");


    return(
        <div className="px-5">
            {onVote == "" ? 
            <div>
                <div className="text-[#6E6053] font-semibold">
                    멤버
                </div>
                <div className="flex flex-col gap-3 mt-3 text-[#6E6053] 
                        overflow-scroll main h-[635px]">
                    {sortedVoteStatusList.map((voteStatus, id)=>{
                        return(
                            <div className="flex flex-row gap-3 justify-between h-[45px] py-auto object-contain" id={id}>
                                <div className="flex-1 flex flex-row gap-4">
                                    <img className="max-w-[45px] max-h-[45px] border-[1.5px] border-[#D9D9D9] border-solid rounded-full" 
                                        src={voteStatus.profileImage} width="45px" height="45px"
                                        alt={`user-${id} profileImage`} />
                                    <div className="my-auto text-[15px] font-semibold">{voteStatus.nickname}</div>
                                </div>
                                <button className={`w-[120px] h-[30px] my-auto rounded-md text-[#4A483F] flex-none text-[12px] text-center font-semibold
                                    ${voteStatus.voted || !(voteStatus.auth_image) ? "bg-[#D9D9D9] cursor-default" : "bg-[#FFC421] cursor-pointer"}`}
                                    onClick={()=>{
                                        if(!(voteStatus.voted || !(voteStatus.auth_image))){
                                            setOnVote(voteStatus.voter_id);
                                        }
                                    }}>
                                    {voteStatus.voted ? "투표완료" : voteStatus.auth_image ? "투표하기" : "인증 미완료"}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
            : <div className="">
                <div className="flex flex-row gap-3 justify-between h-[45px] py-auto object-contain" >
                    <div className="flex-1 flex flex-row gap-4">
                        <img className="max-w-[45px] max-h-[45px] border-[1.5px] border-[#D9D9D9] border-solid rounded-full" 
                            src={onVoteUser.profileImage} width="45px" height="45px"
                            alt={`user-${onVoteUser.voter_id}} profileImage`} />
                        <div className="my-auto text-[17px] font-semibold">{onVoteUser.nickname}</div>
                    </div>
                    <img className="my-auto cursor-pointer" src={report_icon} alt="report-icon" width="36px"
                      onClick={()=>{setOnReport(true)}}/>
                </div>

                <div className="rounded-md mt-3 overflow-scroll main h-[615px]">  
                    <div className="relative">
                        <img className="max-w-[360px] rounded-md" src={onVoteUser.auth_image} alt={`user-${onVoteUser.voter_id}} auth-image`}
                            width="360px" height="235px"/>
                        {emotionModal ? 
                        <div className="absolute bottom-[13px] right-[8px] h-[60px] px-5
                            bg-[#fdf8edea] rounded-3xl flex flex-row gap-4">
                            <img className="w-[40px] h-[40px] max-w-[40px] max-h-[40px] my-auto cursor-pointer" src={heart_icon} alt="heart-icon"
                              title="좋아요"
                              onClick={()=>{setEmotionChoice("heart"); setEmotionModal(0)}}/>
                            <img className="w-[40px] h-[40px] max-w-[40px] max-h-[40px] my-auto cursor-pointer" src={cheerup_icon} alt="cheerup-icon"
                              title="힘내세요"
                              onClick={()=>{setEmotionChoice("cheerup"); setEmotionModal(0)}}/>
                            <img className="w-[40px] h-[40px] max-w-[40px] max-h-[40px] my-auto cursor-pointer" src={clap_icon} alt="cheerup-icon"
                              title="최고에요"
                              onClick={()=>{setEmotionChoice("clap"); setEmotionModal(0)}}/>
                            <img className="w-[40px] h-[40px] max-w-[40px] max-h-[40px] my-auto cursor-pointer" src={doubt_icon} alt="cheerup-icon"
                              title="의심스러워요"
                              onClick={()=>{setEmotionChoice("doubt"); setEmotionModal(0)}}/>
                        </div>
                        : emotionChoice=="" ? <FaRegHeart className="absolute bottom-[13px] right-[8px] w-[40px] h-[40px] cursor-pointer" 
                            color="#FDE0CE" onClick={()=>{setEmotionModal(1);}}/>
                          : <img className="absolute bottom-[13px] right-[8px] w-[60px] h-[60px] cursor-pointer"
                              src={emotionChoice == "heart" ? heart_icon
                                : emotionChoice == "cheerup" ? cheerup_icon
                                : emotionChoice == "clap" ? clap_icon
                                : emotionChoice == "doubt" ? doubt_icon 
                                : ""}

                              alt={emotionChoice == "heart" ? "heart-icon"
                                : emotionChoice == "cheerup" ? "cheerup-icon"
                                : emotionChoice == "clap" ? "clap-icon"
                                : emotionChoice == "doubt" ? "doubt-icon" 
                                : ""}

                              title={emotionChoice == "heart" ? "좋아요"
                                : emotionChoice == "cheerup" ? "힘내세요"
                                : emotionChoice == "clap" ? "최고에요"
                                : emotionChoice == "doubt" ? "의심스러워요" 
                                : ""}

                              onClick={()=>{setEmotionModal(1);}}
                            />}
                    </div>
                </div>
            </div>}
            
            {onVote ? <VoteFooter onVoteUserID={onVoteUser.voter_id} setVoteStatusList={setVoteStatusList} setOnVote={setOnVote}/> : ""}
        
            {onReport ? <ReportModal onClose={setOnReport} onVoteUser={onVoteUser}/> : ""}
        </div>
    )
}