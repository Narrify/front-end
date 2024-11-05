import React, { useEffect } from "react";
import { navigate } from "gatsby";

const withAuth = (Component) => {
  return (props) => {
    useEffect(() => {
      const token = localStorage.getItem("AuthToken");
      if (!token) {
        navigate("/login");
      }
    }, []);

    return <Component {...props} />;
  };
};

export default withAuth;
