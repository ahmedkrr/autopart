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
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../API";
import CarList from "../Pages/Dashboard/CarList";
type EditTypePopupsProps = {
  open: boolean;
  togglePopUp: () => void;
  typeId: number;
};

export default function EditTypePopups(props: EditTypePopupsProps) {
  const [typeName, setTypeName] = useState("");
  const { open, togglePopUp } = props;

  const getUserInfo = async () => {
    const response = await axios.get(
      `${API_ENDPOINT}admin/GetCarType/${props.typeId}`
    );
    if (response.status === 200) {
      setTypeName(response.data);
      console.log(response.data);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${API_ENDPOINT}admin/UpdateCarType/${props.typeId}/${typeName}`
      );
      if (response.status == 200) {
        window.alert("updated success");
        togglePopUp();
      }
    } catch {}
  };

  useEffect(() => {
    getUserInfo();
  }, [props.typeId]);

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
                value={typeName}
                onChange={(event) => {
                  setTypeName(event.target.value);
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
