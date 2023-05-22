import { Button, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { ThemedTextField } from "../../common/components/themedTextField/ThemedTextField";
import axios from "axios";
import { API_ENDPOINT } from "../../API";

export default function ResetPassword() {
  const [To, setEmail] = useState("");
  const [errorMessage, setErrormessage] = useState("");

  const handleSend = async () => {
    axios
      .post(`${API_ENDPOINT}Account/sendEmail`, {
        To: To,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("Check Your Link in the email");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data)
          setErrormessage(error.response.data);
      });
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
          <Typography variant="h4" textAlign={"center"} color="gray">
            <b>Reset Password</b>
          </Typography>
        </Grid>

        <Divider variant="middle" style={{ width: "100%" }} />

        <ThemedTextField
          type={"email"}
          label=" Enter your Email"
          id="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <Typography variant="body2" color={"error"}>
          {errorMessage}
        </Typography>

        <Grid mt={2}>
          <Button variant="contained" onClick={handleSend}>
            Send Email
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
