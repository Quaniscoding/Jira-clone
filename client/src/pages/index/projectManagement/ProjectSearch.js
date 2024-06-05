import React from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
export default function ProjectSearch({ setSearchParams, keyWord }) {
    const navigate = useNavigate();

    return (
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
            <div>
                <Button
                    type="primary"
                    onClick={() => {
                        navigate("/createProject");
                    }}
                >
                    Create Project
                </Button>
            </div>
        </div>
    )
}
