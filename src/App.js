import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './routes/Homepage';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Doctors from './routes/Doctors';
import Appointments from './routes/Appointments';
import DoctorDetail from './routes/DoctorDetails';
import NewAppointments from './routes/NewAppointments';
import PrivateRoute from './routes/PrivateRoutes';
import AddDoctorForm from './routes/AddDoctor';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/new_doctor" element={<AddDoctorForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route
          path="/appointments"
          element={<PrivateRoute element={<Appointments />} />}
        />
        <Route
          path="/new-appointment"
          element={<PrivateRoute element={<NewAppointments />} />}
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
