import React from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import CreateTask from "../CreateTask/CreateTask";
export default function ProjectSearch({ setSearchParams, keyWord, listProject, useState, dataUserLogin }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    };
    const showDrawer = () => {
        setOpen(true);
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <form>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={keyWord}
                            onChange={(event) => {
                                let { value } = event.target;
                                setSearchParams({ keyWord: value });
                            }}
                        />
                        <div className="input-group-btn">
                            <button className="btn btn-default">
                                <i className="glyphicon glyphicon-search" />
                            </button>
                        </div>
                    </div>
                </form>
                <div className="d-flex align-items-center justify-content-between gap-4">
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate("/createProject");
                        }}
                    >
                        Create Project
                    </Button>
                    <Button
                        type="primary"
                        onClick={showDrawer}
                    >
                        Create Task
                    </Button>
                </div>
            </div>
            {<CreateTask onClose={onClose} open={open} listProject={listProject} dataUserLogin={dataUserLogin} />}
        </>
    )
}
