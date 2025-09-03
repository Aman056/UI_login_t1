// src/components/Input.jsx
import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = true,
  autoComplete,
  InputProps,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  return (
    <TextField
      fullWidth = {false}
      variant="standard"
     
      sx={{ width: 250 }}
      label={label}
      name={name}
      type={isPasswordField && showPassword ? "text" : type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      error={Boolean(error)}
      helperText={error || " "}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        ...InputProps,
        ...(isPasswordField && {
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
        }),
      }}
    />
  );
}
