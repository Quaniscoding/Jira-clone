import { Button, Form, Input, notification } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { callCreateUser } from "../../../redux/reducers/users/createUser";
import "../css/userMain.css";
export default function CreateUser() {
  let dispatch = useDispatch();
  const openNotificationSuccess = () => {
    notification["success"]({
      message: "Notification !",
      description: "Create user successfully !",
    });
  };
  const err = () => {
    notification["error"]({
      message: "Notification !",
      description: "User email already exists !",
    });
  };
  const onSubmit = async (values) => {
    try {
      let { email, passWord, name, phoneNumber } = values;
      console.log(values);
      const result = await dispatch(
        callCreateUser({ email, passWord, name, phoneNumber })
      );
      console.log(result);
      if (result.isCreate == true) {
        openNotificationSuccess();
      } else {
        err();
      }
    } catch (error) {}
  };
  return (
    <main className="container containerCreate py-6">
      <div className="mx-auto" style={{ maxWidth: 980 }}>
        <div className="mb-4">
          <h3 className="ant-typography">Create new user</h3>
        </div>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          autoComplete="on"
        >
          <Form.Item
            label={"Email"}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email !",
              },
              {
                type: "email",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label={"Password"}
            name="passWord"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                type: "string",
                min: 0,
                max: 10,
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                type: "string",
                min: 10,
                max: 10,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
