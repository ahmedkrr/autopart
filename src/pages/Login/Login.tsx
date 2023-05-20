import { Box, Typography, Divider, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { ThemedTextField } from "../../common/components/themedTextField";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../API";
import { useState } from "react";
interface FormSignIn {
  email: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();
  const [messagefaield, setErrormessage] = useState("");

  const { control, handleSubmit } = useForm<FormSignIn>();

  const onSubmit = async (data: FormSignIn) => {
    axios
      .post(`${API_ENDPOINT}Account/login`, data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.message);
          navigate("/");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message;
          setErrormessage(errorMessage);
          console.log(errorMessage);
        }
      });
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
          <Grid container xs={12} justifyContent={"center"} mb={2}>
            <Typography variant="h4" textAlign={"center"} color="gray">
              <b>Login</b>
            </Typography>
          </Grid>

          <Divider variant="middle" style={{ width: "100%" }} />

          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <ThemedTextField
                  type={"email"}
                  label=" Enter your Email"
                  id="email"
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
                  id="password"
                  {...field}
                  // {...register("password", { required: true, minLength: 8 })}
                />
              );
            }}
          />
          <Grid>
            <Button
              sx={{ ml: "170px" }}
              size="small"
              onClick={() => {
                navigate("/resetpassword");
              }}
            >
              Forget Password
            </Button>
          </Grid>

          <Typography variant="h6" color={"error"} mt={1}>
            {messagefaield}
          </Typography>

          <Box mb={1}>
            <Button variant="contained" type="submit" sx={{ width: "130px" }}>
              Login
            </Button>
          </Box>

          <Box>
            <Button
              onClick={() => {
                navigate("/register");
              }}
            >
              Create Account...?
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}
