import React, { useEffect, useState } from "react";
import "./css/cssProject.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callGetListProjectDetail } from "../../../redux/reducers/projects/getProjectDetail";
import {
  Avatar,
  Divider,
  Input,
  Modal,
  Skeleton,
  List,
  Button,
  notification,
  Form,
  Select,
  Collapse,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  CheckOutlined,
  UserOutlined,
  ExclamationCircleFilled,
  BugOutlined,
} from "@ant-design/icons";
import { callGetListUser } from "../../../redux/reducers/users/getUser";
import InfiniteScroll from "react-infinite-scroll-component";
import useRoute from "../../../hooks/useRoute";
import { callAsignUserTask } from "./../../../redux/reducers/task/asignUserTask";
import { callGetListTaskDetail } from "../../../redux/reducers/task/getTaskDetail";
import { callDeleteTask } from "../../../redux/reducers/task/deleteTask";
import { callAsignUserFromProject } from "../../../redux/reducers/users/asignUserFromProject";
import { callDeleteUserFromProject } from "./../../../redux/reducers/users/deleteUserFromProject";
import { callGetListTaskType } from "../../../redux/reducers/task/getAllTaskType";
import { callGetListPriority } from "./../../../redux/reducers/task/getAllPriority";
import { callGetListStatus } from "../../../redux/reducers/task/getAllStatus";
import { getLocal, getStringLocal } from "../../../utils/config";
import { DATA_USER } from "./../../../utils/constant";
import { useFormik } from "formik";
import { callInsertComments } from "../../../redux/reducers/comments/insertComment";
import { callGetListComment } from "./../../../redux/reducers/comments/getComments";
import { callDeleteComments } from "../../../redux/reducers/comments/deleteComments";
import { callEditComments } from "../../../redux/reducers/comments/editComments";
import { callEditTask } from "../../../redux/reducers/task/editTask";
const { confirm } = Modal;
const { Panel } = Collapse;
export default function ProjectDetail() {
  const [modal1Open, setModal1Open] = useState(false);
  const params = useParams();
  const notificationSuccess = (data) => {
    notification["success"]({
      message: "Notification !",
      description: data,
    });
  };
  const notificationFail = (data) => {
    notification["error"]({
      message: "Notification !",
      description: data,
    });
  };
  const openNotificationDeleteTask = () => {
    notification["success"]({
      message: "Notification !",
      description: "Delete task successfully !",
    });
  };
  const err = () => {
    notification["error"]({
      message: "Notification !",
      description: "Delete task fail !",
    });
  };
  const editCmtSuccess = () => {
    notification["success"]({
      message: "Notification !",
      description: "Edit comment successfully !",
    });
  };
  const postCmtSuccess = () => {
    notification["success"]({
      message: "Notification !",
      description: "Post comment successfully !",
    });
  };
  const editTask = () => {
    notification["success"]({
      message: "Notification !",
      description: "Edit task successfully !",
    });
  };
  const deleteCmt = () => {
    notification["success"]({
      message: "Notification !",
      description: "Delete comment successfully !",
    });
  };
  const errEditCmt = () => {
    notification["error"]({
      message: "Notification !",
      description: "Edit comment fail !",
    });
  };
  const errEditTask = () => {
    notification["error"]({
      message: "Notification !",
      description: "Edit task fail !",
    });
  };
  const errUnthor = () => {
    notification["error"]({
      message: "Notification !",
      description: "User is unthorization!",
    });
  };
  const openNotificationAsignUserFromTask = () => {
    notification["success"]({
      message: "Notification !",
      description: "Asign user successfully !",
    });
  };
  const errUser = () => {
    notification["error"]({
      message: "Notification !",
      description: "User already exists !",
    });
  };
  const dataUserComment = getLocal(DATA_USER);
  const listProjectDetail = useSelector(
    (state) => state.getProjectDetail.listProjectDetail
  );
  const listComments = useSelector((state) => state.getComments.listComments);
  const listUser = useSelector((state) => state.getUser.listUser);
  const listTaskDetail = useSelector(
    (state) => state.getTaskDetail.listTaskDetail
  );
  const listStatus = useSelector((state) => state.getAllStatus.listStatus);
  const listPriority = useSelector(
    (state) => state.getAllPriority.listPriority
  );
  const listTaskType = useSelector(
    (state) => state.getAllTaskType.listTaskType
  );
  let dispatch = useDispatch();
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  const {
    searchParams: [searchParams, setSearchParams],
  } = useRoute();
  const keyWord = searchParams.has("keyWord")
    ? searchParams.get("keyWord")
    : "";
  const [taskId, setTaskId] = useState("");
  const [contentComment, setContentComment] = useState("");
  const [contentCommentEdit, setContentCommentEdit] = useState("");
  const [idCommentEdit, setIdCommentEdit] = useState("");
  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(callGetListUser(keyWord));
      dispatch(callGetListProjectDetail(params.id));
      dispatch(callGetListTaskType);
      dispatch(callGetListPriority);
      dispatch(callGetListStatus);
    }, 1000);
  }, [keyWord]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      listUserAsign: listTaskDetail.assigness?.id,
      taskId: listTaskDetail.taskId,
      taskName: listTaskDetail.taskName,
      description: listTaskDetail.description,
      statusId: listTaskDetail.statusId,
      originalEstimate: listTaskDetail.originalEstimate,
      timeTrackingSpent: listTaskDetail.timeTrackingSpent,
      timeTrackingRemaining: listTaskDetail.timeTrackingRemaining,
      projectId: listTaskDetail.projectId,
      typeId: listTaskDetail.typeId,
      priorityId: listTaskDetail.priorityId,
    },
    onSubmit: async (values) => {
      try {
        const res = await dispatch(callEditTask(values));
        if (res.isUpdate == true) {
          editTask();
        } else {
          errEditTask();
        }
        await dispatch(callGetListProjectDetail(params.id));
      } catch (error) {}
    },
  });
  const handleChangeStatusId = (values) => {
    formik.setFieldValue("statusId", values);
  };
  const handleChangeTaskId = (values) => {
    formik.setFieldValue("typeId", values);
  };
  const handleChangeListUserAsign = (values) => {
    formik.setFieldValue("listUserAsign", values);
  };
  const handleChangePriorityId = (values) => {
    formik.setFieldValue("priorityId", values);
  };
  const title = `Add members to project ${listProjectDetail[0]?.projectName}`;
  const dataTask = () => {
    const listTask = listProjectDetail[0]?.listTask;
    return listTask?.map((item, index) => {
      let bg = "";
      let bgColor = item.statusId;
      if (bgColor == 1) {
        bg = "bg-gray-400";
      }
      if (bgColor == 2) {
        bg = "bg-blue-200";
      }
      if (bgColor == 3) {
        bg = "";
      }
      if (bgColor == 4) {
        bg = "bg-green-200";
      }
      return (
        <div className="col-3 cursor-pointer" key={index}>
          <div className="bg-gray-200 w-full h-full p-2 rounded d-flex flex-column">
            <div>
              <span
                className={`inline-block px-2 py-0.5 mb-1 text-xl font-semibold rounded ${bg} `}
              >
                {item.alias}
              </span>
              <div>
                {item.listTaskDeTail?.map((item, index) => {
                  let taskType = "";
                  if (item.taskTypeDetail.taskType == "bug") {
                    taskType = (
                      <BugOutlined className="bg-red-500 rounded text-white" />
                    );
                  } else {
                    taskType = (
                      <CheckOutlined className="bg-green-500 rounded text-white" />
                    );
                  }
                  return (
                    <div className="border border-danger rounded border-3 mt-2">
                      <div className="mt-2 bg-white p-2 shadow rounded">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-items-center">
                            Task type : {taskType}
                            <b> {item?.taskTypeDetail.taskType}</b>
                          </div>
                          <div className="text-right mt-2">
                            <button
                              className="btn bg-danger text-white font-bold"
                              onClick={() => {
                                confirm({
                                  title: "Do you want delete this task ?",
                                  icon: <ExclamationCircleFilled />,
                                  okText: "Delete",
                                  okType: "danger",
                                  cancelType: "primary",
                                  onOk: async () => {
                                    try {
                                      const res = await dispatch(
                                        callDeleteTask(item.taskId)
                                      );
                                      if (res.isDelete == true) {
                                        notificationSuccess(res.message);
                                      } else {
                                        notificationFail(res.message);
                                      }
                                      dispatch(
                                        callGetListProjectDetail(params.id)
                                      );
                                    } catch (error) {}
                                  },
                                });
                              }}
                            >
                              X
                            </button>
                          </div>
                        </div>
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex={-1}
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog modal-xl"
                            style={{ width: 1000 }}
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="container d-flex justify-content-end ">
                                <button
                                  data-dismiss="modal"
                                  type="button"
                                  className="ant-btn ant-btn-icon-only w-8 h-8 hover:bg-gray-100 hover:text-black focus:text-black border-0 p-0 shadow-none hover:shadow rounded"
                                  onClick={() => {
                                    setTaskId("");
                                  }}
                                >
                                  <span
                                    role="img"
                                    aria-label="close"
                                    className="anticon anticon-close"
                                  >
                                    <svg
                                      viewBox="64 64 896 896"
                                      focusable="false"
                                      data-icon="close"
                                      width="1em"
                                      height="1em"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
                                    </svg>
                                  </span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="row">
                                  <div className="col-6">
                                    <h3>Edit task</h3>
                                  </div>
                                  <div className="col-6">
                                    <h3>Comments</h3>
                                  </div>
                                </div>
                                <div className="d-flex">
                                  <Form
                                    className="col-6"
                                    onSubmitCapture={formik.handleSubmit}
                                    layout="vertical"
                                    initialValues={true}
                                  >
                                    <div className="contaier">
                                      <div className="row row-gap-0">
                                        <div
                                          className=""
                                          style={{
                                            overflowY: "scroll",
                                            maxHeight: "80vh",
                                          }}
                                        >
                                          <Form.Item label={"Task type"}>
                                            <Select
                                              maxLength={200}
                                              name="taskId"
                                              defaultValue={
                                                item.taskTypeDetail.taskType
                                              }
                                              onChange={handleChangeTaskId}
                                            >
                                              {listTaskType.map((item) => {
                                                return (
                                                  <Select.Option
                                                    value={item.id}
                                                  >
                                                    <button>
                                                      {item.taskType}
                                                    </button>
                                                  </Select.Option>
                                                );
                                              })}
                                            </Select>
                                          </Form.Item>
                                          <Form.Item label="Task name">
                                            <Input
                                              name="taskName"
                                              value={formik.values.taskName}
                                              onChange={formik.handleChange}
                                            />
                                          </Form.Item>
                                          <Form.Item label="Description">
                                            <Input.TextArea
                                              name="description"
                                              value={formik.values.description}
                                              onChange={formik.handleChange}
                                              placeholder="Add a description "
                                            />
                                          </Form.Item>
                                          <div className="d-flex flex-column">
                                            <Form.Item
                                              className="col-12"
                                              label="Status"
                                            >
                                              <Select
                                                placeholder="Status"
                                                name="statusId"
                                                defaultValue={listProjectDetail.lstTask.map(
                                                  (item, index) => {
                                                    return item.statusName;
                                                  }
                                                )}
                                                onChange={handleChangeStatusId}
                                              >
                                                {listStatus.map((item) => {
                                                  return (
                                                    <Select.Option
                                                      value={item.statusId}
                                                    >
                                                      {item.statusName}
                                                    </Select.Option>
                                                  );
                                                })}
                                              </Select>
                                            </Form.Item>
                                            <Collapse onChange={(key) => {}}>
                                              <Panel header="Details" key="1">
                                                <Form.Item name="listUserAsign">
                                                  <div className="d-flex align-items-center">
                                                    <div className="col-3">
                                                      <label className=" pr-3">
                                                        <span className="ant-typography">
                                                          <strong>
                                                            Assigners
                                                          </strong>
                                                        </span>
                                                      </label>
                                                    </div>
                                                    <Select
                                                      placeholder="Choose assigners"
                                                      mode="multiple"
                                                      style={{
                                                        width: "80%",
                                                        border: "none",
                                                      }}
                                                      // name="listUserAsign"
                                                      defaultValue={listProjectDetail.members.map(
                                                        (item) => {
                                                          return item.name;
                                                        }
                                                      )}
                                                      onChange={
                                                        handleChangeListUserAsign
                                                      }
                                                    >
                                                      {listProjectDetail?.members?.map(
                                                        (item) => {
                                                          return (
                                                            <Select.Option
                                                              value={
                                                                item.userId
                                                              }
                                                            >
                                                              <div className="demo-option-label-item">
                                                                <span role="img">
                                                                  <button>
                                                                    {item.name}
                                                                  </button>
                                                                </span>
                                                              </div>
                                                            </Select.Option>
                                                          );
                                                        }
                                                      )}
                                                    </Select>
                                                  </div>
                                                </Form.Item>
                                                <Form.Item>
                                                  <div className="d-flex align-items-center">
                                                    <div className="col-3">
                                                      <label className=" pr-3">
                                                        <span className="ant-typography">
                                                          <strong>Level</strong>
                                                        </span>
                                                      </label>
                                                    </div>
                                                    <Select
                                                      name="priorityId"
                                                      placeholder="Priority"
                                                      style={{
                                                        width: "80%",
                                                        border: "none",
                                                      }}
                                                      defaultValue={
                                                        item.priorityTask
                                                          .priority
                                                      }
                                                      onChange={
                                                        handleChangePriorityId
                                                      }
                                                    >
                                                      {listPriority.map(
                                                        (item) => {
                                                          return (
                                                            <Select.Option
                                                              value={
                                                                item.priorityId
                                                              }
                                                            >
                                                              {item.priority}
                                                            </Select.Option>
                                                          );
                                                        }
                                                      )}
                                                    </Select>
                                                  </div>
                                                </Form.Item>
                                                <Form.Item name="originalEstimate">
                                                  <div className="d-flex align-items-center">
                                                    <div className="col-3">
                                                      <label className=" pr-3">
                                                        <span className="ant-typography">
                                                          <strong>
                                                            Estimate
                                                          </strong>
                                                        </span>
                                                      </label>
                                                    </div>
                                                    <Input
                                                      type="number"
                                                      name="originalEstimate"
                                                      value={
                                                        formik.values
                                                          .originalEstimate
                                                      }
                                                      onChange={
                                                        formik.handleChange
                                                      }
                                                    />
                                                  </div>
                                                </Form.Item>
                                              </Panel>
                                            </Collapse>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <Form.Item className="d-flex justify-content-end pt-3">
                                      <Button type="primary" htmlType="submit">
                                        Submit
                                      </Button>
                                    </Form.Item>
                                  </Form>

                                  <div
                                    className="col-6 overflow-y-scroll"
                                    style={{
                                      maxHeight: "80vh",
                                      paddingLeft: "30px",
                                    }}
                                  >
                                    <form
                                      onSubmit={async (event) => {
                                        try {
                                          event.preventDefault();
                                          let res = await dispatch(
                                            callInsertComments({
                                              taskId,
                                              contentComment,
                                            })
                                          );
                                          if (res.isInsert == true) {
                                            postCmtSuccess();
                                          }
                                          await dispatch(
                                            callGetListComment(taskId)
                                          );
                                          setContentComment("");
                                          setTaskId(taskId);
                                        } catch (error) {}
                                      }}
                                      label="Comments"
                                      name="contentComment"
                                    >
                                      <div className="d-flex">
                                        <div className="col-1 pr-3">
                                          <Avatar
                                            src={dataUserComment.avatar}
                                          />
                                        </div>
                                        <input
                                          required
                                          className="border-2 rounded"
                                          id="dataComments"
                                          type="Text"
                                          placeholder="Add a comment"
                                          name="dataComments"
                                          onChange={(event) =>
                                            setContentComment(
                                              event.target.value
                                            )
                                          }
                                          onClick={() => {
                                            setTaskId(taskId);
                                          }}
                                          value={contentComment}
                                        />
                                        <div className="pl-3">
                                          <button
                                            className="btn btn-success"
                                            type="submit"
                                          >
                                            Post
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                    {listComments.map((item) => {
                                      return (
                                        <div className="d-flex pl-2 p-1 shadow-2-soft pt-3">
                                          <div className="col-1">
                                            <Avatar src={item.user.avatar} />
                                          </div>
                                          <div className="col-11 pl-4">
                                            <div
                                              className="ant-comment-content-author"
                                              style={{ fontSize: 10 }}
                                            >
                                              <span className="ant-comment-content-author-name">
                                                <span className="ant-typography">
                                                  <strong>
                                                    {item.user.name}
                                                  </strong>
                                                </span>
                                              </span>
                                            </div>
                                            <div className="ant-comment-content-detail">
                                              <div className="custom-html-parser">
                                                <p>{item.contentComment}</p>
                                              </div>
                                            </div>
                                            <ul className="ant-comment-actions d-flex">
                                              <li>
                                                <div>
                                                  <button
                                                    type="button"
                                                    className="ant-btn ant-btn-link px-0 font-medium hover mr-2"
                                                    data-toggle="modal"
                                                    data-target="#modalEditCmt"
                                                  >
                                                    <span
                                                      className="hover:underline text-gray-500 hover:text-gray-400"
                                                      onClick={() => {
                                                        setIdCommentEdit(
                                                          item.id
                                                        );
                                                        dispatch(
                                                          callGetListComment(
                                                            item.taskId
                                                          )
                                                        );
                                                      }}
                                                    >
                                                      Edit
                                                    </span>
                                                  </button>
                                                  <div
                                                    className="modal fade"
                                                    id="modalEditCmt"
                                                    tabIndex={-1}
                                                    role="dialog"
                                                    aria-labelledby="exampleModalLabel"
                                                    aria-hidden="true"
                                                  >
                                                    <div
                                                      className="modal-dialog"
                                                      role="document"
                                                    >
                                                      <div className="modal-content">
                                                        <div className="modal-body container">
                                                          <input
                                                            className="border rounded"
                                                            type="text"
                                                            name="contentCommentEdit"
                                                            id="contentCommentEdit"
                                                            defaultValue={
                                                              item.contentComment
                                                            }
                                                            onChange={(event) =>
                                                              setContentCommentEdit(
                                                                event.target
                                                                  .value
                                                              )
                                                            }
                                                          />
                                                        </div>
                                                        <div className="d-flex justify-content-end">
                                                          <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            data-dismiss="modal"
                                                          >
                                                            Close
                                                          </button>
                                                          <div className="pl-3">
                                                            <button
                                                              type="button"
                                                              className="btn btn-primary"
                                                              onClick={async () => {
                                                                try {
                                                                  let id =
                                                                    idCommentEdit;
                                                                  let res =
                                                                    await dispatch(
                                                                      callEditComments(
                                                                        {
                                                                          id,
                                                                          contentCommentEdit,
                                                                        }
                                                                      )
                                                                    );
                                                                  if (
                                                                    res.isEdit ==
                                                                    true
                                                                  ) {
                                                                    await editCmtSuccess();
                                                                  } else {
                                                                    errEditCmt();
                                                                  }
                                                                  await dispatch(
                                                                    callGetListComment(
                                                                      item.taskId
                                                                    )
                                                                  );
                                                                } catch (error) {}
                                                              }}
                                                            >
                                                              Save
                                                            </button>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </li>
                                              <li>
                                                <button
                                                  type="button"
                                                  className="ant-btn ant-btn-link px-0 font-medium hover"
                                                >
                                                  <span
                                                    className="hover:underline text-gray-500 hover:text-gray-400"
                                                    onClick={async () => {
                                                      try {
                                                        let res =
                                                          await dispatch(
                                                            callDeleteComments(
                                                              item.id
                                                            )
                                                          );
                                                        if (
                                                          res.isDelete == true
                                                        ) {
                                                          deleteCmt();
                                                        }
                                                        await dispatch(
                                                          callGetListComment(
                                                            item.taskId
                                                          )
                                                        );
                                                      } catch (error) {}
                                                    }}
                                                  >
                                                    Delete
                                                  </span>
                                                </button>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="w-full bg-white rounded py-3 px-2 mt-1"
                          role={"button"}
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={async () => {
                            await setTaskId(item.taskId);
                            await dispatch(callGetListComment(item.taskId));
                            dispatch(callGetListTaskDetail(item.taskId));
                            dispatch(callGetListProjectDetail(params.id));
                          }}
                        >
                          <div className="row row-gap-0">
                            <div className="col-8">
                              <div className="mb-2">
                                Description: {item.description}
                              </div>
                              <span className="text-xl rounded px-1 pb-0.5 text-orange-700 border border-orange-700">
                                Priority: {item.priorityTask.priority}
                              </span>
                            </div>
                            <div className="col-4">
                              <div className="h-full w-full d-flex justify-end items end">
                                {listProjectDetail.members.map((item) => {
                                  return (
                                    <Tooltip
                                      title={item.name}
                                      style={{ color: "black" }}
                                    >
                                      <Avatar size="small" src={item.avatar} />
                                    </Tooltip>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  const data = {
    userId: "",
    projectId: "",
  };
  return (
    <main className="container py-6">
      <div className="ant-breadcrumb mb-4">
        <span>
          <span className="ant-breadcrumb-link">
            <a href="/projectmanagement">Projects/ </a>
          </span>
        </span>
        <span>
          <span className="ant-breadcrumb-link text-black">
            {listProjectDetail[0]?.projectName}
          </span>
        </span>
      </div>
      <div className="row">
        <div className="col-3">
          <h3 className="ant-typography">Board</h3>
        </div>
        <div className="col-6 d-flex align-items-center">
          <h5>Members</h5>
          <span className="d-flex pl-3">
            {listProjectDetail[0]?.members?.map((item, index) => {
              return (
                <Tooltip title={item.name}>
                  <Avatar src={item.avatar} />
                </Tooltip>
              );
            })}
            <button onClick={() => setModal1Open(true)}>
              <Avatar>+</Avatar>
            </button>
            <Modal
              width={900}
              title={title}
              open={modal1Open}
              onOk={() => setModal1Open(false)}
              onCancel={() => setModal1Open(false)}
              footer={null}
            >
              <div className="row">
                <div className="col-6">
                  <div className="d-flex align-items-center justify-content-around pb-3">
                    <span className="ant-typography">Search user</span>
                    <div style={{ maxWidth: 300 }}>
                      {" "}
                      <Input
                        type="text"
                        placeholder="Search"
                        value={keyWord}
                        onChange={(event) => {
                          let { value } = event.target;
                          setSearchParams({ keyWord: value });
                        }}
                      />
                    </div>
                  </div>
                  <h4>Not yet added</h4>
                  <div
                    id="scrollableDiv"
                    style={{
                      height: 400,
                      overflow: "auto",
                      padding: "0 16px",
                      border: "1px solid rgba(140, 140, 140, 0.35)",
                    }}
                  >
                    <InfiniteScroll
                      dataLength={listUser.length}
                      hasMore={listUser.length < 50}
                      loader={
                        <Skeleton
                          avatar
                          paragraph={{
                            rows: 1,
                          }}
                          active
                        />
                      }
                      endMessage={
                        <Divider plain>It is all, nothing more 🤐</Divider>
                      }
                      scrollableTarget="scrollableDiv"
                    >
                      <List
                        dataSource={listUser}
                        renderItem={(item, index) => (
                          <List.Item key={index}>
                            <List.Item.Meta
                              avatar={<Avatar src={item.avatar} />}
                              title={<a>{item.username}</a>}
                              description={`User Id: ${item._id
                                .toString()
                                .slice(-4)}`}
                            />
                            <div>
                              <Button
                                data-placement="top"
                                type="primary"
                                onClick={() => {
                                  data.projectId = params.id;
                                  data.userId = item._id;
                                  confirm({
                                    title: "Do you want to asign this user ?",
                                    icon: <ExclamationCircleFilled />,
                                    okText: "Add",
                                    okType: "primary",
                                    cancelType: "primary",
                                    onOk: async () => {
                                      try {
                                        const res = await dispatch(
                                          callAsignUserFromProject(data)
                                        );
                                        console.log(res);
                                        if (res.message.length > 0) {
                                          notificationSuccess(res.message);
                                        }
                                        if (res.message.length < 0) {
                                          notificationFail(res.message);
                                        }
                                        await dispatch(
                                          callGetListProjectDetail(params.id)
                                        );
                                      } catch (error) {
                                        errUser();
                                      }
                                    },
                                    onCancel() {},
                                  });
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </List.Item>
                        )}
                      />
                    </InfiniteScroll>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ height: 42 }}></div>
                  <h4>Already in project</h4>
                  <List
                    dataSource={listProjectDetail[0]?.members}
                    renderItem={(item, index) => (
                      <List.Item key={index}>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} />}
                          title={<a>{item.name}</a>}
                          description={`User Id: ${item._id}`}
                        />
                        <div>
                          <button
                            data-placement="top"
                            className="btn bg-red-600 bg-red-700 hover:bg-red-600 focus:bg-red-600 text-white hover:text-white focus:text-white"
                            onClick={() => {
                              let data = {
                                userId: item._id,
                                projectId: params.id,
                              };
                              confirm({
                                title: "Do you want delete this user ?",
                                icon: <ExclamationCircleFilled />,
                                okText: "Delete",
                                okType: "danger",
                                cancelType: "primary",
                                onOk: async () => {
                                  try {
                                    const res = await dispatch(
                                      callDeleteUserFromProject(data)
                                    );
                                    if ((res.isDelete = true)) {
                                      notificationSuccess(res.message);
                                    } else {
                                      notificationFail(res.message);
                                    }
                                    dispatch(
                                      callGetListProjectDetail(params.id)
                                    );
                                  } catch (error) {}
                                },
                                onCancel() {},
                              });
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Modal>
          </span>
        </div>
      </div>
      <div className="row row-gap-0">{dataTask()}</div>
    </main>
  );
}
