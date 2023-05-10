import { Box, Typography, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { ThemedTextField } from "../../common/components/themedTextField";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { API_ENDPOINT } from "../../API";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API_ENDPOINT } from "../../API";

interface Createcompany {
  Name: string;
  CompanyPhoneNumber: string;
  Address: string;
}

export default function CreateCompany() {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Createcompany>();
  const navigate = useNavigate();

  const handleOnsumbit = async (data: Createcompany) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${API_ENDPOINT}Account/addcompany`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status == 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnsumbit)}>
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
          Add Company
        </Typography>

        <Divider variant="middle" style={{ width: "100%" }} />

        <Controller
          name="Name"
          control={control}
          render={({ field }) => {
            return (
              <ThemedTextField
                type={"text"}
                label="Company Name"
                id="filled-hidden-label-small"
                {...field}
              />
            );
          }}
        />
        <Controller
          name="CompanyPhoneNumber"
          control={control}
          render={({ field }) => {
            return (
              <ThemedTextField
                type={"phone"}
                label="Phone Number"
                id="filled-hidden-label-small"
                {...field}
              />
            );
          }}
        />
        <Controller
          name="Address"
          control={control}
          render={({ field }) => {
            return (
              <ThemedTextField
                type={"text"}
                label="Address"
                id="filled-hidden-label-small"
                // {...register("password", registerOptions.password)}
                {...field}
              />
            );
          }}
        />
        <Box mt={2}>
          <Button variant="contained" type="submit">
            Add your company
          </Button>
        </Box>
      </Box>
    </form>
  );
}
