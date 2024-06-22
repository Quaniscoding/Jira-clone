import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import { callGetListProjectDetail } from "../../../redux/reducers/projects/getProjectDetail";
import { callGetListTaskType } from "../../../redux/reducers/task/getAllTaskType";
import { callGetListPriority } from "../../../redux/reducers/task/getAllPriority";
import { callGetListStatus } from "../../../redux/reducers/task/getAllStatus";
import { callGetTaskDetail } from "../../../redux/reducers/task/getTaskDetail";
import { callDeleteTask } from "../../../redux/reducers/task/deleteTask";

const { confirm } = Modal;

export default function TaskList({
    params,
    notificationSuccess,
    notificationFail,
    taskId,
    setTaskId,
    useEffect,
    useState,
    dataUserLogin,
}) {
    const dispatch = useDispatch();
    const listProjectDetail = useSelector(
        (state) => state.getProjectDetail.listProjectDetail
    );
    const [creatorId, setCreatorId] = useState("");
    useEffect(() => {
        dispatch(callGetListProjectDetail(params.id));
        dispatch(callGetListTaskType);
        dispatch(callGetListPriority);
        dispatch(callGetListStatus);
        setCreatorId(listProjectDetail?.map((item) => item.creator._id));
    }, []);
    const getTypeLabel = (typeId) => {
        switch (typeId) {
            case "665c5b7ef5b71f8020dc3c67":
                return "New Task";
            case "665c5b68f5b71f8020dc3c61":
                return "Bug";
            default:
                return "Unknown";
        }
    };
    const getPriorityLabel = (priorityId) => {
        switch (priorityId) {
            case "665c53f42f99c59a429fbb92":
                return "Low";
            case "665c53d42f99c59a429fbb8c":
                return "Medium";
            case "665c53e02f99c59a429fbb8f":
                return "High";
            case "665c54002f99c59a429fbb95":
                return "Lowest";
            default:
                return "Unknown";
        }
    };
    const getStatusLabel = (statusId) => {
        switch (statusId) {
            case "665c5adbf8436f1426b20f8a":
                return "BACKLOG";
            case "665c5b0cf8436f1426b20f8d":
                return "SELECTED FOR DEVELOPMENT";
            case "665c5b14f8436f1426b20f90":
                return "IN PROGRESS";
            case "665c5b1af8436f1426b20f93":
                return "DONE";
            default:
                return "Unknown";
        }
    };
    const handleDeleteTask = (item) => {
        confirm({
            title: "Do you want delete this task?",
            icon: <ExclamationCircleFilled />,
            okText: "Delete",
            okType: "danger",
            cancelType: "primary",
            onOk: async () => {
                try {
                    if (creatorId.some((id) => id === dataUserLogin._id)) {
                        const res = await dispatch(callDeleteTask(item._id));
                        if (res.isDelete) notificationSuccess(res.message);
                    } else notificationFail("Unauthorized");
                    dispatch(callGetListProjectDetail(params.id));
                } catch (error) {
                    notificationFail(error.message);
                }
            },
        });
    };

    return (
        <div className="task-list row row-gap-0">
            {listProjectDetail[0]?.listTask?.map((item, index) => (
                <TaskItem
                    key={index}
                    item={item}
                    onDeleteTask={handleDeleteTask}
                    listProjectDetail={listProjectDetail}
                    onClickTask={() => {
                        item.listTaskDetail?.map(
                            (item) => setTaskId(item._id),
                            dispatch(callGetTaskDetail(taskId))
                        );
                    }}
                    getTypeLabel={getTypeLabel}
                    getPriorityLabel={getPriorityLabel}
                    taskId={taskId}
                    useEffect={useEffect}
                />
            ))}
            {taskId && (
                <TaskModal
                    taskId={taskId}
                    params={params}
                    notificationSuccess={notificationSuccess}
                    notificationFail={notificationFail}
                    setTaskId={setTaskId}
                    useEffect={useEffect}
                    listProjectDetail={listProjectDetail}
                    getTypeLabel={getTypeLabel}
                    getPriorityLabel={getPriorityLabel}
                    getStatusLabel={getStatusLabel}
                    callGetListProjectDetail={callGetListProjectDetail}
                />
            )}
        </div>
    );
}
