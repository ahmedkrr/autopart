import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../API";
import { useForm } from "react-hook-form";
interface Addcategory {
  open: boolean;
  togglePopUp: () => void;
}

type CarAdd = {
  CarName: string;
  CarType: string;
  CarYear: string;
};
export default function AddCarPopups(props: Addcategory) {
  const { open, togglePopUp } = props;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CarAdd>();

  const onSubmit = async (data: CarAdd) => {
    // if(photofile!=null && categoryname!= null)
    try {
      console.log(data);
      const response = await axios.post(`${API_ENDPOINT}admin/addCar`, {
        ...data,
        CarYear: new Date(parseInt(data.CarYear), 1, 1),
      });
      console.log(response.data);
      if (response.status == 200) {
        togglePopUp();
        alert(`${data.CarName} added successfully!`);
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
          Add Car
        </DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container columnSpacing={3} justifyContent="center">
              <Grid item>
                <TextField
                  type="text"
                  label="Name"
                  required
                  {...register("CarName")}
                />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  label="Type"
                  {...register("CarType")}
                  required
                />
              </Grid>
              <Grid item mt="10px">
                <TextField
                  type="text"
                  label="Year"
                  required
                  {...register("CarYear", {
                    validate: (value) =>
                      /^\d{4}$/.test(value) || "Year must be a 4-digit number",
                  })}
                  error={Boolean(errors.CarYear)}
                  helperText={errors.CarYear?.message}
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
