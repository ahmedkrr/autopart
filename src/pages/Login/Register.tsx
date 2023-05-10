import { Box, Typography, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { ThemedTextField } from "../../common/components/themedTextField";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../API";

type formSignup = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
};

export default function Register() {
  const navigate = useNavigate();
  const [errormessage, seterrormessage] = useState("");
  const { control, reset, handleSubmit } = useForm<formSignup>();

  const onSubmit = async (data: formSignup) => {
    console.log(data);
    try {
      console.log(data);
      const response = await axios.post(
        `${API_ENDPOINT}Account/register`,
        data
      );

      if (response.status == 200) {
        navigate("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          seterrormessage(error.response.data);
        } else {
          console.log("Axios error:", error);
        }
      } else {
        console.log("Unknown error:", error);
      }
    }
  };
  return (
    <>
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
          <Typography
            variant="h4"
            textAlign={"center"}
            padding={2}
            color="gray"
          >
            <b>Sign Up</b>
          </Typography>

          <Divider variant="middle" style={{ width: "100%" }} />

          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              return (
                <ThemedTextField
                  required
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
                  required
                  type={"email"}
                  label="Enter Email Address"
                  id="email"
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
                  required
                  type={"password"}
                  label="Enter Password"
                  id="password"
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
                  required
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
                  required
                  type={"text"}
                  label="Enter Address"
                  {...field}
                />
              );
            }}
          />
          <Typography variant="h6" color="error">
            {errormessage}
          </Typography>

          <Box mt={2}>
            <Button variant="contained" type="submit">
              Create account
            </Button>
          </Box>

          <Box mt={2}>
            <Button
              onClick={() => {
                reset();
                navigate("/login");
              }}
            >
              Sign In...?
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}
