import React, { useEffect, useState } from "react";
import { callGetProjectCategory } from "../../redux/reducers/projects/getProjectCategory";
import { callGetListProjectDetail } from "../../redux/reducers/projects/getProjectDetail";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, notification, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useParams, useNavigate } from "react-router-dom";
import { callUpdateProject } from "../../redux/reducers/projects/updateProject";
import "./css/main.css";

export default function EditProject() {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectCategory = useSelector(
    (state) => state.getProjectCategory.projectCategory
  );

  const projectCategoryName = useSelector(
    (state) => state.getProjectCategory.projectCategoryWithId
  );
  const listProjectDetail = useSelector(
    (state) => state.getProjectDetail.listProjectDetail
  );
  const openNotificationSuccess = () => {
    notification["success"]({
      message: "Notification !",
      description: "Update project successfully !",
    });
  };

  const openNotificationError = () => {
    notification["error"]({
      message: "Notification !",
      description: "Update project fail !",
    });
  };
  const categoryId = listProjectDetail[0]?.categoryId;
  useEffect(() => {
    setLoading(true);
    const fetchProjectDetails = () => {
      dispatch(callGetListProjectDetail(params.id));
      dispatch(callGetProjectCategory(categoryId));
      dispatch(callGetProjectCategory());
      setLoading(false);
    };
    fetchProjectDetails();
  }, [params.id, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id: listProjectDetail[0]?._id || "",
      creator: listProjectDetail[0]?.creator?._id || "",
      projectName: listProjectDetail[0]?.projectName || "",
      description: listProjectDetail[0]?.description || "",
      categoryId: listProjectDetail[0]?.projectCategory?._id || "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await dispatch(
        callUpdateProject(listProjectDetail[0]?._id, values)
      );
      setLoading(false);
      if (res.isUpdate) {
        openNotificationSuccess();
        navigate("/projectmanagement");
      } else {
        openNotificationError();
      }
    },
  });

  const handleChangeProjectCategory = (value) => {
    formik.setFieldValue("categoryId", value);
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <main className="container py-6">
          <div className="mx-auto" style={{ maxWidth: 980 }}>
            <div className="ant-breadcrumb mb-4">
              <span>
                <span className="ant-breadcrumb-link">
                  <a href="/projectmanagement">Projects/ </a>
                </span>
                <span className="ant-breadcrumb-separator">
                  <a href="">{formik.values.projectName}</a>
                </span>
                <span className="ant-breadcrumb-separator">/ </span>
              </span>
              <span>
                <span className="ant-breadcrumb-link text-black">
                  Project settings
                </span>
              </span>
            </div>
            <Form
              onSubmitCapture={formik.handleSubmit}
              layout="vertical"
              initialValues={{ remember: true }}
            >
              <Form.Item label="Project id">
                <Input
                  disabled
                  name="projectId"
                  value={formik.values._id}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item label="Project name" required>
                <Input
                  name="projectName"
                  value={formik.values.projectName}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item label="Description">
                <TextArea
                  name="description"
                  rows={8}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item label="Category">
                <Select
                  name="categoryId"
                  value={formik.values.categoryId}
                  defaultValue={projectCategoryName?.projectCategoryName}
                  onChange={handleChangeProjectCategory}
                >
                  {projectCategory.map((item) => (
                    <Select.Option key={item._id} value={item._id}>
                      {item.projectCategoryName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item className="d-flex">
                <Button type="primary" htmlType="submit">
                  Update project
                </Button>
              </Form.Item>
            </Form>
          </div>
        </main>
      )}
    </>
  );
}
