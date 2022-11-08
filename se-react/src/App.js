import './App.css';
import MainContent from './component/main/main';
import SideBar from './component/sidebar/sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {


  return (
    <div>
      <SideBar />
      <MainContent>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainContent />} />
          </Routes>
        </BrowserRouter>
      </MainContent>
    </div>
  );
}

export default App;
