import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//import Home from './pages/Home';
//import Alarm from './pages/Alarm';
import ChallengeAdd from './pages/ChallengeAdd';
import Add from './pages/Add';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<Home />} />*/}
        {/*<Route path="/" element={<Alarm />} />*/}
        <Route path="/" element={<ChallengeAdd />} />
        <Route path="/challenge/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;