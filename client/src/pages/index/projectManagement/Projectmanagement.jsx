import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { callGetListProject } from "../../../redux/reducers/projects/getAllProject";
import { getLocal, getStringLocal } from "../../../utils/config";
import { USER_LOGIN, DATA_USER } from "../../../utils/constant";
import { callGetListUser } from "../../../redux/reducers/users/getUser";
import { callGetProjectCategory } from "../../../redux/reducers/projects/getProjectCategory";
import { callGetListProjectDetail } from "./../../../redux/reducers/projects/getProjectDetail";
import useRoute from "../../../hooks/useRoute";
import "./css/project.css";
import ProjectTable from "./ProjectTable";
import ProjectSearch from "./ProjectSearch";

export default function ProjectManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listProject = useSelector((state) => state.getAllProject.listProject);
  const listUser = useSelector((state) => state.getUser.listUser);
  const {
    searchParams: [searchParams, setSearchParams],
  } = useRoute();
  const keyWord = searchParams.get("keyWord") || "";
  const isLogin = getStringLocal(USER_LOGIN);
  const dataUserLogin = getLocal(DATA_USER);
  let timeout = null;

  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(callGetListProject(keyWord));
      dispatch(callGetListUser());
      dispatch(callGetListProjectDetail());
      dispatch(callGetProjectCategory());
    }, 1000);
    return () => clearTimeout(timeout);
  }, [keyWord, dispatch]);

  return (
    <main className="containerProject container py-6">
      {isLogin ? (
        <>
          <div className="d-flex content-start">
            <h3>Project</h3>
          </div>
          <ProjectSearch setSearchParams={setSearchParams} keyWord={keyWord} />
          <br />
          <ProjectTable
            listProject={listProject}
            listUser={listUser}
            navigate={navigate}
            dataUserLogin={dataUserLogin}
            dispatch={dispatch}
            keyWord={keyWord}
          />
        </>
      ) : (
        <Result
          className="col-12"
          title="You are not logged in !"
          extra={
            <>
              <span>Click button to log in !</span>
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  navigate(`/user/login`);
                }}
              >
                Login{" "}
              </Button>
            </>
          }
        />
      )}
    </main>
  );
}
