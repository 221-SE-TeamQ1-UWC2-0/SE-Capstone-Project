import './App.css';
import Dashboard from './component/Dashboard/dashboard';
import Janitor from './component/staff-info/janitor-info';
import LoginView from './component/authenticate/login';
import RegisterView from './component/authenticate/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';
import { AuthProvider } from './context/AuthContext';
import Task from './component/app/task';

function App() {
  // if (true) return <Task />
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/register' element={<RegisterView />} />
          <Route path='/login' element={<LoginView />} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/janitor-info' element={<Janitor />} />
            <Route path='/task' element={<Task />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
