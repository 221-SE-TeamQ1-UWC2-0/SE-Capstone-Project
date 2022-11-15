import './App.css';
import Dashboard from './component/Dashboard/dashboard'
import Janitor from './component/staff-info/janitor-info'
import LoginView from './component/authenticate/login'
import RegisterView from './component/authenticate/register'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {

if(false)
  return <LoginView/>
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<RegisterView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/janitor-info" element={<Janitor />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
