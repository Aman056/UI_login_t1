import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "../components/Input";
import Button from "../components/Button";
import {
  validateName,
  validateUsername,
  validatePassword,
  validateConfirm,
  validateEmail,
  validatePhone,
} from "../utils/validation";

export default function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const errors = {
    name: validateName(values.name),
    username: validateUsername(values.username),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    password: validatePassword(values.password, values.username),
    confirm: validateConfirm(values.confirm, values.password),
  };

  const isValid = Object.values(errors).every((e) => e === "");

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      name: true,
      username: true,
      email: true,
      phone: true,
      password: true,
      confirm: true,
    });
    if (!isValid) return;

    const user = { ...values };
    localStorage.setItem("demo_user", JSON.stringify(user));
    navigate("/login", { replace: true, state: { justSignedUp: true } });
  }

  return (
    <main
      style={{
        backgroundColor: "#cbe2de",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px", // prevents cutoff on small screens
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#00695c",
            color: "white",
            padding: "12px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Create new Account</Typography>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate style={{ padding: "24px"}}>
          <Grid container spacing={2} style={{ display:'flex', justifyContent:"center" }}>
            <Grid item xs={12} sm={6}>
              <Input
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name ? errors.name : ""}
                autoComplete="name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username ? errors.username : ""}
                autoComplete="username"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : ""}
                autoComplete="email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="Phone No."
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone ? errors.phone : ""}
                autoComplete="tel"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="New Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? errors.password : ""}
                autoComplete="new-password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((s) => !s)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="Confirm New Password"
                name="confirm"
                type={showConfirm ? "text" : "password"}
                value={values.confirm}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirm ? errors.confirm : ""}
                autoComplete="new-password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirm((s) => !s)}
                        edge="end"
                      >
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Submit */}
          <div style={{ marginTop: 24 }}>
            <Button type="submit" fullWidth>
              Sign Up
            </Button>
          </div>

          {/* Footer */}
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#00695c", fontWeight: 500 }}>
              Log in
            </Link>
          </Typography>
        </form>
      </Paper>
    </main>
  );
}
