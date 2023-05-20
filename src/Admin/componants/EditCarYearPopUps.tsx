import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../API";
import CarList from "../Pages/Dashboard/CarList";
type EditYearPopupsProps = {
  open: boolean;
  togglePopUp: () => void;
  yearId: number;
};

export default function EditCArYearPopups(props: EditYearPopupsProps) {
  const [carYear, setcarYear] = useState("");
  const { open, togglePopUp } = props;
  const [error, setError] = useState("");
  const getUserInfo = async () => {
    const response = await axios.get(
      `${API_ENDPOINT}admin/GetCaryear/${props.yearId}`
    );
    if (response.status === 200) {
      setcarYear(response.data);
      console.log(response.data);
    }
  };

  const handleSubmit = async () => {
    try {
      const date = new Date(parseInt(carYear), 1, 1);
      const response = await axios.put(
        `${API_ENDPOINT}admin/UpdateCarYear/${props.yearId}`,
        date
      );
      if (response.status == 200) {
        window.alert("updated success");
        togglePopUp();
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
          Edit Year
        </DialogTitle>

        <DialogContent>
          <Grid container columnSpacing={3} justifyContent="center" mt={1}>
            <Grid item>
              <TextField
                type="text"
                defaultValue={carYear}
                onChange={(event) => {
                  const inputValue = event.target.value;
                  if (/^\d{4}$/.test(inputValue)) {
                    setcarYear(inputValue.toString());
                    setError("");
                  } else {
                    setError("Year must be a 4-digit number");
                  }
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" color="error">
                {error}
              </Typography>
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
