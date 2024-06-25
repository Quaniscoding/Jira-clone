import React, { useState, useCallback } from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import CreateTask from "../CreateTask/CreateTask";
import { debounce } from "lodash";
import { callGetListProject } from "../../redux/reducers/projects/getAllProject";
import { useDispatch } from "react-redux";

export default function ProjectSearch({
  setSearchParams,
  keyWord,
  listProject,
  dataUserLogin,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const dispatch = useDispatch();

  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchKeyWord({ keyWord: value });
      dispatch(callGetListProject(value));
    }, 500),
    [dispatch]
  );

  const handleSearchChange = (event) => {
    const { value } = event.target;
    debouncedSearch(value);
  };

  const handleCreateProjectClick = () => {
    navigate("/createProject");
  };

  const handleCreateTaskClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="input-group w-25">
          <Input
            type="text"
            placeholder="Search"
            defaultValue={searchKeyWord}
            onChange={handleSearchChange}
          />
        </div>
        <div className="d-flex align-items-center justify-content-between gap-4">
          <Button type="primary" onClick={handleCreateProjectClick}>
            Create Project
          </Button>
          <Button type="primary" onClick={handleCreateTaskClick}>
            Create Task
          </Button>
        </div>
      </div>
      <CreateTask
        onClose={onClose}
        open={open}
        listProject={listProject}
        dataUserLogin={dataUserLogin}
      />
    </>
  );
}
