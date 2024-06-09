import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
export default function Error500() {
  let navigate = useNavigate();
  return (
    <div>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to home
          </Button>
        }
      />
    </div>
  );
}
