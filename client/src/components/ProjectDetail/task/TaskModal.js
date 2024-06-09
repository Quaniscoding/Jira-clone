import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Collapse } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { callEditTask } from '../../../redux/reducers/task/editTask';
import { callGetTaskDetail } from '../../../redux/reducers/task/getTaskDetail';

const { Panel } = Collapse;

export default function TaskModal({ taskId, notificationSuccess, notificationFail, setTaskId, listProjectDetail }) {
    const dispatch = useDispatch();
    const listTaskDetail = useSelector((state) => state.getTaskDetail.listTaskDetail);
    const listTaskType = useSelector((state) => state.getAllTaskType.listTaskType);
    const listPriority = useSelector((state) => state.getAllPriority.listPriority);
    const listStatus = useSelector((state) => state.getAllStatus.listStatus);

    useEffect(() => {
        if (taskId) {
            dispatch(callGetTaskDetail(taskId));
        }
    }, [dispatch, taskId]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            listUserAssign: listTaskDetail?.listUserAssign?.map(item => item._id) || [],
            taskId: listTaskDetail?._id || '',
            taskName: listTaskDetail?.taskName || '',
            description: listTaskDetail?.description || '',
            statusId: listTaskDetail?.statusId?._id || '',
            originalEstimate: listTaskDetail?.originalEstimate || 0,
            timeTrackingSpent: listTaskDetail?.timeTrackingSpent || 0,
            timeTrackingRemaining: listTaskDetail?.timeTrackingRemaining || 0,
            projectId: listTaskDetail?.projectId || '',
            typeId: listTaskDetail?.typeId?._id || '',
            priorityId: listTaskDetail?.priorityId?._id || '',
        },
        onSubmit: async (values) => {
            try {
                const res = await dispatch(callEditTask(values, taskId));
                if (res && res.isUpdate) {
                    notificationSuccess(res.message);
                } else {
                    notificationFail(res?.message);
                }
            } catch (error) {
                notificationFail(error.message);
            }
        },
    });

    return (
        <Modal
            visible={!!taskId}
            onCancel={() => setTaskId('')}
            footer={null}
            width={1000}
        >
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h3>Edit Task</h3>
                        <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
                            <Form.Item label="Task type">
                                <Select
                                    name="typeId"
                                    value={formik.values.typeId}
                                    onChange={(value) => formik.setFieldValue('typeId', value)}
                                >
                                    {listTaskType.map((taskType) => (
                                        <Select.Option value={taskType._id} key={taskType._id}>
                                            {taskType.taskType}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Task name">
                                <Input
                                    name="taskName"
                                    value={formik.values.taskName}
                                    onChange={formik.handleChange}
                                />
                            </Form.Item>
                            <Form.Item label="Priority">
                                <Select
                                    name="priorityId"
                                    value={formik.values.priorityId}
                                    onChange={(value) => formik.setFieldValue('priorityId', value)}
                                >
                                    {listPriority.map((priority) => (
                                        <Select.Option value={priority._id} key={priority._id}>
                                            {priority.priority}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Status">
                                <Select
                                    name="statusId"
                                    value={formik.values.statusId}
                                    onChange={(value) => formik.setFieldValue('statusId', value)}
                                >
                                    {listStatus.map((status) => (
                                        <Select.Option value={status._id} key={status._id}>
                                            {status.statusName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Description">
                                <Input.TextArea
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                            </Form.Item>
                            <Collapse defaultActiveKey={['1']}>
                                <Panel header="Details" key="1">
                                    <Form.Item label="Assigners">
                                        <Select
                                            mode="multiple"
                                            style={{ width: "100%" }}
                                            value={formik.values.listUserAssign}
                                            onChange={(value) => formik.setFieldValue('listUserAssign', value)}
                                        >
                                            {listProjectDetail[0]?.members?.map((item) => (
                                                <Select.Option value={item._id} key={item._id}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Panel>
                                <Panel header="Time Tracking" key="2">
                                    <Form.Item label="Time Spent">
                                        <Input
                                            name="timeTrackingSpent"
                                            value={formik.values.timeTrackingSpent}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Time Remaining">
                                        <Input
                                            name="timeTrackingRemaining"
                                            value={formik.values.timeTrackingRemaining}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Item>
                                </Panel>
                                <Panel header="Original Estimate" key="3">
                                    <Form.Item label="Original Estimate">
                                        <Input
                                            name="originalEstimate"
                                            value={formik.values.originalEstimate}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Item>
                                </Panel>
                            </Collapse>
                            <Button type="primary" htmlType="submit">Save</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
