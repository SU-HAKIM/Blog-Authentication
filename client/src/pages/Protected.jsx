import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Protected = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    async function validateUser() {
      let counterfeit = await axios.post("/auth/validate", {
        token: user.token,
        email: user.email,
      });
      if (counterfeit.data.counterfeit) {
        navigate("/login");
      }
    }
    validateUser();
  }, [navigate]);

  return <div className="container center">Protected</div>;
};

export default Protected;
