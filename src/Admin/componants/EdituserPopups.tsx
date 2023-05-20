import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Grid,
  DialogTitle,
  Button,
} from "@mui/material";
import UserList from "../Pages/Dashboard/UserList";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../API";
import { useForm } from "react-hook-form";
type EdituserPopupsProps = {
  open: boolean;
  togglePopUp: () => void;
  userId: number;
};

export default function EdituserPopups(props: EdituserPopupsProps) {
  const { open, togglePopUp } = props;
  const { handleSubmit } = useForm();
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [isadmin, setisadmin] = useState(false);
  const [isdeactive, setisdeactive] = useState(false);

  const getUserInfo = async () => {
    const response = await axios.get(
      `${API_ENDPOINT}admin/GetUser/${props.userId}`
    );
    if (response.status === 200) {
      const { email, name, isAdmin, isDeactive } = response.data;
      setemail(email);
      setname(name);
      setisadmin(isAdmin);
      setisdeactive(isDeactive);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [props.userId]);

  const handleSubmitChange = async () => {
    console.log(name);
    console.log(email);
    console.log(isadmin);
    console.log(isdeactive);

    try {
      const response = await axios.put(
        `${API_ENDPOINT}admin/updateuser/${props.userId}`,
        { name, email, isadmin, isdeactive }
      );
      if (response.status == 200) {
        alert("user updated success");
        togglePopUp();
      }
    } catch {}
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle align="center" fontSize={30}>
          Edit User
        </DialogTitle>

        <form onSubmit={handleSubmit(handleSubmitChange)}>
          <DialogContent>
            <Grid container columnSpacing={3} justifyContent="center" mt={1}>
              <Grid item>
                <TextField
                  value={name}
                  type="text"
                  label="Name"
                  onChange={(event) => {
                    setname(event.target.value);
                  }}
                  // {...register("name")}
                />
              </Grid>

              <Grid item>
                <TextField
                  value={email}
                  type="email"
                  label="email"
                  onChange={(event) => {
                    setemail(event.target.value);
                  }}
                />
              </Grid>
            </Grid>

            <Grid container columnSpacing={3} maxWidth="470px" mt={3} mx="auto">
              <Grid item xs={6}>
                <FormControl disabled={props.userId == 1}>
                  <FormLabel id="is-Admin">Is Admin</FormLabel>
                  <RadioGroup
                    value={isadmin}
                    row
                    aria-labelledby="is-Admin"
                    onChange={(event) => {
                      setisadmin(event.target.value.toLowerCase() === "true");
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="YES"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="NO"
                      // {...register("isAdmin")}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl disabled={props.userId == 1}>
                  <FormLabel id="is-Deactive">Is Deactive</FormLabel>
                  <RadioGroup
                    value={isdeactive}
                    row
                    aria-labelledby="is-Deactive"
                    onChange={(event) => {
                      setisdeactive(
                        event.target.value.toLowerCase() === "true"
                      );
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="NO"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* <Grid item xs={6}>
              <FormControl>
                <FormLabel id="Role">Role</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="Role"
                  name="radio-buttons-group-Role"
                >
                  <FormControlLabel
                    value="Admin"
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="Member"
                    control={<Radio />}
                    label="Member"
                  />
                </RadioGroup>
              </FormControl>
            </Grid> */}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                togglePopUp();
                return <UserList />;
              }}
            >
              Cancle
            </Button>
            <Button
              variant="contained"
              sx={{ background: "green" }}
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
