import React, { useEffect, useState } from "react";
import {
  SettingOutlined,
  UserOutlined,
  WalletOutlined,
  LogoutOutlined,
  MenuOutlined,
  BellOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Layout,
  Menu,
  Dropdown,
  Button,
  theme,
  Grid,
  Space
} from "antd";
import { DATA_USER, USER_LOGIN } from "../../utils/constant";
import { getLocal } from "../../utils/config";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/style.css";
import Logo from '../../assets/Images/logo.png';
const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function HeaderAdmin() {
  const { token } = useToken();
  const [reset, setReset] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const dataUser = getLocal(DATA_USER);
  const screens = useBreakpoint();

  const userMenuItems = [
    { label: "Profile", icon: <UserOutlined />, key: "0" },
    { label: "Settings", icon: <SettingOutlined />, key: "1" },
    { label: "Billing", icon: <WalletOutlined />, key: "2" },
    { type: "divider" },
    { label: "Logout", icon: <LogoutOutlined />, key: "3" },
  ];

  const menuItems = [
    { label: "Projects", key: "projectmanagement" },
    { label: "Dashboard", key: "dashboard" },
    {
      label: "User",
      key: "SubMenu",
      children: [
        { label: "View all users", key: "user" },
        { label: "Create user", key: "user/createUser" },
      ],
    },
    { label: "Settings", key: "settings" },
  ];

  const [current, setCurrent] = useState(location.pathname.slice(1));

  useEffect(() => {
    setCurrent(location.pathname.slice(1));
  }, [location]);

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  const styles = {
    container: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      margin: "0 auto",
      maxWidth: token.screenXL,
      padding: screens.md ? `0px ${token.paddingLG}px` : `0px ${token.padding}px`,
    },
    header: {
      backgroundColor: token.colorBgContainer,
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      position: "relative",
    },
    logo: {
      display: "block",
      height: "24px",
      left: "50%",
      position: screens.md ? "static" : "absolute",
      top: "50%",
      transform: screens.md ? " " : "translate(-50%, -50%)",
    },
    menu: {
      backgroundColor: "transparent",
      borderBottom: "none",
      lineHeight: screens.sm ? "4rem" : "3.5rem",
      marginLeft: screens.md ? "0px" : "-1rem",
      width: screens.md ? "inherit" : token.sizeXXL,
    },
    menuContainer: {
      alignItems: "center",
      display: "flex",
      gap: token.margin,
      width: "100%",
    },
    avatar: {
      cursor: "pointer",
    },
  };

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "0":
        navigate("/profile");
        break;
      case "1":
        navigate("/settings");
        break;
      case "2":
        navigate("/billing");
        break;
      case "3":
        setReset(reset + 1);
        localStorage.removeItem(USER_LOGIN);
        navigate("/login");
        break;
      default:
        break;
    }
  };

  return (
    <nav style={styles.header}>
      <div style={styles.container}>
        <div style={styles.menuContainer}>
          <a style={styles.logo} href="/projectmanagement">
            <img style={styles.logo} src={Logo} alt="" />
          </a>
          <Menu
            style={styles.menu}
            mode="horizontal"
            items={menuItems}
            selectedKeys={[current]}
            onClick={onClick}
            overflowedIndicator={<Button type="text" icon={<MenuOutlined />} />}
          />
        </div>
        <Space>
          <Button type="text" icon={<BellOutlined />} />
          <Dropdown
            overlay={<Menu items={userMenuItems} onClick={({ key }) => handleMenuClick({ key })} />}
            placement="bottomRight"
          >
            {dataUser.avatar ? <Avatar style={styles.avatar} src={dataUser.avatar} /> : <Avatar src="https://ui-avatars.com/api/?name=AVATAR" />}
          </Dropdown>
        </Space>
      </div>
    </nav>
  );
}
