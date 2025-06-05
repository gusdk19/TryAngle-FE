import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/challengeDetail/challengeDetail.css";

import DetailNav from "../components/ChallengeDetail/DetailNav";
import Banner from "../components/ChallengeDetail/Banner";

import Vertify from "../components/ChallengeDetail/Vertify";
import Info from "../components/ChallengeDetail/Info";
import Vote from "../components/ChallengeDetail/Vote";
import ChallengeFooter from "../components/ChallengeDetail/ChallengeFooter";
import RequestLogin from "../components/ChallengeDetail/RequestLogin";
import useAuthStore from "../components/User/UseAuthStore.js";

export default function ChallengeDetail() {

  const location = useLocation();

  const { tab, challenge, updatedStatus } = location.state || {};
  // console.log("challenge",challenge);

  const { isLoggedIn, user_token, user_name } = useAuthStore();

  const { id } = useParams(); // URL에 있는 id 값(challenge_id) 가져오기
  // console.log("challengeID",id);

  const [loading, setLoading] = useState(challenge && !isLoggedIn ? false : true);
  const [challengeData, setChallengeData] = useState(challenge ? challenge : {});
  const [userChallengeData, setUserChallengeData] = useState({"status": updatedStatus || 0});
  // console.log("loading", loading, "challengeData", challengeData);

  const dummyChallengeData = {
    "challenge_id" : 1,
    "challenge_name": "챌린지 1",
    "challenge_thumbnail": "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp",
    "challenge_shrotintro": "기상스터디",
    "challenge_descripton": "챌린지 1 입니다",
    "category": "STUDY",
    "challenge_public": true,
    "start_date": "2025-06-08",
    "end_date": "2025-06-21",
    "auth_time_start": "06:00",
    "auth_time_end": "22:00",
    "max_people": 10,
    "now_people" : 8,
    "min_deposit": 1000,
    "return_type": 1,
    "auth_frequency": "참여빈도",
    "leader_nickname" : "test",
    "vertify_method" : "인증방법 소개글 + 참가 멤버 인증 투표 안내",
    "description": "챌린지 내용 + 예치금 관련 공지",
    "participant_list" : [3],
  };

  const dummyUserChallengeData = {
    "status": updatedStatus || 0, // 0: ready, 1: progress, 2: completed
    "participaton_success": true,
    "deposit_amount": 10000,
    "deposit_status": 2, // 0: refunded, 1: donated, 2: not_refunded_yet
    "created_at": "2025-04-22 19:43:15",
    "auth_status": true,
    "auth_vote_status": false
  };

  useEffect(()=>{
    const getChallengeData = async()=>{
      try {
        const res = await fetch(`http://localhost:8080/challenge/${id}`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        console.log("challenge Data check", id, data.isSuccess, data.result);

        if(data.isSuccess){
            setChallengeData(data.result);
        } else{
            console.log(`⚠ ${data.message}`);
            setChallengeData(dummyChallengeData);
        }

        if(!isLoggedIn){
          setLoading(false);
        }
      } catch (error) {
          console.error('개별 챌린지 조회 오류:', error);
      }
    }

    const getUserChallengeData = async()=>{
      try {
        const res = await fetch(`http://localhost:8080/challenge/my/${id}`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            },
        });

        const data = await res.json();
        console.log("challenge User Data check", id, data.isSuccess, data.result);

          if(data.isSuccess){
              // challengeFeeRefund에서 post만 제대로 되면 data.result 저장하는 것만으로 충분
              setUserChallengeData(updatedStatus ? {...data.result, status : updatedStatus} : data.result);
          } else{
              console.log(`⚠ ${data.message}`);
              setUserChallengeData(dummyUserChallengeData);
          }
          setLoading(false);
      } catch (error) {
          console.error('개별 챌린지에 관한 유저 참여 정보 조회 오류:', error);
      }
    }
    

    if(challenge == undefined){
      getChallengeData();
    }

    if(isLoggedIn){
      getUserChallengeData();
    }
  }, [])

  const page = "challengeDetail";

  const navigate = useNavigate();

  const [navTab, setNavTab] = useState(tab ? tab : "vertify");
  const [requestLogin, setRequestLogin] = useState(false);

  const now = new Date();
  const startDate = new Date(challengeData.start_date);
  const endDate = new Date(challengeData.end_date);
  // 날짜 차이 계산 (밀리초 단위)
  const timeDiff = startDate.getTime() - now.getTime();

  // 밀리초 → 일수 (1일 = 1000 * 60 * 60 * 24)
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // 진행 상태
  const status = now < startDate ? 0 : now > endDate ? 2 : 1; // 0 : 예정, 1 : 진행중, 2 : 진행 완료료 

  const editChallenge = ()=>{
    navigate(`/challenge/${id}/edit`, {challenge: challengeData});
  }

  if(loading){
      return(
      <div className="bg-white flex flex-row justify-center w-full">
          <div className="bg-white w-[393px] h-[852px] relative">
              <div className="w-full h-full grid items-center">
                  <div className="spinner"></div>
              </div>
          </div>
      </div>)
  }

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        {/* Header */}
        <Header title={challengeData.challenge_name} page={page}/>
        <hr className="m-0"/>
        {isLoggedIn ? <DetailNav tab={navTab} setTab={setNavTab}/> 
        : <div className="my-3"></div>}

        {/* Main Content */}
        {navTab == "vote" ? 
          <Vote challengeID={id} />
        : <>
          {/* Banner */}
          <Banner image={challengeData.challenge_thumbnail} />
          
          {/* Title */}
          <div className="flex justify-between">
            <div className="flex-1 flex px-5 justify-between">
              <div className="flex-none flex gap-4">
                <div className="flex-none text-[20px] text-[#4A483F] font-bold">
                  {challengeData.challenge_name}
                </div>
                <button className="flex-none my-auto mt-[6px] rounded-md px-1 text-[11px] w-[60px] h-[20px] text-white bg-[#6E6053] cursor-default">
                  {status == 0 ? "예정" : status == 1 ? "진행중" : "진행완료"}
                </button>
                <div className="flex-none">
                  {status == 0 && dayDiff > 0 && <div className='cd-due-date'>D-{dayDiff}</div>}
                </div>
              </div>              
              {status == 0 && user_name == challengeData.leader_nickname && challengeData.now_people == 1 &&
                <button className="flex-none rounded-md text-[13px] font-semibold px-4 mt-[3px] my-[2.75px] py-[0.5px] border-solid border-[#6E6053] border-[2px]" 
                  onClick={editChallenge}>
                  수정
                </button>
              }
            </div>
          </div>


          {/* Main Component */}
          <div className="h-[470px] px-5 overflow-scroll main">
            {navTab == "vertify" ? 
              <Vertify vertifyMethod = {challengeData.vertify_method ? challengeData.vertify_method : "인증방법 소개글"} /> :
            navTab == "info" ?
              <Info challengeData={challengeData}/> :
              <></>
            }
          </div>
        </>}
      
        {/* Footer Navigation */}
        {navTab == "info" ?
        <ChallengeFooter chall_status={status} status={userChallengeData.status} challengeID={id} setChallengeData={setChallengeData} participant_list={challengeData.participant_list} isLoggedIn={isLoggedIn} setRequestLogin={setRequestLogin}/> : ""}
      </div>

      {!isLoggedIn && requestLogin ? <RequestLogin onClose={setRequestLogin} purpose="참가"/> : "" }

    </div>
  );
}
