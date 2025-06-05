import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyChallNav from "../components/MyChallenge/MyChallNav";
import OnProgressChall from "../components/MyChallenge/OnProgressChall";
import FinishChall from "../components/MyChallenge/FinishChall";

import "../styles/myChallenge/myChallenge.css";

import books from "../assets/images/finance/books.png";
import water from "../assets/images/finance/water.png";
import dumbell from "../assets/images/finance/dumbell.png";
import CreateChall from "../components/MyChallenge/CreateChall";
import BeforeLoginMC from "../components/MyChallenge/BeforeLoginMC";
import useAuthStore from "../components/User/UseAuthStore";

export default function MyChallenge(){

    const page = "myChallenge";

    const [tab, setTab] = useState("onProgress") // tab(3) - onProgress(참여중), finish(참여완료), create(개설)

    const { isLoggedIn, login, logout } = useAuthStore();

    const [challengeList, setChallengeList] = useState([
        {
            "challenge_id" : 0,
            "challenge_name": "챌린지 0",
            "status": 1,
            "auth_status": 0,
            "deposit_status": 0,
            "challenge_thumbnail": books,
            "challenge_shrotintro": "기상스터디",
            "challenge_descripton": "챌린지 0 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-04-10",
            "end_date": "2025-05-01",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 10,
            "now_people":9,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":1,
            "participation_success":0,
        },
        {
            "challenge_id" : 1,
            "challenge_name": "챌린지 1",
            "status": 1,
            "auth_status": 1,
            "deposit_status": 1,
            "challenge_thumbnail": water,
            "challenge_shrotintro": "하루에 물 한잔",
            "challenge_descripton": "챌린지 1 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-03-21",
            "end_date": "2025-04-30",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 10,
            "now_people":10,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":0,
            "participation_success":1,
        },
        {
            "challenge_id" : 2,
            "challenge_name": "챌린지 2",
            "status": 3,
            "auth_status": 0,
            "deposit_status": 0,
            "challenge_thumbnail": dumbell,
            "challenge_shrotintro": "하루 30분 운동",
            "challenge_descripton": "챌린지 2 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-04-01",
            "end_date": "2025-04-19",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 10,
            "now_people":7,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":1,
            "participation_success":0,
        },
        {
            "challenge_id" : 3,
            "challenge_name": "챌린지 3",
            "status": 3,
            "auth_status": 0,
            "deposit_status": 0,
            "challenge_thumbnail": books,
            "challenge_shrotintro": "30분 독서",
            "challenge_descripton": "챌린지 3 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-02-01",
            "end_date": "2025-02-21",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 13,
            "now_people":13,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":1,
            "participation_success":1,
        },
        {
            "challenge_id" : 4,
            "challenge_name": "챌린지 4",
            "status": 0,
            "auth_status": 0,
            "deposit_status": 1,
            "challenge_thumbnail": books,
            "challenge_shrotintro": "기상스터디",
            "challenge_descripton": "챌린지 4 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-04-30",
            "end_date": "2025-05-21",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 12,
            "now_people":1,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":1,
            "participation_success":0,
        },
        {
            "challenge_id" : 5,
            "challenge_name": "챌린지 5",
            "status": 3,
            "auth_status": 0,
            "deposit_status": 1,
            "challenge_thumbnail": books,
            "challenge_shrotintro": "영어 공부 1시간",
            "challenge_descripton": "챌린지 5 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-04-01",
            "end_date": "2025-04-07",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 10,
            "now_people":10,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":0,
            "participation_success":1,
        },
        {
            "challenge_id" : 6,
            "challenge_name": "챌린지 6",
            "status": 3,
            "auth_status": 0,
            "deposit_status": 1,
            "challenge_thumbnail": water,
            "challenge_shrotintro": "식물에 물 주기",
            "challenge_descripton": "챌린지 6 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-04-01",
            "end_date": "2025-04-18",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 10,
            "now_people":10,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":1,
            "participation_success":0,
        },
        {
            "challenge_id" : 7,
            "challenge_name": "챌린지 7",
            "status": 0,
            "auth_status": 0,
            "deposit_status": 1,
            "challenge_thumbnail": books,
            "challenge_shrotintro": "수학 공부 1시간",
            "challenge_descripton": "챌린지 7 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-05-11",
            "end_date": "2025-05-17",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 10,
            "now_people":10,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":0,
            "participation_success":0,
        },
        {
            "challenge_id" : 8,
            "challenge_name": "챌린지 8",
            "status": 1,
            "auth_status": 1,
            "deposit_status": 1,
            "challenge_thumbnail": dumbell,
            "challenge_shrotintro": "크로스핏",
            "challenge_descripton": "챌린지 8 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-04-12",
            "end_date": "2025-06-20",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 10,
            "now_people":10,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":1,
            "participation_success":0,
        },
        {
            "challenge_id" : 9,
            "challenge_name": "챌린지 9",
            "status": 0,
            "auth_status": 0,
            "deposit_status": 1,
            "challenge_thumbnail": water,
            "challenge_shrotintro": "비타민 먹기",
            "challenge_descripton": "챌린지 5 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-05-01",
            "end_date": "2025-05-07",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 10,
            "now_people":10,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":0,
            "participation_success":0,
        },
        {
            "challenge_id" : 10,
            "challenge_name": "챌린지 10",
            "status": 0,
            "auth_status": 0,
            "deposit_status": 1,
            "challenge_thumbnail": books,
            "challenge_shrotintro": "국어 공부 1시간",
            "challenge_descripton": "챌린지 10 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-07-01",
            "end_date": "2025-08-07",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 10,
            "now_people":10,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":1,
            "participation_success":0,
        },
        {
            "challenge_id" : 11,
            "challenge_name": "챌린지 11",
            "status": 0,
            "auth_status": 0,
            "deposit_status": 1,
            "challenge_thumbnail": dumbell,
            "challenge_shrotintro": "천국의 계단",
            "challenge_descripton": "챌린지 5 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-06-01",
            "end_date": "2025-06-07",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 10,
            "now_people":8,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":1,
            "participation_success":0,
        },
        {
            "challenge_id" : 12,
            "challenge_name": "챌린지 12",
            "status": 1,
            "auth_status": 0,
            "deposit_status": 1,
            "challenge_thumbnail": books,
            "challenge_shrotintro": "독서 스터디",
            "challenge_descripton": "챌린지 12 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-03-20",
            "end_date": "2025-05-20",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 10,
            "now_people":1,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":1,
            "participation_success":0,
        },
    ])

    useEffect(()=>{
        const getChallengeList = async ()=>{
            try {
                const res = await fetch('http://localhost:8080/challenge/my', {
                    method: 'GET',
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user_token}`
                    },
                });
    
                const data = await res.json();
                console.log("user Data check", data.isSuccess, data.result);
    
                if(data.isSuccess){
                    setChallengeList(data.result);
                } else{
                    console.log(`⚠ ${data.message}`);
                }
            } catch (error) {
                console.error('마이페이지 조회 오류:', error);
            }
            }
    }, []);

    // 모든 챌린지를 start_date 기준으로 역순 정렬
    const sortedChallengeList = [...challengeList].sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date)
    );

    // console.log("sortedChallengeList",sortedChallengeList);
    
    const [dueChallengeList, setDueChallengeList] = useState([]);
    const [onProgressChallengeList, setOnProgressChallengeList] = useState([]);
    const [finishedChallengeList, setFinishedChallengeList] = useState([]);
    const [leaderChallengeList, setLeaderChallengeList] = useState([]);

    useEffect(()=>{
        const now = new Date();

        const dueList = [];
        const onProgressList = [];
        const finishedList = [];
        const leaderList = [];

        sortedChallengeList.forEach((challenge) => {
            const startDate = new Date(challenge.start_date);
            const endDate = new Date(challenge.end_date);

            if (now < startDate) {
                dueList.push(challenge);
            } else if (now >= startDate && now <= endDate) {
                onProgressList.push(challenge);
            } else {
                finishedList.push(challenge);
            }

            if (challenge.leader) {
                leaderList.push(challenge);
            }
        });

        const onProgressSortedList = onProgressList.sort((a, b) => {
            // auth_status가(0-인증미완료, 1-인증완료) 0인 경우가 앞에 오도록록
            return a.auth_status - b.auth_status;
        });

        setDueChallengeList(dueList);
        setOnProgressChallengeList(onProgressSortedList);
        setFinishedChallengeList(finishedList);
        setLeaderChallengeList(leaderList);
    }, [challengeList])
    

    return(
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white w-[393px] h-[852px] relative">

            {/* Header */}
            <Header title={"마이챌린지"}/>

            {isLoggedIn ?    
            <>                
                {/* Navbar */}
                <MyChallNav tab={tab} setTab={setTab} />
                
                {/* Main Content */}
                {tab === "onProgress" && 
                    <OnProgressChall dueChallengeList={dueChallengeList} onProgressChallengeList={onProgressChallengeList} 
                        setChallengeList={setChallengeList} />}
                {tab === "finish" &&
                    <FinishChall finishedChallengeList={finishedChallengeList}/> }
                {tab === "create" &&
                    <CreateChall leaderChallengeList={leaderChallengeList} setChallengeList={setChallengeList}/>}
            </>
            :<BeforeLoginMC />}

            {/* Footer Navigation */}
            <Footer page={page}/>
            
            </div>

        </div>
    )
}