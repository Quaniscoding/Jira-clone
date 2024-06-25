import "./App.css";
import "../src/assets/css/main.css";
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
  useLocation,
} from "react-router-dom";
import Login from "./template/auth/Login";
import SignUp from "./template/auth/SignUp";
import User from "./template/user/User/User.jsx";
import CreateProject from "./components/CreateProject/CreateProject.jsx";
import LayoutAdmin from "./template/admin/LayoutAdmin";
import NotFound from "./pages/notFound/NotFound";
import Profile from "./template/profile/Profile";
import CreateUser from "./template/user/User/CreateUser";
import EditUser from "./template/user/User/EditUser";
import ProjectManagement from "./components/ProjectManagement/Projectmanagement";
import EditProject from "./components/EditProject/EditProject";
import ProjectDetail from "./components/ProjectDetail/ProjectDetail";
import { history } from "./utils/history";
import LoadingBarHandler from "./utils/LoadingBarHandler";
import CustomLoadingScreen from "./utils/CustomLoadingScreen";
import { LoadingProvider, useLoading } from "./utils/LoadingContext";
import { useEffect } from "react";

function App() {
  return (
    <LoadingProvider>
      <HistoryRouter history={history}>
        <AppContent />
      </HistoryRouter>
    </LoadingProvider>
  );
}

const AppContent = () => {
  const { setLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Simulate loading time on route change
    };

    handleRouteChange();
  }, [location, setLoading]);

  return (
    <>
      <LoadingBarHandler />
      <CustomLoadingScreen>
        <Routes>
          <Route path="/" element={<LayoutAdmin />}>
            <Route path="/projectmanagement" element={<ProjectManagement />} />
            <Route path="/createProject" element={<CreateProject />} />
            <Route
              path="/projectmanagement/edit/:id"
              element={<EditProject />}
            />
            <Route path="/user" element={<User />} />
            <Route path="/user/createUser" element={<CreateUser />} />
            <Route path="/user/editUser/:id" element={<EditUser />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projectDetail/:id" element={<ProjectDetail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CustomLoadingScreen>
    </>
  );
};

export default App;
