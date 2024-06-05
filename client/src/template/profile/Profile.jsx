import React, { useState } from "react";
import { getLocal } from "../../utils/config";
import { DATA_USER } from "./../../utils/constant";
import { Avatar, Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./css/profilecss.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { callUpdateProfile } from "../../redux/reducers/profileUser/updateProfie";
export default function Profile() {
  const [passWord, setPassWord] = useState("");
  const [passWordConfirm, setPassWordConfirm] = useState("");
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const dataUser = getLocal(DATA_USER);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: dataUser.id,
      email: dataUser.email,
      name: dataUser.name,
      phoneNumber: dataUser.phoneNumber,
      passWord: passWord,
    },
    onSubmit: async (values) => {
      if (passWord == passWordConfirm) {
        const res = await dispatch(callUpdateProfile(values));
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
        <div className="d-flex" style={{ rowGap: 0 }}>
          <div className="col-3">
            <Avatar
              style={{ width: "240px", height: "240px" }}
              src={dataUser.avatar}
            />
          </div>
          <div className="col-6">
            <div className="mb-4">
              <h3 className="uppercase font-bold">{dataUser.name}</h3>
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
                  name="NAMEe"
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
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item
                name="passWord"
                label="Password"
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
                    min: 0,
                    max: 10,
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
        </div>
      </div>
    </main>
  );
}
