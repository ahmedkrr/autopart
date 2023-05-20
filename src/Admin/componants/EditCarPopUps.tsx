import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
  DialogTitle,
  Button,
} from "@mui/material";
import UserList from "../Pages/Dashboard/UserList";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../API";
import CarList from "../Pages/Dashboard/CarList";
type EditCarPopupsProps = {
  open: boolean;
  togglePopUp: () => void;
  carId: number;
};

export default function EdituserPopups(props: EditCarPopupsProps) {
  const [carName, setcarName] = useState("");
  const { open, togglePopUp } = props;

  const getUserInfo = async () => {
    const response = await axios.get(
      `${API_ENDPOINT}admin/GetCarName/${props.carId}`
    );
    if (response.status === 200) {
      setcarName(response.data);
      console.log(response.data);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${API_ENDPOINT}admin/UpdateCarName/${props.carId}/${carName}`
      );
      if (response.status == 200) {
        window.alert("updated success");
        togglePopUp();
        return <CarList />;
      }
    } catch {}
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
          Edit Car
        </DialogTitle>

        <DialogContent>
          <Grid container columnSpacing={3} justifyContent="center" mt={1}>
            <Grid item>
              <TextField
                type="text"
                value={carName}
                onChange={(event) => {
                  setcarName(event.target.value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              togglePopUp();
              return <CarList />;
            }}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            sx={{ background: "green" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
