import React from "react";
import { Avatar, Tooltip, Button, Modal, notification, Input, Table } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { callDeleteProject } from "../../../redux/reducers/projects/deleteProject";
import { callGetListUser } from "../../../redux/reducers/users/getUser";

import { callGetListProject } from "../../../redux/reducers/projects/getAllProject";
import { callDeleteUserFromProject } from './../../../redux/reducers/users/deleteUserFromProject';
import { callAsignUserFromProject } from './../../../redux/reducers/users/asignUserFromProject';

const { confirm } = Modal;

const ProjectTable = ({ listProject, listUser, navigate, dataUserLogin, dispatch, keyWord }) => {
    const columns = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Project Name",
            dataIndex: "projectName",
            key: "projectName",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Creator",
            dataIndex: "creator",
            key: "creator",
        },
        {
            title: "Members",
            dataIndex: "member",
            key: "member",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
        },
    ];

    const openNotification = (type, description) => {
        notification[type]({
            message: "Notification!",
            description,
        });
    };

    const data = listProject.map((item, index) => ({
        key: index,
        id: item._id.toString().slice(-4),
        projectName: (
            <button
                className="p-0 m-0 text-blue-500"
                onClick={() => navigate(`/projectDetail/${item._id}`)}
            >
                {item.projectName}
            </button>
        ),
        category: item.projectCategoryName,
        creator: (
            <div className="m-auto">
                <p>{item.creator.username}</p>
            </div>
        ),
        member: (
            <span className="d-flex">
                <Avatar.Group
                    maxCount={3}
                    maxPopoverTrigger="hover"
                    size="default"
                    maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "white",
                        cursor: "pointer",
                    }}
                >
                    {item.members.map((member, i) => (
                        <Tooltip
                            key={i}
                            title={
                                <>
                                    <h5 className="text-black">Members</h5>
                                    <table className="table bg-white">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Avatar</th>
                                                <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{member.userId}</td>
                                                <td>
                                                    <Avatar src={member.avatar} />
                                                </td>
                                                <td>{member.name}</td>
                                                <td>
                                                    <Button
                                                        danger
                                                        onClick={() => {
                                                            confirm({
                                                                title: "Do you want to delete this user?",
                                                                icon: <ExclamationCircleFilled />,
                                                                okText: "Delete",
                                                                okType: "danger",
                                                                cancelType: "primary",
                                                                onOk: async () => {
                                                                    try {
                                                                        const dataUser = {
                                                                            projectId: item._id,
                                                                            userId: member.userId,
                                                                        };
                                                                        if (item.creator._id === dataUserLogin._id) {
                                                                            const res = await dispatch(callDeleteUserFromProject(dataUser));
                                                                            if (res.isDelete) {
                                                                                openNotification("success", "Delete user successfully!");
                                                                            }
                                                                            dispatch(callGetListProject(keyWord));
                                                                        } else {
                                                                            openNotification("error", "User is unauthorized!");
                                                                        }
                                                                    } catch (error) { }
                                                                },
                                                            });
                                                        }}
                                                    >
                                                        X
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            }
                            placement="bottom"
                        >
                            <Avatar src={member.avatar} />
                        </Tooltip>
                    ))}
                </Avatar.Group>
                <Tooltip
                    placement="right"
                    trigger="click"
                    title={
                        <>
                            <h5 className="text-black">Add users</h5>
                            <Input
                                onChange={(e) => {
                                    const { value } = e.target;
                                    dispatch(callGetListUser(value));
                                }}
                            />
                            {listUser.map((user, index) => (
                                <Button
                                    key={index}
                                    className="btn btn-white text-black pb-1"
                                    onClick={() => {
                                        const dataUser = {
                                            projectId: item._id,
                                            userId: user.userId,
                                        };
                                        confirm({
                                            title: "Do you want to assign this user?",
                                            icon: <ExclamationCircleFilled />,
                                            okText: "Add",
                                            okType: "primary",
                                            cancelType: "primary",
                                            onOk: async () => {
                                                try {
                                                    if (dataUser.projectId) {
                                                        const res = await dispatch(callAsignUserFromProject(dataUser));
                                                        if (res.isAsign) {
                                                            openNotification("success", "Assign user successfully!");
                                                        } else if (res.isUnthor) {
                                                            openNotification("error", "User is unauthorized!");
                                                        } else {
                                                            openNotification("error", "User already exists!");
                                                        }
                                                        dispatch(callGetListProject(keyWord));
                                                    }
                                                } catch (error) {
                                                    openNotification("error", "User already exists!");
                                                }
                                            },
                                        });
                                    }}
                                >
                                    {user.name}
                                </Button>
                            ))}
                        </>
                    }
                >
                    <Avatar>+</Avatar>
                </Tooltip>
            </span>
        ),
        action: (
            <div className="dropdown">
                <button
                    className="btn btn-light dropdown-toggle dots"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-three-dots"
                        viewBox="0 0 16 16"
                    >
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                    </svg>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a
                        className="dropdown-item"
                        onClick={() => navigate(`edit/${item._id}`)}
                    >
                        Edit Project
                    </a>
                    <a
                        className="dropdown-item"
                        onClick={() => {
                            confirm({
                                title: `Do you want to delete project: ${item.projectName}?`,
                                icon: <ExclamationCircleFilled />,
                                okText: "Delete",
                                okType: "danger",
                                cancelType: "primary",
                                onOk: async () => {
                                    try {
                                        if (dataUserLogin._id === item.creator._id) {
                                            const res = await dispatch(callDeleteProject(item._id));
                                            if (res.isDelete) {
                                                openNotification("success", "Delete project successfully!");
                                            }
                                            dispatch(callGetListProject(keyWord));
                                        } else {
                                            openNotification("error", "User is unauthorized!");
                                        }
                                    } catch (error) { }
                                },
                            });
                        }}
                    >
                        Delete project
                    </a>
                </div>
            </div>
        ),
    }));

    return <Table columns={columns} dataSource={data} />;
};

export default ProjectTable;
