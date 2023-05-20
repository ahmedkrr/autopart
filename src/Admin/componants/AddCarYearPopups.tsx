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

interface AddCarYear {
  open: boolean;
  togglePopUp: () => void;
  typeId: number;
}

type TypeAdd = {
  caryear: string;
};
export default function AddCarYearPopups(props: AddCarYear) {
  const { open, togglePopUp } = props;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TypeAdd>();

  const onSubmit = async (data: TypeAdd) => {
    try {
      console.log(data);
      const response = await axios.post(
        `${API_ENDPOINT}admin/addcaryear/${props.typeId}`,
        {
          ...data,
          caryear: new Date(parseInt(data.caryear), 1, 1),
        }
      );

      console.log(response.data);
      if (response.status == 200) {
        togglePopUp();
        alert(`${data.caryear} added successfully!`);
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
          Add Car Year
        </DialogTitle>
        <Divider />

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container columnSpacing={3} justifyContent="center">
              <Grid item mt="10px">
                <TextField
                  type="text"
                  label="Year"
                  required
                  {...register("caryear", {
                    validate: (value) =>
                      /^\d{4}$/.test(value) || "Year must be a 4-digit number",
                  })}
                  error={Boolean(errors.caryear)}
                  helperText={errors.caryear?.message}
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
