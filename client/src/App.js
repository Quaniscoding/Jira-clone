import './App.css';
import '../src/assets/css/main.css';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import Login from './template/auth/Login';
import SignUp from './template/auth/SignUp';
import User from './template/user/User/User.jsx';
import Projectmanagement from './pages/index/projectManagement/Projectmanagement';
import CreateProject from './pages/index/createProject/CreateProject';
import LayoutAdmin from './template/admin/LayoutAdmin';
import EditProject from './pages/index/editProject/EditProject';
import NotFound from './pages/notFound/NotFound';
import ProjectDetail from './pages/index/projectDetail/ProjectDetail';
import Profile from './template/profile/Profile';
import CreateUser from './template/user/User/CreateUser';
import EditUser from './template/user/User/EditUser';
function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<LayoutAdmin />}>
          <Route path='projectmanagement' element={<Projectmanagement />} />
          <Route path='createProject' element={<CreateProject />} />
          <Route path='projectmanagement/edit/:id' element={<EditProject />} />
          <Route path='user' element={<User />}></Route>
          <Route path='user/createUser' element={<CreateUser />}></Route>
          <Route path='user/editUser/:id' element={<EditUser />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='projectDetail/:id' element={<ProjectDetail />}></Route>
        </Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
      </Routes>
    </HistoryRouter>

  );
}

export default App;
