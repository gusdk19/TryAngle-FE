import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//import Home from './pages/Home';
//import Alarm from './pages/Alarm';
import ChallengeAdd from './pages/ChallengeAdd';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<Home />} />*/}
        {/*<Route path="/" element={<Alarm />} />*/}
        <Route path="/" element={<ChallengeAdd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;