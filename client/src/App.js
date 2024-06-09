import './App.css';
import '../src/assets/css/main.css';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './template/auth/Login';
import SignUp from './template/auth/SignUp';
import User from './template/user/User/User.jsx';
import CreateProject from './components/CreateProject/CreateProject.jsx';
import LayoutAdmin from './template/admin/LayoutAdmin';
import NotFound from './pages/notFound/NotFound';
import Profile from './template/profile/Profile';
import CreateUser from './template/user/User/CreateUser';
import EditUser from './template/user/User/EditUser';
import ProjectManagement from './components/ProjectManagement/Projectmanagement';
import EditProject from './components/EditProject/EditProject';
import ProjectDetail from './components/ProjectDetail/ProjectDetail';
import { history } from './utils/history';

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setLoadingState = () => {
      setLoading(true);
      // Simulating an API call or any async operation
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Set loading to false after 2 seconds
    };

    setLoadingState();

    // Clear loading state on route change
    return history.listen(() => {
      setLoadingState();
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <HistoryRouter history={history}>
          <Routes>
            <Route path='/' element={<LayoutAdmin />}>
              <Route path='/projectmanagement' element={<ProjectManagement />} />
              <Route path='/createProject' element={<CreateProject />} />
              <Route path='/projectmanagement/edit/:id' element={<EditProject />} />
              <Route path='/user' element={<User />} />
              <Route path='/user/createUser' element={<CreateUser />} />
              <Route path='/user/editUser/:id' element={<EditUser />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/projectDetail/:id' element={<ProjectDetail />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </HistoryRouter>
      )}
    </>
  );
}

export default App;
