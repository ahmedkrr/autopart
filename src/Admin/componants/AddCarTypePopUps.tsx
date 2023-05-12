import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
  DialogTitle,
  Divider,
} from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { API_ENDPOINT } from "../../API";
import { useForm } from "react-hook-form";

interface AddCarType {
  open: boolean;
  togglePopUp: () => void;
  type: number;
}

type TypeAdd = {
  CarType: string;
};
export default function AddCarTypePopUps(props: AddCarType) {
  const { open, togglePopUp } = props;

  const { handleSubmit, register, reset } = useForm<TypeAdd>();

  const onSubmit = async (data: TypeAdd) => {
    try {
      console.log(data);
      const response = await axios.post(
        `${API_ENDPOINT}admin/addCarType/${props.type}`,
        data
      );
      console.log(response.data);
      if (response.status == 200) {
        togglePopUp();
        alert(`${data.CarType} added successfully!`);
      }
    } catch (error) {
      console.log(error);
    }
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
          Add Car Type
        </DialogTitle>
        <Divider />

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container columnSpacing={3} justifyContent="center">
              <Grid item>
                <TextField
                  type="text"
                  label="Type"
                  {...register("CarType")}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                togglePopUp();
                reset();
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
