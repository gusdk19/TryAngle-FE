import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TotalFinanceBox from "../components/Finance/TotalFinanceBox";
import FinanceRecord from "../components/Finance/FinanceRecord";
import WithdrawalModal from "../components/Finance/WithdrawalModal";

import books from "../assets/images/finance/books.png";
import water from "../assets/images/finance/water.png";
import dumbell from "../assets/images/finance/dumbell.png";

import "../styles/finance/finance.css";
import { useLocation } from "react-router-dom";


export default function Finance() {

    const page = "finance";

    const location = useLocation();

    const { deposit, reward } = location.state || {};

    const financeStatus = [
        {
            "challenge_id" : 1, 
            "challenge_name" : "하루에 물 한 잔잔", 
            "challenge_thumbnail": water,
            "deposit" : 100000,
            "deposit_date": "2025-03-01",
            "status" : "진행중", 
            "return" : 0,
            "deposit_return_date": null,
        },
        {
            "challenge_id" : 2, 
            "challenge_name" : "하루 30분 운동", 
            "challenge_thumbnail": dumbell,
            "deposit" : 100000,
            "deposit_date": "2025-03-05 10:43:15",
            "status" : "정산중", 
            "return" : 0,
            "deposit_return_date": null,
        },
        {
            "challenge_id" : 3, 
            "challenge_name" : "30분 독서", 
            "challenge_thumbnail": books,
            "deposit" : 100000,
            "deposit_date": "2025-03-13 19:43:15",
            "status" : "정산완료", 
            "return" : 120000,
            "deposit_return_date": "2025-03-27",
        },
    ];

    const [withdrawal, setWithdrawal] = useState(0);

    const totalDeposit = financeStatus.reduce((sum, item) => sum + item.deposit, 0);
    const totalReturn = financeStatus.reduce((sum, item) => sum + item.return, 0) - withdrawal;
    
    // Whether to display withdrawal modal window
    const [wdModal, setWdModal] = useState(false);

    return(
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white w-[393px] h-[852px] relative">
                
                {/* Header */}
                <Header title={"챌린지 비용 및 보상"} totalReturn={totalReturn} />
                <hr className="m-0"/>
                
            
                {/* Main Content */}
                {/* 전체 챌린지 비용(예치금) 및 보상 박스 */}
                <TotalFinanceBox totalDeposit={totalDeposit} totalReturn={totalReturn} withdrawal={withdrawal} setWithdrawal={setWithdrawal} onClose={setWdModal} />
                
                {/* 챌린지별 예치금 및 보상 기록 */}
                <FinanceRecord financeStatus={financeStatus} />
        
                {/* Footer Navigation */}
                <Footer page={page}/>
            
            </div>

            {wdModal && <WithdrawalModal onClose={setWdModal} setWithdrawal={setWithdrawal} totalReturn={totalReturn}/>}
        </div>
    );

}