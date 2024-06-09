import React, { useEffect, useState } from "react";
import "./css/cssProject.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callGetListProjectDetail } from "../../redux/reducers/projects/getProjectDetail";
import {
  Avatar,
  Divider,
  Input,
  Modal,
  Skeleton,
  List,
  Button,
  notification,
  Collapse,
  Tooltip,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import useRoute from "../../hooks/useRoute";

import { callAsignUserFromProject } from "../../redux/reducers/users/asignUserFromProject";
import { callDeleteUserFromProject } from "../../redux/reducers/users/deleteUserFromProject";

import { getLocal } from "../../utils/config";
import { DATA_USER } from "../../utils/constant";
import TaskData from "./task/TaskData";
const { confirm } = Modal;
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
  const errUser = () => {
    notification["error"]({
      message: "Notification !",
      description: "User already exists !",
    });
  };
  const listProjectDetail = useSelector(
    (state) => state.getProjectDetail.listProjectDetail
  );

  const listUser = useSelector((state) => state.getUser.listUser);

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

  const title = `Add members to project ${listProjectDetail[0]?.projectName}`;
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
      <div className="row row-gap-0">
        {
          <TaskData
            params={params}
            notificationSuccess={notificationSuccess}
            notificationFail={notificationFail}
          />
        }
      </div>
    </main>
  );
}
