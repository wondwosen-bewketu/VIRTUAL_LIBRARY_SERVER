import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../../redux/slice/userSlice";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Auth.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const resultAction = await dispatch(
        loginUserAsync({ phoneNumber, password })
      );
      const user = resultAction.payload; // Assuming the payload contains the user data
      if (user && user.role) {
        if (user.role === "Admin") {
          navigate("/uploadbook");
        } else if (user.role === "User") {
          navigate("/userpage");
        } else {
          navigate("/");
        }
        toast.success("Login successful");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      style={{ marginTop: "2rem", padding: "2rem" }}
    >
      <Paper
        elevation={3}
        className="authForm"
        style={{ padding: "2rem", backgroundColor: "#fff" }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            xl={6}
            className="logoContainer"
            style={{ textAlign: "center" }}
          >
            <img src="./logo.svg" alt="Logo" style={{ maxWidth: "100%" }} />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Typography
              variant="h4"
              gutterBottom
              style={{
                fontFamily: "cursive",
                fontSize: "2.5rem",
                color: "#333",
                marginBottom: "1rem",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              Welcome To Virtual Library
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#d7a022",
                color: "#000",
                padding: "1rem",
                marginTop: "1rem",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default Login;
