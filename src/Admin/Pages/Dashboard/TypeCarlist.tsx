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
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../../API";
import axios from "axios";
import AddCarTypePopUps from "../../componants/AddCarTypePopUps";
import EditTypePopUps from "../../componants/EditTypePopUps";

type Cars = {
  id: number;
  name: string;
};
type CarTypes = {
  id: number;
  type: string;
  carID: number;
};

export default function TypeCarList() {
  const [cars, setCar] = useState<Cars[]>([]);
  const [selectedCar, setSelectedCar] = useState("");
  const [cartypes, setcartype] = useState<CarTypes[]>([]);

  const [selectedType, setSelectedType] = useState(0);
  const [openAddTypePopUp, AddTypePopUpToggle] = useToggle();
  const [openEditTypePopUp, EditTypePopUpToggle] = useToggle();

  const handleAddCategory = () => {
    AddTypePopUpToggle();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}admin/getlistofcars`);
      if (response.status) {
        setCar(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCarTypes = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}admin/GetCarTypeList/${selectedCar}`
      );
      if (response.data) {
        setcartype(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchCarTypes();
  }, [selectedCar, openAddTypePopUp, openEditTypePopUp]);

  const handleUpdate = (id: number) => {
    setSelectedType(id);
    EditTypePopUpToggle();
  };

  const handleDelete = async (TypeId: number) => {
    try {
      const confirmed = window.confirm(
        ` Are you sure you want to delete this CarType ID = ${TypeId} ?`
      );

      if (confirmed) {
        const response = await axios.delete(
          `${API_ENDPOINT}admin/deleteType/${TypeId}`
        );

        if (response.status == 200) {
          alert(`Type & Years related Deleted successfully! `);
          fetchCarTypes();
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
          Car Types
        </Typography>
      </Grid>

      <Grid item xs={11} sx={{ pt: "10px", pb: "15px" }}>
        <FormControl fullWidth>
          <InputLabel id="Select Car Name">Select Car Name</InputLabel>
          <Select
            labelId="Select Car Name"
            id="Select Car Name"
            value={selectedCar}
            label="Select Car Name"
            onChange={(event) => setSelectedCar(event.target.value)}
          >
            {cars?.map((car) => (
              <MenuItem key={car.id} value={car.id}>
                {car.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
                  Car Name Id
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Car Type Name
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
              {cartypes.map((cartype) => (
                <TableRow key={cartype.id}>
                  <TableCell align="center">{cartype.id}</TableCell>

                  <TableCell align="center">{cartype.carID}</TableCell>
                  <TableCell align="center">{cartype.type}</TableCell>

                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => handleDelete(cartype.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      style={{ backgroundColor: "green", color: "white" }}
                      variant="outlined"
                      startIcon={<AiFillEdit />}
                      onClick={() => {
                        handleUpdate(cartype.id);
                      }}
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

      {selectedCar && (
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
      )}

      {openAddTypePopUp && (
        <AddCarTypePopUps
          open={openAddTypePopUp}
          togglePopUp={AddTypePopUpToggle}
          type={parseInt(selectedCar)}
        />
      )}

      {openEditTypePopUp && (
        <EditTypePopUps
          open={openEditTypePopUp}
          togglePopUp={EditTypePopUpToggle}
          typeId={selectedType}
        />
      )}
    </Grid>
  );
}
