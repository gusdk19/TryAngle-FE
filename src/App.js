import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MyPage from './pages/mypage';
import Friend from './pages/friend';
import Finance from './pages/finance';

function App() {
  return (
    <BrowserRouter>                                   
      <Routes>                                            
        <Route path='/mypage' element={<MyPage />} />   
        <Route path='/friend' element={<Friend />} />      
        <Route path='/finance' element={<Finance />} />        
      </Routes>
  </BrowserRouter>
  );
}

export default App;
