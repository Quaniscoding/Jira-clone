// LoadingBarHandler.js
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useLoading } from "./LoadingContext";

const LoadingBarHandler = () => {
  const loadingBarRef = useRef(null);
  const { loading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    if (loading) {
      loadingBarRef.current.continuousStart();
    } else {
      loadingBarRef.current.complete();
    }
  }, [loading]);

  useEffect(() => {
    loadingBarRef.current.continuousStart();
    setTimeout(() => {
      loadingBarRef.current.complete();
    }, 1000);
  }, [location]);

  return <LoadingBar color="blue" ref={loadingBarRef} />;
};

export default LoadingBarHandler;
