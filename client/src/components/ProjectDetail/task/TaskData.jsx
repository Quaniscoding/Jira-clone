import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notification } from "antd";

import { callGetListUser } from "../../../redux/reducers/users/getUser";
import useRoute from "../../../hooks/useRoute";
import { callGetListProjectDetail } from "../../../redux/reducers/projects/getProjectDetail";
import { callGetListTaskType } from "../../../redux/reducers/task/getAllTaskType";
import { callGetListPriority } from "../../../redux/reducers/task/getAllPriority";
import { callGetListStatus } from "../../../redux/reducers/task/getAllStatus";

import TaskList from "./TaskList";
import CommentList from "../Comment/CommentList";
import { callGetTaskDetail } from "../../../redux/reducers/task/getTaskDetail";
import { getLocal } from "../../../utils/config";
import { DATA_USER } from "../../../utils/constant";

export default function TaskData({ params }) {
  const dispatch = useDispatch();
  const [taskId, setTaskId] = useState("");
  const dataUserLogin = getLocal(DATA_USER);
  const {
    searchParams: [searchParams, setSearchParams],
  } = useRoute();
  const keyWord = searchParams.has("keyWord")
    ? searchParams.get("keyWord")
    : "";
  useEffect(() => {
    dispatch(callGetListUser(keyWord));
    dispatch(callGetListProjectDetail(params.id));
    dispatch(callGetListTaskType);
    dispatch(callGetListPriority);
    dispatch(callGetListStatus);
    dispatch(callGetTaskDetail(taskId));
  }, [keyWord, params.id]);

  const notificationSuccess = (message) => {
    notification.success({ message: "Notification !", description: message });
  };

  const notificationFail = (message) => {
    notification.error({ message: "Notification !", description: message });
  };

  return (
    <div className="task-data">
      <TaskList
        params={params}
        notificationSuccess={notificationSuccess}
        notificationFail={notificationFail}
        taskId={taskId}
        setTaskId={setTaskId}
        useEffect={useEffect}
        useState={useState}
        dataUserLogin={dataUserLogin}
      />
      <div className="comment-list">
        <CommentList taskId={taskId} setTaskId={setTaskId} />
      </div>
    </div>
  );
}
