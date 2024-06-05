import { Button, Input, notification, Space, Table, Modal, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { callGetListUser } from "../../../redux/reducers/users/getUser";
import { useNavigate } from "react-router-dom";
import { callDeleteUser } from "../../../redux/reducers/users/deleteUser";
const { confirm } = Modal;
export default function User() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  let dispatch = useDispatch();
  const listUser = useSelector((state) => state.getUser.listUser);
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(callGetListUser(" "));
    }, 1000);
  }, []);
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "User ID",
      dataIndex: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  let navigate = useNavigate();
  const err = () => {
    notification["error"]({
      message: "Notification !",
      description: "Error!",
    });
  };
  const errCreateProject = () => {
    notification["error"]({
      message: "Notification !",
      description: "This user created a project that cannot be deleted!",
    });
  };
  const openNotificationDeleteUserSuccess = () => {
    notification["success"]({
      message: "Notification !",
      description: "Delete user successfully !",
    });
  };
  const data = listUser.map((item, index) => {
    return {
      no: index,
      name: item.name,
      id: item.userId,
      email: item.email,
      phoneNumber: item.phoneNumber,
      action: [
        <div className="d-flex align-items-center">
          <EditOutlined
            style={{ fontSize: 20, color: "blue" }}
            onClick={() => {
              navigate(`editUser/${item.userId}`);
            }}
          />

          <DeleteOutlined
            style={{ fontSize: 20, color: "red", paddingLeft: "10px" }}
            onClick={() => {
              confirm({
                title: "Do you want delete this user ?",
                icon: <ExclamationCircleFilled />,
                okText: "Delete",
                okType: "danger",
                cancelType: "primary",
                onOk: async () => {
                  try {
                    const res = await dispatch(callDeleteUser(item.userId));
                    if (res.isDelete == true) {
                      openNotificationDeleteUserSuccess();
                    }
                    if (res.isCreateProject == true) {
                      errCreateProject();
                    }
                    dispatch(callGetListUser(" "));
                  } catch (error) {
                    err();
                  }
                },
                onCancel() {},
              });
            }}
          />
        </div>,
      ],
    };
  });
  const onChange = (pagination, filters, sorter, extra) => {};
  return (
    <main className="container py-6 fs-14">
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </main>
  );
}
