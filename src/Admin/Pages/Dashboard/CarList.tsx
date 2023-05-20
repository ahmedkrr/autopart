import DeleteIcon from "@mui/icons-material/Delete";
import { AiFillEdit } from "react-icons/ai";
import AddIcon from "@mui/icons-material/Add";
import { useToggle } from "../../../common/hooks/useToggle";
import {
  Grid,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  Button,
  Paper,
  Fab,
} from "@mui/material";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../../API";
import axios from "axios";
import AddCarPopups from "../../componants/AddCarPopups";
import EditCarPopUps from "../../componants/EditCarPopUps";

type Cars = {
  id: number;
  name: string;
};
export default function CarList() {
  const [cars, setCars] = useState<Cars[]>([]);
  const [openAddCarPopUp, AddCarPopUpToggle] = useToggle();
  const [openEditCarPopup, EditCarPopUpToggle] = useToggle();

  const [selectedCar, setSelectedCar] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}admin/getlistofcars`);
      if (response.status) {
        setCars(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [openEditCarPopup, openAddCarPopUp]);
  const handleAddCategory = () => {
    AddCarPopUpToggle();
  };

  const handleUpdate = (userId: number) => {
    setSelectedCar(userId);
    EditCarPopUpToggle();
  };

  const handleDelete = async (id: number) => {
    try {
      const confirmed = window.confirm(
        ` Are you sure you want to delete this Car ID = ${id} ? `
      );

      if (confirmed) {
        const response = await axios.delete(
          `${API_ENDPOINT}admin/DeleteCar/${id}`
        );

        if (response.status == 200) {
          alert(`Car & Types & Years Deleted successfully!`);
          fetchData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography align="center" variant="h4">
          Cars List
        </Typography>
      </Grid>

      <Grid item xs={11}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ background: "rgb(64,78,103)" }}>
              <TableRow>
                <TableCell align="center" sx={{ color: "white" }}>
                  id
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Car Name
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Delete
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Update
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell align="center">{car.id}</TableCell>

                  <TableCell align="center">{car.name}</TableCell>

                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => handleDelete(car.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      style={{ backgroundColor: "green", color: "white" }}
                      variant="outlined"
                      startIcon={<AiFillEdit />}
                      onClick={() => handleUpdate(car.id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
        }}
        onClick={handleAddCategory}
      >
        <AddIcon />
      </Fab>

      <AddCarPopups open={openAddCarPopUp} togglePopUp={AddCarPopUpToggle} />
      {openEditCarPopup && (
        <EditCarPopUps
          open={openEditCarPopup}
          togglePopUp={EditCarPopUpToggle}
          carId={selectedCar}
        />
      )}
    </Grid>
  );
}
