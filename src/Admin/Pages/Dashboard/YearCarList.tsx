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
import AddCarYearPopups from "../../componants/AddCarYearPopups";
import EditCArYearPopups from "../../componants/EditCarYearPopUps";

type Cars = {
  id: number;
  name: string;
};
type CarTypes = {
  id: number;
  type: string;
  carID: number;
};

type CarYear = {
  id: number;
  typeId: string;
  years: string;
};

export default function SubCategory() {
  const [cars, setCars] = useState<Cars[]>([]);
  const [types, settypes] = useState<CarTypes[]>([]);
  const [years, setyears] = useState<CarYear[]>([]);

  const [selectedCar, setSelectedCar] = useState("");
  const [selectedcartype, setSelectedType] = useState("");
  const [selectedYear, setSelectedYear] = useState(0);
  const [openAddYearPopUp, AddYearPopUpToggle] = useToggle();
  const [openEditYearPopUp, EditYearPopUpToggle] = useToggle();

  const handleAddCategory = () => {
    AddYearPopUpToggle();
  };

  const fetchCars = async () => {
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
    fetchCars();
  }, []);

  const fetchCarTypes = async () => {
    console.log(selectedCar);
    try {
      const response = await axios.get(
        `${API_ENDPOINT}admin/GetCarTypeList/${selectedCar}`
      );
      if (response.data) {
        settypes(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarTypes();
  }, [selectedCar]);

  const fetchTypeYears = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}admin/GetListofCarYears/${selectedcartype}`
      );
      if (response.status) {
        setyears(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTypeYears();
  }, [selectedcartype, openAddYearPopUp, openEditYearPopUp]);

  const handleDelete = async (yearId: number) => {
    try {
      const confirmed = window.confirm(
        ` Are you sure you want to delete this Year ID = ${yearId} ?`
      );

      if (confirmed) {
        const response = await axios.delete(
          `${API_ENDPOINT}admin/deleteyear/${yearId}`
        );

        if (response.status == 200) {
          alert(`Year Deleted successfully! `);
          fetchTypeYears();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (yearId: number) => {
    setSelectedYear(yearId);
    EditYearPopUpToggle();
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography align="center" variant="h4">
          Car Manufacture Year
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ pt: "10px", pb: "15px", ml: "70px" }}
        justifyContent="center"
      >
        <FormControl sx={{ width: "40%", mx: "20px", ml: "42px" }}>
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

        <FormControl sx={{ width: "40%", mx: "80px", ml: "50px" }}>
          <InputLabel id="selecttype">Select Car Type</InputLabel>
          <Select
            labelId="selecttype"
            id="selecttype"
            value={selectedcartype}
            label="Select Car Type"
            onChange={(event) => setSelectedType(event.target.value)}
          >
            {types?.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.type}
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
                  Id
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Type Id
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Years
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
              {years.map((year) => (
                <TableRow key={year.id}>
                  <TableCell align="center">{year.id}</TableCell>
                  <TableCell align="center">{year.typeId}</TableCell>
                  <TableCell align="center">{year.years}</TableCell>

                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => handleDelete(year.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      style={{ backgroundColor: "green", color: "white" }}
                      variant="outlined"
                      startIcon={<AiFillEdit />}
                      onClick={() => handleUpdate(year.id)}
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

      {selectedcartype && (
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

      {openAddYearPopUp && (
        <AddCarYearPopups
          open={openAddYearPopUp}
          togglePopUp={AddYearPopUpToggle}
          typeId={parseInt(selectedcartype)}
        />
      )}

      {openEditYearPopUp && (
        <EditCArYearPopups
          open={openEditYearPopUp}
          togglePopUp={EditYearPopUpToggle}
          yearId={selectedYear}
        />
      )}
    </Grid>
  );
}
