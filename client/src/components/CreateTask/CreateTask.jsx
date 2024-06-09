import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetListProject } from "../../redux/reducers/projects/getAllProject";
import { callGetListTaskType } from "./../../redux/reducers/task/getAllTaskType";
import { callGetListPriority } from "./../../redux/reducers/task/getAllPriority";
import { callGetListStatus } from "./../../redux/reducers/task/getAllStatus";
import { callGetListProjectDetail } from "./../../redux/reducers/projects/getProjectDetail";
import { callCreateTask } from "./../../redux/reducers/task/createTask";
import { callGetListUserByProjectId } from "./../../redux/reducers/users/getUserByProjectId";
import {
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
export default function CreateTask({ onClose, open, dataUserLogin }) {
  const [inputValue, setInputValue] = useState(1);
  const [inputValueHourSpent, setInputValueHourSpent] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  const onChangeHourSpent = (newValue) => {
    setInputValueHourSpent(newValue);
  };
  let dispatch = useDispatch();
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
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
  const [creatorId, setCreatorId] = useState("");
  const listProject = useSelector((state) => state.getAllProject.listProject);

  let [getProjectId, setProjectId] = useState("");
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
  useEffect(() => {
    setCreatorId(listProject?.map((item) => item.creator._id));
  }, [listProject]);
  const onSubmit = async (values) => {
    let timeTrackingRemaining = inputValue - inputValueHourSpent;
    let originalEstimate = inputValue;
    let {
      taskName,
      timeTrackingSpent,
      description,
      statusId,
      typeId,
      priorityId,
      listUserAssign,
    } = values;
    try {
      if (creatorId.some((id) => id === dataUserLogin._id)) {
        const res = await dispatch(
          callCreateTask({
            timeTrackingRemaining,
            originalEstimate,
            projectId: getProjectId,
            taskName,
            timeTrackingSpent,
            description,
            statusId,
            typeId,
            priorityId,
            listUserAssign,
          })
        );
        if (res.isCreate == true) {
          onClose();
          notificationSuccess(res.message);
        }
        if (res.isCreate == false) {
          notificationFail(res.message);
        }
      } else {
        notificationFail("Unauthorized");
      }
    } catch (error) {
      notificationFail(error);
    }
  };
  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(callGetListProject(""));
      dispatch(callGetListTaskType);
      dispatch(callGetListPriority);
      dispatch(callGetListStatus);
      dispatch(callGetListProjectDetail);
      dispatch(callGetListUserByProjectId(getProjectId));
    }, 1000);
  }, [0]);
  return (
    <div>
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
        <Form layout="vertical" onFinish={onSubmit} initialValues={true}>
          <Form.Item label="Project" required>
            <Select placeholder="Project">
              {listAllProject.map((item, index) => {
                return (
                  <Select.Option key={index}>
                    <button
                      onClick={() => {
                        setProjectId(item._id);
                        dispatch(callGetListUserByProjectId(item._id));
                      }}
                    >
                      {item.projectName}
                    </button>
                  </Select.Option>
                );
              })}
            </Select>
            <span className="font-bold font-monospace">
              * You can only create tasks of your own projects!
            </span>
          </Form.Item>
          <Form.Item name="taskName" label="Task Name" required>
            <Input placeholder="Task Name" />
          </Form.Item>
          <Form.Item name="statusId" label="Status" required>
            <Select placeholder="Status">
              {listStatus.map((item, index) => {
                return (
                  <Select.Option key={index} value={item._id}>
                    {item.statusName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="priorityId" label="Priority" required>
                <Select placeholder="Priority">
                  {listPriority.map((item, index) => {
                    return (
                      <Select.Option key={index} value={item._id}>
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
                      <Select.Option key={index} value={item._id}>
                        {item.taskType}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="listUserAssign" label="Assigners" required>
            <Select
              placeholder="Assigners"
              mode="multiple"
              style={{
                width: "100%",
              }}
            >
              {listUserByProjectId?.map((item, index) => {
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
              <Form.Item label={"Total Estimated Hours"} required>
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
                {inputValue - inputValueHourSpent} hour(s) remaining
              </div>
            </div>
          </Form.Item>
          <Form.Item label="Desciption" name="description" required>
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
    </div>
  );
}
