import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MyPage from './pages/mypage';
import Friend from './pages/friend';
import Finance from './pages/finance';
import MyChallenge from './pages/myChallenge';
import ChallengeDetail from './pages/challengeDetail';
import Recommend from './pages/recommend';
import Login from './pages/login';
import SignUp from './pages/signup';
import FindEmail from './pages/findEmail';
import FindPW from './pages/findPW';
import Home from './pages/Home';
import Alarm from './pages/Alarm';
import ChallengeAdd from './pages/ChallengeAdd';
import Add from './pages/Add';
import InviteCode from './pages/InviteCode';

function App() {
  return (
    <BrowserRouter>                                   
      <Routes>     
        <Route path="/" element={<Home />} />  
        <Route path="/alarm" element={<Alarm />} />                                      
        <Route path='/mypage' element={<MyPage />} /> 
        <Route path='/login' element={<Login />} />    
        <Route path='/signup' element={<SignUp />} />
        <Route path='/findEmail' element={<FindEmail />} />            
        <Route path='/findPW' element={<FindPW />} />            
        <Route path='/friend' element={<Friend />} />      
        <Route path='/finance' element={<Finance />} />
        <Route path='/mychallenge' element={<MyChallenge />} />
        <Route path='/challenge/:id' element={<ChallengeDetail />} />
        <Route path='/challenge/:id/recommend' element={<Recommend />} />                                                                
        <Route path="/challenge/add/public" element={<ChallengeAdd />} />
        <Route path="/challenge/add/content" element={<Add />} />
        <Route path="/add-challenge/invite" element={<InviteCode />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;

