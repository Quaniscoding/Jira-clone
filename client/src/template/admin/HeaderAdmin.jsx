import React, { useEffect, useState } from "react";
import { ProjectOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Avatar,
  Tooltip,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Slider,
  InputNumber,
  notification,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { DATA_USER, USER_LOGIN } from "../../utils/constant";
import { getLocal } from "../../utils/config";
import "./css/adminMainCss.css";
import { useDispatch, useSelector } from "react-redux";
import { callGetListProject } from "../../redux/reducers/projects/getAllProject";
import { callGetListTaskType } from "./../../redux/reducers/task/getAllTaskType";
import { callGetListPriority } from "./../../redux/reducers/task/getAllPriority";
import { callGetListStatus } from "./../../redux/reducers/task/getAllStatus";
import { callGetListProjectDetail } from "./../../redux/reducers/projects/getProjectDetail";
import { callCreateTask } from "./../../redux/reducers/task/createTask";
import { callGetListUserByProjectId } from "./../../redux/reducers/users/getUserByProjectId";
export default function HeaderAdmin() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [inputValue, setInputValue] = useState(1);
  const [inputValueHourSpent, setInputValueHourSpent] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  const onChangeHourSpent = (newValue) => {
    setInputValueHourSpent(newValue);
  };
  const openNotificationSuccess = () => {
    notification["success"]({
      message: "Notification !",
      description: "Create task successfully !",
      placement: "top",
    });
  };
  const err = () => {
    notification["error"]({
      message: "Notification !",
      description: "Task name already exists !",
    });
  };
  const errUnthor = () => {
    notification["error"]({
      message: "Notification !",
      description: "User is unthorization!",
    });
  };
  const navigate = useNavigate();
  let [reset, setReset] = useState(0);
  let [getProjectId, setProjectId] = useState(0);
  let dataUser = getLocal(DATA_USER);
  const listAllProject = useSelector(
    (state) => state.getAllProject.listProject
  );
  const listStatus = useSelector((state) => state.getAllStatus.listStatus);
  const listPriority = useSelector(
    (state) => state.getAllPriority.listPriority
  );
  const listTaskType = useSelector(
    (state) => state.getAllTaskType.listTaskType
  );
  const listUserByProjectId = useSelector(
    (state) => state.getListUserByProjectId.listUser
  );
  console.log(listUserByProjectId);
  let dispatch = useDispatch();
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  const params = useParams();
  const onSubmit = async (values) => {
    let timeTrackingRemaining = inputValue - inputValueHourSpent;
    let originalEstimate = inputValue;
    let projectId = getProjectId;
    let {
      taskName,
      timeTrackingSpent,
      description,
      statusId,
      typeId,
      priorityId,
      listUserAsign,
    } = values;

    try {
      const res = await dispatch(
        callCreateTask({
          timeTrackingRemaining,
          originalEstimate,
          projectId,
          taskName,
          timeTrackingSpent,
          description,
          statusId,
          typeId,
          priorityId,
          listUserAsign,
        })
      );
      if (res.isCreate == true) {
        onClose();
        openNotificationSuccess();
      }
      if (res.isUnthor == true) {
        errUnthor();
      }
      if (res.isCreate == false) {
        err();
      }
    } catch (error) {
      err();
    }
  };
  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(callGetListProject(""));
      dispatch(callGetListTaskType);
      dispatch(callGetListPriority);
      dispatch(callGetListStatus);
      dispatch(callGetListProjectDetail);
      dispatch(callGetListUserByProjectId(params.id));
    }, 1000);
  }, [0]);
  return (
    <>
      <header
        className="h-14 bg-white shadow px-4 fixed left-0 top-0 w-full"
        style={{ zIndex: 1030 }}
      >
        <div className="h-full flex justify-between items-center">
          <div className="d-flex justify-content-between align-items-center">
            <nav
              className="navbar navbar-expand-lg navbar-light bg-white"
              style={{ marginBottom: 0 }}
            >
              <div className="container-fluid">
                <div></div>
                <ProjectOutlined style={{ fontSize: "35px", color: "blue" }} />
                <button
                  className="navbar-brand"
                  onClick={() => {
                    navigate("/projectmanagement");
                  }}
                >
                  <a>Jira</a>
                </button>
                <button
                  className="navbar-toggler "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
              </div>
            </nav>
            <div
              className="d-flex align-items-center"
              style={{ width: "315px" }}
            >
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <Tooltip placement="bottom">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle active"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "blue" }}
                      >
                        Project
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <div>
                          <a
                            className="dropdown-item p-3"
                            onClick={() => {
                              navigate("/projectmanagement");
                            }}
                          >
                            <button>View all project</button>
                          </a>
                          <a
                            className="dropdown-item p-3"
                            onClick={() => {
                              navigate("/createProject");
                            }}
                          >
                            <button>Create Project</button>
                          </a>
                        </div>
                      </ul>
                    </li>
                  </Tooltip>
                </ul>
              </div>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <Tooltip placement="bottom">
                    <li className="nav-item dropdown pl-2">
                      <a
                        className="nav-link dropdown-toggle"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "blue" }}
                      >
                        <span>Users</span>
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <div>
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              navigate("/user");
                            }}
                          >
                            <button>View all users</button>
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              navigate("user/createUser");
                            }}
                          >
                            <button>Create users</button>
                          </a>
                        </div>
                      </ul>
                    </li>
                  </Tooltip>
                </ul>
              </div>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <Tooltip placement="bottom">
                    <li className="nav-item">
                      <a className="nav-link" style={{ color: "blue" }}>
                        <button onClick={showDrawer}>Create Task</button>
                        <Drawer
                          closable={false}
                          zIndex={1050}
                          title="Create task"
                          width={720}
                          onClose={onClose}
                          open={open}
                          bodyStyle={{
                            paddingBottom: 80,
                          }}
                        >
                          <Form
                            layout="vertical"
                            onFinish={onSubmit}
                            initialValues={true}
                          >
                            <Form.Item label="Project" required>
                              <Select
                                initialValues={listAllProject[0]?.projectName}
                                placeholder="Project"
                                defaultValue={listAllProject[0]?.projectName}
                              >
                                {listAllProject.map((item, index) => {
                                  return (
                                    <Select.Option key={index}>
                                      <button
                                        onClick={() => {
                                          setProjectId(item.id);
                                          dispatch(
                                            callGetListUserByProjectId(item.id)
                                          );
                                        }}
                                      >
                                        {item.projectName}
                                      </button>
                                    </Select.Option>
                                  );
                                })}
                              </Select>
                              <span className="font-bold font-monospace">
                                * You can only create tasks of your own
                                projects!
                              </span>
                            </Form.Item>
                            <Form.Item
                              name="taskName"
                              label="Task Name"
                              required
                            >
                              <Input placeholder="Task Name" />
                            </Form.Item>
                            <Form.Item name="statusId" label="Status" required>
                              <Select placeholder="Status">
                                {listStatus.map((item, index) => {
                                  return (
                                    <Select.Option
                                      key={index}
                                      value={item.statusId}
                                    >
                                      {item.statusName}
                                    </Select.Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item
                                  name="priorityId"
                                  label="Priority"
                                  required
                                >
                                  <Select placeholder="Priority">
                                    {listPriority.map((item, index) => {
                                      return (
                                        <Select.Option
                                          key={index}
                                          value={item.priorityId}
                                        >
                                          {item.priority}
                                        </Select.Option>
                                      );
                                    })}
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="typeId" label="Task Type">
                                  <Select placeholder="Task Type">
                                    {listTaskType.map((item, index) => {
                                      return (
                                        <Select.Option
                                          key={index}
                                          value={item.id}
                                        >
                                          {item.taskType}
                                        </Select.Option>
                                      );
                                    })}
                                  </Select>
                                </Form.Item>
                              </Col>
                            </Row>
                            <Form.Item
                              name="listUserAsign"
                              label="Assigners"
                              required
                            >
                              <Select
                                placeholder="Assigners"
                                mode="multiple"
                                style={{
                                  width: "100%",
                                }}
                              >
                                {listUserByProjectId.map((item, index) => {
                                  return (
                                    <Select.Option key={index} value={item._id}>
                                      <div className="demo-option-label-item">
                                        <span role="img">
                                          <button>{item.username}</button>
                                        </span>
                                      </div>
                                    </Select.Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                            <Row gutter={16} className="d-flex">
                              <Col span={12}>
                                <Form.Item
                                  label={"Total Estimated Hours"}
                                  required
                                >
                                  <InputNumber
                                    type="number"
                                    defaultValue={0}
                                    value={inputValue}
                                    onChange={onChange}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  name={"timeTrackingSpent"}
                                  label={"Hours spent"}
                                  required
                                >
                                  <InputNumber
                                    type="number"
                                    defaultValue={0}
                                    value={inputValueHourSpent}
                                    onChange={onChangeHourSpent}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Form.Item>
                              <Slider
                                marks={0}
                                min={0}
                                max={inputValue}
                                style={{ color: "black" }}
                                defaultValue={10}
                                value={inputValueHourSpent}
                              />
                              <div className="flex justify-between">
                                <div className="text-left  font-bold">
                                  {inputValueHourSpent} hour(s) spent
                                </div>
                                <div className="text-left  font-bold">
                                  {inputValue - inputValueHourSpent} hour(s)
                                  remaining
                                </div>
                              </div>
                            </Form.Item>
                            <Form.Item
                              label="Desciption"
                              name="description"
                              required
                            >
                              <Input.TextArea rows={6} />
                            </Form.Item>
                            <Form.Item>
                              <Space>
                                <Button onClick={onClose}>Cancel</Button>
                                <Button htmlType="submit" type="primary">
                                  Submit
                                </Button>
                              </Space>
                            </Form.Item>
                          </Form>
                        </Drawer>
                      </a>
                    </li>
                  </Tooltip>
                </ul>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <Tooltip title={<span className="text-black">Setting</span>}>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link "
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "black", fontSize: "18px" }}
                    >
                      <SettingOutlined />
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <div>
                        <div
                          className="dropdown-item p-3"
                          style={{ hover: "background-color:#fff" }}
                        >
                          <span className="text-gray-400 ">
                            ATLASSIAN ADMIN
                          </span>
                        </div>
                        <a className="dropdown-item">
                          <button
                            onClick={() => {
                              navigate(`user`);
                            }}
                          >
                            User management
                          </button>
                        </a>
                      </div>
                      <div>
                        <div
                          className="dropdown-item p-3"
                          style={{ hover: "background-color:#fff" }}
                        >
                          <span className="text-gray-400 ">JIRA SETTING</span>
                        </div>
                        <a className="dropdown-item">
                          <button
                            onClick={() => {
                              navigate(`/projectmanagement`);
                            }}
                          >
                            Project
                          </button>
                        </a>
                      </div>
                    </ul>
                  </li>
                </Tooltip>
              </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <Tooltip
                  placement="bottomRight"
                  title={
                    <span className="text-black">Your profile and setting</span>
                  }
                >
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link "
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "black", fontSize: "18px" }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Avatar
                        style={{
                          color: "#f56a00",
                          background: "none",
                          fontSize: "18px",
                          width: 24,
                          height: 24,
                        }}
                        src={dataUser?.avatar}
                      ></Avatar>
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div>
                        <div
                          className="dropdown-item p-3"
                          style={{ hover: "background-color:#fff" }}
                        >
                          <span className="text-gray-400 ">Admin</span>
                        </div>
                        <a className="dropdown-item">
                          <button
                            onClick={() => {
                              navigate(`profile`);
                            }}
                          >
                            Profiles
                          </button>
                        </a>
                      </div>
                      <div>
                        <a className="dropdown-item">
                          <button
                            onClick={() => {
                              setReset(reset + 1);
                              localStorage.removeItem(USER_LOGIN);
                              navigate(`/login`);
                            }}
                          >
                            Log out
                          </button>
                        </a>
                      </div>
                    </div>
                  </li>
                </Tooltip>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="header-placehoder" style={{ height: "7.5rem" }}></div>
    </>
  );
}
