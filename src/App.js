import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RequireActive from './components/auth/RequireActive';
import RequireAuth from './components/auth/RequireAuth';
import RequireAdmin from './components/auth/ReuireAdmin';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import AllStudent from './pages/Dashboard/AllStudent';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Dashboard/Profile';
import SearchStudent from './pages/Dashboard/SearchStudent';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import SingleStudent from './pages/SingleStudent/SingleStudent';
import AddAcademicDetails from './pages/StudentDetails/AddAcademicDetails';
import AddDetails from './pages/StudentDetails/AddDetails';
import AddEmploymentDetails from './pages/StudentDetails/AddEmploymentDetails';
import AddOtherDetails from './pages/StudentDetails/AddOtherDetails';
import AddPersonalDetails from './pages/StudentDetails/AddPersonalDetails';
import StudentsByEmployment from './pages/StudentsByEmployment/StudentsByEmployment';

function App() {
  return (
    <div className="container bg-gray-200">
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/student/:slug' element={<SingleStudent />} />
        <Route path='/employee/:slug' element={<StudentsByEmployment />} />
        <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} >
          <Route index element={<Profile/>} />
          <Route path='/dashboard/change-password' element={<ChangePassword/>} />
          <Route path='/dashboard/search/student' element={<RequireActive><SearchStudent/></RequireActive>} />
          <Route path='/dashboard/all-student' element={<RequireAdmin><AllStudent/></RequireAdmin>} />
        </Route>
        {/* update student details */}
        <Route path='/student/details/add' element={<RequireAuth><AddDetails/></RequireAuth>}>
          <Route index element={<AddPersonalDetails/>} />
          <Route path='/student/details/add/employment' element={<AddEmploymentDetails/>} />
          <Route path='/student/details/add/academic' element={<AddAcademicDetails/>} />
          <Route path='/student/details/add/others' element={<AddOtherDetails/>} />
        </Route>
        <Route path='/forgotPasss/:id/reset' element={<ResetPassword/>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer/>
      <ToastContainer/>
    </div>
  );
}

export default App;
