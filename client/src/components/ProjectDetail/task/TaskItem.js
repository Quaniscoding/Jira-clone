import React, { useState } from "react";
import { Tooltip, Avatar } from "antd";
import { CheckOutlined, BugOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { callGetTaskDetail } from "../../../redux/reducers/task/getTaskDetail";
import { callGetListUserById } from "../../../redux/reducers/users/getUserById";

export default function TaskItem({
  item,
  onDeleteTask,
  onClickTask,
  getTypeLabel,
  getPriorityLabel,
  useEffect,
  taskId,
}) {
  const dispatch = useDispatch();
  const handleDeleteTask = (e, task) => {
    e.stopPropagation();
    onDeleteTask(task);
  };
  const listTaskDetail = useSelector(
    (state) => state.getTaskDetail.listTaskDetail
  );
  const listUserAssign = listTaskDetail.listUserAssign || [];
  const [assigners, setAssigners] = useState([]);
  useEffect(() => {
    if (taskId) {
      dispatch(callGetTaskDetail(taskId));
    }
  }, [dispatch, taskId]);
  useEffect(() => {
    if (listUserAssign.length > 0) {
      Promise.all(
        listUserAssign.map((userId) => dispatch(callGetListUserById(userId)))
      ).then((responses) => {
        const users = responses.map((response) => response.payload);
        setAssigners(users);
      });
    }
  }, [dispatch, listUserAssign]);
  return (
    <div className="col-3 cursor-pointer" onClick={onClickTask}>
      <div
        className={"bg-gray-200 w-full h-full p-2 rounded d-flex flex-column"}
      >
        <span className="inline-block px-2 py-0.5 mb-1 fs-3 font-semibold rounded text-uppercase">
          {item.alias}
        </span>
        <div>
          {item.listTaskDetail.map((task, index) => {
            const taskType =
              task.typeId === "665c5b7ef5b71f8020dc3c67" ? (
                <CheckOutlined
                  key={index}
                  className="bg-green-500 rounded text-white"
                />
              ) : (
                <BugOutlined
                  key={index}
                  className="bg-red-500 rounded text-white"
                />
              );
            return (
              <div className="border rounded border-3 mt-2" key={index}>
                <div className="mt-2 bg-white p-3 shadow rounded">
                  <div className="d-flex justify-content-between flex-column align-items-start">
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="d-flex align-items-center pl-2">
                        Task name: {item.listTaskDetail[0].taskName}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="d-flex align-items-center pl-2">
                        Task type: {taskType}
                      </span>
                      <b className="pl-2">{getTypeLabel(task.typeId)}</b>
                    </div>
                  </div>
                  <div
                    className="w-full bg-white rounded py-3 px-2 mt-1"
                    role="button"
                  >
                    <div className="row row-gap-0">
                      <div className="col-8">
                        <div className="pl-2 mb-2">
                          Description: {task.description}
                        </div>
                        <span className="text-xl rounded px-1 pb-0.5 text-orange-700 border border-orange-700">
                          Priority: {getPriorityLabel(task.priorityId)}
                        </span>
                      </div>
                      <div className="col-4">
                        <div className="h-full w-full d-flex justify-end items-end">
                          {assigners?.map((member) => (
                            <Tooltip
                              title={member.username}
                              key={member.username}
                            >
                              <Avatar size="small" src={member.avatar} />
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right mt-4 mb-0">
                      <button
                        className="btn bg-danger text-white font-bold"
                        onClick={(e) => handleDeleteTask(e, task)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
