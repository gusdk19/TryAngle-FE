import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MyPage from './pages/mypage';

function App() {
  return (
    <BrowserRouter>                                   
      <Routes>                                            
        <Route path='/mypage' element={<MyPage />} />       
      </Routes>
  </BrowserRouter>
  );
}

export default App;
