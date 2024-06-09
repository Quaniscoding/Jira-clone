import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import { callGetListProjectDetail } from '../../../redux/reducers/projects/getProjectDetail';
import { callGetListTaskType } from '../../../redux/reducers/task/getAllTaskType';
import { callGetListPriority } from '../../../redux/reducers/task/getAllPriority';
import { callGetListStatus } from '../../../redux/reducers/task/getAllStatus';
import { callGetTaskDetail } from '../../../redux/reducers/task/getTaskDetail';
import { callDeleteTask } from '../../../redux/reducers/task/deleteTask';

const { confirm } = Modal;

export default function TaskList({ params, notificationSuccess, notificationFail, taskId, setTaskId, useEffect, useState, dataUserLogin }) {
    const dispatch = useDispatch();
    const listProjectDetail = useSelector((state) => state.getProjectDetail.listProjectDetail);
    const [creatorId, setCreatorId] = useState("");
    useEffect(() => {
        dispatch(callGetListProjectDetail(params.id));
        dispatch(callGetListTaskType);
        dispatch(callGetListPriority);
        dispatch(callGetListStatus);
        setCreatorId(listProjectDetail?.map((item) => item.creator._id));
    }, [params.id, dispatch, listProjectDetail]);
    const handleDeleteTask = (item) => {
        confirm({
            title: 'Do you want delete this task?',
            icon: <ExclamationCircleFilled />,
            okText: 'Delete',
            okType: 'danger',
            cancelType: 'primary',
            onOk: async () => {
                try {
                    if (creatorId.some(id => id === dataUserLogin._id)) {
                        const res = await dispatch(callDeleteTask(item._id));
                        if (res.isDelete) notificationSuccess(res.message);
                    }
                    else notificationFail("Unauthorized");
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
                        item.listTaskDetail?.map((item) =>
                            setTaskId(item._id),
                            dispatch(callGetTaskDetail(taskId))
                        )
                    }}
                />
            ))}
            {taskId && <TaskModal taskId={taskId} params={params} notificationSuccess={notificationSuccess} notificationFail={notificationFail} setTaskId={setTaskId} useEffect={useEffect} listProjectDetail={listProjectDetail} />}
        </div>
    );
}
