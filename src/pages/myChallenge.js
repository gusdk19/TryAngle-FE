import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyChallNav from "../components/MyChallenge/MyChallNav";
import OnProgressChall from "../components/MyChallenge/OnProgressChall";

import "../styles/myChallenge/myChallenge.css";

import books from "../assets/images/finance/books.png";
import water from "../assets/images/finance/water.png";
import dumbell from "../assets/images/finance/dumbell.png";

export default function MyChallenge(){

    const page = "myChallenge";

    const [tab, setTab] = useState("onProgress") // tab(3) - onProgress(참여중), finish(참여완료), create(개설)

    const [challengeList, setChallengeList] = useState([
        {
            "challenge_id" : 0,
            "challenge_name": "챌린지 0",
            "status": 0,
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
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":true,
        },
        {
            "challenge_id" : 1,
            "challenge_name": "챌린지 1",
            "status": 1,
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
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":false,
        },
        {
            "challenge_id" : 2,
            "challenge_name": "챌린지 2",
            "status": 0,
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
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":true,
        },
        {
            "challenge_id" : 3,
            "challenge_name": "챌린지 3",
            "status": 0,
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
            "max_people": 10,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":false,
        },
        {
            "challenge_id" : 4,
            "challenge_name": "챌린지 4",
            "status": 1,
            "deposit_status": 1,
            "challenge_thumbnail": books,
            "challenge_shrotintro": "기상스터디",
            "challenge_descripton": "챌린지 4 입니다",
            "category": 1,
            "challenge_public": true,
            "start_date": "2025-05-01",
            "end_date": "2025-05-21",
            "auth_time_start": "06:00",
            "auth_time_end": "22:00",
            "max_people": 10,
            "min_deposit": 1000,
            "return_type": 1,
            "auth_frequency": "참여빈도",
            "leader":false,

        },
    ])

    const [dueChallengeList, setDueChallengeList] = useState([]);
    const [onProgressChallengeList, setOnProgressChallengeList] = useState([]);
    const [finishedChallengeList, setFinishedChallengeList] = useState([]);

    useEffect(()=>{
        const now = new Date();

        setDueChallengeList([]);
        setOnProgressChallengeList([]);
        setFinishedChallengeList([]);

        challengeList.forEach((challenge) => {
            const startDate = new Date(challenge.start_date);
            const endDate = new Date(challenge.end_date);
    
            if (now < startDate) {
                // 예정된
                setDueChallengeList((prev)=>([...prev, challenge]));
            } else if (now >= startDate && now <= endDate) {
                // 진행 중
                setOnProgressChallengeList((prev)=>([...prev, challenge]));
            } else {
                setFinishedChallengeList((prev)=>([...prev, challenge]));
            }
        });
    }, [challengeList])
    

    




    return(
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white w-[393px] h-[852px] relative">
            {/* Header */}
            <Header title={"마이챌린지"}/>
            
            {/* Navbar */}
            <MyChallNav tab={tab} setTab={setTab} />
            
            {/* Main Content */}
            {tab === "onProgress" && 
                <OnProgressChall dueChallengeList={dueChallengeList} onProgressChallengeList={onProgressChallengeList} 
                    setChallengeList={setChallengeList}/>}
            {tab === "finish" && <></>}
            {tab === "create" && <></>}
    
            {/* Footer Navigation */}
            <Footer page={page}/>
            
            </div>
        </div>
    )
}