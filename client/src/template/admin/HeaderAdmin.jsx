import React, { useState } from "react";
import { ProjectOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Tooltip, Layout, Menu, Dropdown, Button } from "antd";
import { DATA_USER, USER_LOGIN } from "../../utils/constant";
import { getLocal } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import "./css/style.css";

const { Header } = Layout;

export default function HeaderAdmin() {
  let [reset, setReset] = useState(0);
  const navigate = useNavigate();
  let dataUser = getLocal(DATA_USER);

  const projectMenu = (
    <Menu>
      <Menu.Item onClick={() => navigate("/projectmanagement")}>
        View all projects
      </Menu.Item>
      <Menu.Item onClick={() => navigate("/createProject")}>
        Create Project
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item onClick={() => navigate("/user")}>
        View all users
      </Menu.Item>
      <Menu.Item onClick={() => navigate("user/createUser")}>
        Create users
      </Menu.Item>
    </Menu>
  );

  const settingMenu = (
    <Menu>
      <Menu.ItemGroup title="ATLASSIAN ADMIN">
        <Menu.Item onClick={() => navigate("user")}>User management</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title="JIRA SETTING">
        <Menu.Item onClick={() => navigate(`/projectmanagement`)}>
          Project
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  const profileMenu = (
    <Menu>
      <Menu.Item onClick={() => navigate("profile")}>Profiles</Menu.Item>
      <Menu.Item
        onClick={() => {
          setReset(reset + 1);
          localStorage.removeItem(USER_LOGIN);
          navigate(`/login`);
        }}
      >
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="header">
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center">
          <ProjectOutlined />
          <Button type="link" onClick={() => navigate("/projectmanagement")}>
            Jira
          </Button>
          <Dropdown overlay={projectMenu}>
            <Button type="link">Project</Button>
          </Dropdown>
          <Dropdown overlay={userMenu}>
            <Button type="link">Users</Button>
          </Dropdown>
        </div>
        <div className="flex items-center">
          <Dropdown overlay={settingMenu}>
            <div>
              <Button type="link" icon={<SettingOutlined />} />
            </div>
          </Dropdown>
          <Dropdown overlay={profileMenu}>
            <div>
              <Avatar
                style={{
                  color: "#f56a00",
                  background: "none",
                  fontSize: "18px",
                  width: 24,
                  height: 24,
                  cursor: "pointer"
                }}
                src={dataUser?.avatar}
              />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}
