import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MyPage from './pages/mypage';
import Friend from './pages/friend';
import Finance from './pages/finance';
import MyChallenge from './pages/myChallenge';
import ChallengeDetail from './pages/challengeDetail';

function App() {
  return (
    <BrowserRouter>                                   
      <Routes>                                            
        <Route path='/mypage' element={<MyPage />} />   
        <Route path='/friend' element={<Friend />} />      
        <Route path='/finance' element={<Finance />} />
        <Route path='/mychallenge' element={<MyChallenge />} />
        <Route path='/challenge/:id' element={<ChallengeDetail />} />                                
      </Routes>
  </BrowserRouter>
  );
}

export default App;
