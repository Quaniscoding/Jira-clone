import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  notification,
  Checkbox,
  Grid,
  theme,
  Typography,
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { callSignUp } from "../../redux/reducers/auth/userSignUp";
export default function SignUp() {
  const { useToken } = theme;
  const { useBreakpoint } = Grid;
  const { Text, Title, Link } = Typography;
  const { token } = useToken();
  const screens = useBreakpoint();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onSubmit = async (values) => {
    try {
      let { email, pass_word, username, phone } = values;
      const result = await dispatch(
        callSignUp({ email, pass_word, username, phone })
      );
      if (result.isError == true) {
        openNotificationError();
      }
      if (result.isSignUp == true) {
        openNotificationSuccess();
      }
    } catch (error) {}
  };
  const openNotificationError = () => {
    notification["error"]({
      message: "Notification !",
      description: "Email already in use!",
    });
  };
  const openNotificationSuccess = () => {
    notification["success"]({
      message: "Notification !",
      description: "Create Success!",
    });
  };
  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path
              d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
              fill="white"
            />
            <path
              d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
              fill="white"
            />
            <path
              d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
              fill="white"
            />
          </svg>

          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>Welcome to my website</Text>
        </div>
        <Form
          name="formSignUp"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="pass_word"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input prefix={<ProfileOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="phone"
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
            <Input prefix={<PhoneOutlined />} placeholder="Phone number" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit">
              Sign up
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Don't have an account?</Text>{" "}
              <Link
                href=""
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in now
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
