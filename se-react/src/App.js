import './App.css';
import Dashboard from './component/Dashboard/dashboard'
import LoginView from './component/authenticate/login'
import RegisterView from './component/authenticate/register'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {

if(true)
  return <LoginView/>
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
