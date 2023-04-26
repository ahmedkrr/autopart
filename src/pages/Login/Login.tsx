import { Box, Typography, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { ThemedTextField } from "../../common/components/themedTextField";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../API";

export const getToken = () => {
  return localStorage.getItem("token"); // retrieve the token from local storage
};

export function Login() {
  // let resbonseData: any;
  const navigate = useNavigate();
  function handleNavigation() {
    navigate("/");
  }

  interface formSignup {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
  }

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<formSignup>();

  const [isLoginPage, setLoginPage] = useState(true);
  const handlechange = () => {
    reset({ name: "", password: "", address: "", phoneNumber: "" });
    setLoginPage(!isLoginPage);
  };

  const onSubmit = async (data: formSignup) => {
    console.log(data);
    reset();
    const endpoint = isLoginPage ? "Account/login" : "Account/register";
    const postData = isLoginPage
      ? { email: data.email, password: data.password }
      : data;
    console.log(localStorage.getItem("token"));

    try {
      const response = await axios.post(`${API_ENDPOINT}${endpoint}`, postData);
      const responseData = response.data;
      console.log(responseData.message);
      if (endpoint == "Account/login" && responseData.sucess) {
        localStorage.setItem("token", responseData.message);
      }
      handleNavigation();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoginPage ? (
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
              Login
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

            <Box mt={2}>
              <Button onClick={handlechange}>Crate Account...?</Button>
            </Box>
          </Box>
        </form>
      ) : (
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
              Sign Up
            </Typography>
            <Divider variant="middle" style={{ width: "100%" }} />

            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <ThemedTextField
                    type={"text"}
                    label=" Enter Full Name"
                    id="filled-hidden-label-small"
                    {...field}
                  />
                );
              }}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <ThemedTextField
                    type={"email"}
                    label="Enter Email Address"
                    id="filled-hidden-label-small"
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
                    label="Enter Password"
                    id="filled-hidden-label-small"
                    // {...register("password", registerOptions.password)}
                    {...field}
                  />
                );
              }}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => {
                return (
                  <ThemedTextField
                    type={"phone"}
                    label="Enter Phone Number"
                    id="filled-hidden-label-small"
                    {...field}
                  />
                );
              }}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => {
                return (
                  <ThemedTextField
                    type={"text"}
                    label="Enter Address"
                    {...field}
                  />
                );
              }}
            />

            <Box mt={2}>
              <Button variant="contained" type="submit">
                Create account
              </Button>
            </Box>

            <Box mt={2}>
              <Button onClick={handlechange}>Sign In...?</Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
}
