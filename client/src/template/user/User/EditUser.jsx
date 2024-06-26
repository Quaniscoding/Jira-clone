import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import "../css/userMain.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { callUpdateUser } from "../../../redux/reducers/users/updateUser";
import { callGetListUserById } from "../../../redux/reducers/users/getUserById";
export default function EditUser() {
  const params = useParams();
  const [passWord, setPassWord] = useState("");
  const [passWordConfirm, setPassWordConfirm] = useState("");
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const listUser = useSelector((state) => state.getUserById.listUserById);
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(callGetListUserById(params.id));
    }, 1000);
  }, [params]);
  console.log(listUser);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: listUser._id,
      email: listUser.email,
      name: listUser.username,
      phoneNumber: listUser.phone,
      password: listUser.password,
    },
    onSubmit: async (values) => {
      console.log(values);
      if (passWord == passWordConfirm) {
        const res = await dispatch(callUpdateUser(values));
        if (res.isUpdate == true) {
          openNotificationSuccess();
        } else {
          err();
        }
      } else {
        errPassWord();
      }
    },
  });
  const openNotificationSuccess = () => {
    notification["success"]({
      message: "Notification !",
      description: "Update user successfully !",
    });
  };
  const err = () => {
    notification["error"]({
      message: "Notification !",
      description: "Update user fail !",
    });
  };
  const errPassWord = () => {
    notification["error"]({
      message: "Notification !",
      description: "Password does not match !",
    });
  };
  return (
    <main className="container py-6">
      <div className="mx-auto" style={{ maxWidth: "980px" }}>
        <div className="mb-4">
          <h3 className="ant-typography">Edit user</h3>
        </div>
        <Form
          onSubmitCapture={formik.handleSubmit}
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <Form.Item label="Id" required>
            <Input
              name="id"
              disabled
              value={formik.values.id}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            required
            label="Email"
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
            <Input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Name"
            required
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            required
            label="Phone number"
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
            <Input
              name="phone"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                type: "string",
              },
            ]}
          >
            <Input
              type="password"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Password confirmation"
            name="passWordConfirm"
            rules={[
              {
                required: true,
                message: "Please input your password confirmation!",
              },
              {
                type: "string",
              },
            ]}
          >
            <Input
              type="password"
              value={passWordConfirm}
              onChange={(e) => setPassWordConfirm(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <div className="d-flex justify-content-end">
              <div className="pr-3">
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    navigate("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
