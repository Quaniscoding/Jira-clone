import React from 'react';
import { Tooltip, Avatar } from 'antd';
import { CheckOutlined, BugOutlined } from '@ant-design/icons';

export default function TaskItem({ item, onDeleteTask, onClickTask, listProjectDetail }) {
    const bgColor = item.listTaskDetail.map((task) => task.statusId._id);

    const handleDeleteTask = (e, task) => {
        e.stopPropagation();
        onDeleteTask(task);
    };

    return (
        <div className="col-3 cursor-pointer" onClick={onClickTask}>
            <div className={`bg-gray-200 w-full h-full p-2 rounded d-flex flex-column ${bgColor}`}>
                <span className="inline-block px-2 py-0.5 mb-1 fs-3 font-semibold rounded text-uppercase">{item.alias}</span>
                <div>
                    {item.listTaskDetail?.map((task, index) => {
                        const taskType = task.typeId.taskType === 'bug' ? (
                            <BugOutlined key={index} className="bg-red-500 rounded text-white" />
                        ) : (
                            <CheckOutlined key={index} className="bg-green-500 rounded text-white" />
                        );
                        return (
                            <div className="border border-danger rounded border-3 mt-2" key={index}>
                                <div className="mt-2 bg-white p-2 shadow rounded">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center">Task type: {taskType}<b>{task?.typeId.taskType}</b></div>
                                        <div className="text-right mt-2">
                                            <button className="btn bg-danger text-white font-bold" onClick={(e) => handleDeleteTask(e, task)}>X</button>
                                        </div>
                                    </div>
                                    <div className="w-full bg-white rounded py-3 px-2 mt-1" role="button">
                                        <div className="row row-gap-0">
                                            <div className="col-8">
                                                <div className="mb-2">Description: {task.description}</div>
                                                <span className="text-xl rounded px-1 pb-0.5 text-orange-700 border border-orange-700">Priority: {task.priorityId?.priority}</span>
                                            </div>
                                            <div className="col-4">
                                                <div className="h-full w-full d-flex justify-end items-end">
                                                    {listProjectDetail[0]?.members.map((member) => (
                                                        <Tooltip title={member.username} key={member.username}>
                                                            <Avatar size="small" src={member.avatar} />
                                                        </Tooltip>
                                                    ))}
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
    );
}
