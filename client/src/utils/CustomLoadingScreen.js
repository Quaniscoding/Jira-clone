// CustomLoadingScreen.js
import React from "react";
import LoadingScreen from "react-loading-screen";
import { useLoading } from "./LoadingContext";

const CustomLoadingScreen = ({ children }) => {
  const { loading } = useLoading();

  return (
    <>
      {loading ? (
        <LoadingScreen
          loading={loading}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          text="Loading ..."
        />
      ) : (
        children
      )}
    </>
  );
};

export default CustomLoadingScreen;
