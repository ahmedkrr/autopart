import { Box, Typography, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { ThemedTextField } from "../../common/components/themedTextField";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../API";

export default function AdminLogin() {
  interface Signin {
    email: string;
    password: Date;
  }
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Signin>();
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (data: Signin) => {
    console.log(data);

    try {
      const response = await axios.post(
        `${API_ENDPOINT}admin/adminlogin`,
        data
      );
      const responseData = response.data;
      console.log(responseData.message);
      console.log(responseData.success);
      console.log(responseData);
      if (!responseData.success) {
        setLoginStatus(
          "Login failed. Please check your email and password and try again."
        );
      } else if (responseData.success) {
        localStorage.setItem("token", responseData.message);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        flexDirection={"column"}
        maxWidth={400}
        alignItems="Center"
        justifyContent="Center"
        margin="auto"
        marginTop={3}
        padding={3}
        borderRadius={5}
        boxShadow={"5px 5px 10px 10px #ccc"}
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <Typography variant="h4" textAlign={"center"} padding={2}>
          Admin Login
        </Typography>
        <Divider variant="middle" style={{ width: "100%" }} />

        <Controller
          name="email"
          control={control}
          render={({ field }) => {
            return (
              <ThemedTextField
                type={"email"}
                label=" Enter your Email"
                id="filled-hidden-label-small"
                autoComplete="off"
                // {...register("name", registerOptions.email)}
                {...field}
              />
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            return (
              <ThemedTextField
                type={"password"}
                label="Enter your Password"
                id="filled-hidden-label-password"
                autoComplete="off"
                {...field}
                // {...register("password", { required: true, minLength: 8 })}
              />
            );
          }}
        />
        <Box mt={2}>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
        {loginStatus && (
          <Typography align="center" color="error">
            {loginStatus}
          </Typography>
        )}
      </Box>
    </form>
  );
}
