import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './routes/Homepage';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Doctors from './routes/Doctors';
import Appointments from './routes/Appointments';
import DoctorDetail from './routes/DoctorDetails';
import PrivateRoute from './routes/PrivateRoutes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route
          path="/appointments"
          element={<PrivateRoute element={<Appointments />} />}
        />
        <Route
          path="/doctor/:id"
          element={<PrivateRoute element={<DoctorDetail />} />}
        />
        <Route
          path="/doctors"
          element={<PrivateRoute element={<Doctors />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
