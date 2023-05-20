import { Button, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { ThemedTextField } from "../../common/components/themedTextField/ThemedTextField";
import axios from "axios";
import { API_ENDPOINT } from "../../API";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound } from "../../NotAuthorized";

export default function NewPassword() {
  const [password, SetPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { guid } = useParams();
  const navigate = useNavigate();

  const handleSend = async () => {
    if (password == confirmpassword) {
      try {
        console.log(guid);
        const response = await axios.post(
          `${API_ENDPOINT}Account/resetpassword/${guid}`,
          {
            password,
          }
        );

        if (response.status == 200) {
          alert("The Password Changed Successfully");
          navigate("/login");
        }
      } catch {
        return <NotFound />;
      }
    } else {
      setPasswordError("Passwords do not match");
    }
  };

  return (
    <>
      <Grid
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
        <Grid item container xs={12} justifyContent={"center"} mb={2}>
          <Typography variant="h5" textAlign={"center"} color="gray">
            <b>Enter New Password</b>
          </Typography>
        </Grid>

        <Divider variant="middle" style={{ width: "100%" }} />

        <ThemedTextField
          type="password"
          label="New Password"
          value={password}
          onChange={(event) => {
            SetPassword(event.target.value);
          }}
        />
        <ThemedTextField
          type="password"
          label="Confirm New Password"
          value={confirmpassword}
          onChange={(event) => {
            setconfirmpassword(event.target.value);
          }}
        />
        <Typography variant="body1" color={"error"}>
          {passwordError}
        </Typography>

        <Grid mt={2}>
          <Button variant="contained" onClick={handleSend}>
            Confirm
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
