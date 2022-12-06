import './App.css';
import Dashboard from './component/Dashboard/dashboard';
import Janitor from './component/staff-info/janitor-info';
import Collector from './component/staff-info/collector-info';
import Edit from './component/BO-Edit/Edit';
import LoginView from './component/authenticate/login';
import RegisterView from './component/authenticate/register';
import Mapbox from './component/map/map';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';
import { AuthProvider } from './context/AuthContext';
import Task from './component/staff-info/addtask';

function App() {
  // if (true) return <Task />
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/register' element={<RegisterView />} />
          <Route path='/login' element={<LoginView />} />
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/janitor-info' element={<Janitor />} />
            <Route path='/task' element={<Task />} />
            <Route path='/collector-info' element={<Collector />} />
            <Route path='/edit' element={<Edit />} />
            <Route path='/map' element={<Mapbox />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
