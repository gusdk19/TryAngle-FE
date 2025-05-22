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
import ChallengeAdd from "./pages/ChallengeAdd";
import Add from "./pages/Add";
import InviteCode from "./pages/InviteCode";
import Ranking from "./pages/Ranking";
import ProtectedRoute from "./components/ProtectRoute";

function App() {
  return (
    <BrowserRouter>                                   
      <Routes>     
        <Route path="/" element={<Home />} />  
        <Route path='/mypage' element={<MyPage />} /> 
        <Route path='/login' element={<Login />} />    
        <Route path='/signup' element={<SignUp />} />
        <Route path='/findEmail' element={<FindEmail />} />            
        <Route path='/findPW' element={<FindPW />} />            
        <Route path='/mychallenge' element={<MyChallenge />} />
        <Route path='/challenge/:id' element={<ChallengeDetail />} />
        <Route path="/rank" element={<Ranking />} />
        <Route path="/alarm" element={<ProtectedRoute><Alarm /></ProtectedRoute>} />                                      
        <Route path='/friend' element={<ProtectedRoute><Friend /></ProtectedRoute>} />      
        <Route path='/finance' element={<ProtectedRoute><Finance /></ProtectedRoute>} />
        <Route path='/challenge/:id/recommend' element={<ProtectedRoute><Recommend /></ProtectedRoute>} />                                                                
        <Route path="/add-challenge/public" element={<ProtectedRoute><ChallengeAdd /></ProtectedRoute>} />
        <Route path="/add-challenge/content" element={<ProtectedRoute><Add /></ProtectedRoute>} />
        <Route path="/add-challenge/invite" element={<ProtectedRoute><InviteCode /></ProtectedRoute>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;

