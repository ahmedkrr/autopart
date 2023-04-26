import React, { useState, useEffect } from "react";
import axios from "axios";
import photoHome from "../../static/photoHome.webp";
import { API_ENDPOINT } from "../../API";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from "@mui/material";
export default function Dropdown() {
  interface Car {
    id: number;
    name: string;
    type: CarType[];
  }

  interface CarType {
    id: number;
    type: string;
    year: CarYear[];
  }

  interface CarYear {
    id: number;
    years: string;
  }
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car>();
  const [selectedCarType, setSelectedCarType] = useState<CarType>();
  const [selectedCarYear, setSelectedCarYear] = useState<CarYear>();

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}admin/GetAllCars`)
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box
      sx={{
        backgroundImage: `url(${photoHome})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "black",
        backgroundSize: "cover",
        height: 300,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* First dropdown list */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="dropdown1-label" sx={{ color: "black", fontSize: 18 }}>
          CAR
        </InputLabel>

        <Select
          value={selectedCar?.id}
          onChange={(e) => {
            setSelectedCar(
              cars.find((car) => car.id == parseInt(`${e.target.value}`))
            );
            console.log(
              cars.find((car) => car.id == parseInt(`${e.target.value}`))
            );
          }}
          labelId="dropdown1-label"
          id="dropdown1"
          label="Dropdown 1"
          variant="standard"
          color="primary"
          sx={{ background: "#FFFFE0", color: "black", alignItems: "center" }}
        >
          <option value="">Select a car</option>
          {cars.map((car) => (
            <MenuItem key={car.id} value={car.id}>
              {car.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Second dropdown list */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="dropdown2-label" sx={{ color: "black", fontSize: 18 }}>
          Type
        </InputLabel>
        <Select
          onChange={(e) => {
            setSelectedCarType(
              selectedCar?.type?.find(
                (type) => type.id == parseInt(`${e.target.value}`)
              )
            );
          }}
          labelId="dropdown2-label"
          id="dropdown2"
          label="Dropdown 2"
          variant="standard"
          sx={{ background: "#FFFFE0", color: "black" }}
        >
          <option>Select Type</option>

          {selectedCar?.type?.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Third dropdown list */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="dropdown3-label" sx={{ color: "black", fontSize: 18 }}>
          Year
        </InputLabel>
        <Select
          onChange={(e) => {
            setSelectedCarYear(
              selectedCarType?.year?.find(
                (year) => year.id == parseInt(`${e.target.value}`)
              )
            );
          }}
          labelId="dropdown3-label"
          id="dropdown3"
          label="Dropdown 3"
          variant="standard"
          sx={{ background: "#FFFFE0", color: "black" }}
        >
          <option>Select Year</option>

          {selectedCarType?.year?.map((year) => (
            <MenuItem key={year.id} value={year.id}>
              {year.years}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Submit button */}
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ m: 1, width: "90px", height: "33px" }}
          onClick={(e) => {
            if (selectedCar == undefined) {
            }
            console.log(
              selectedCar?.id +
                " " +
                selectedCarType?.id +
                " " +
                selectedCarYear?.id
            );
          }}
        >
          Go
        </Button>
      </Box>
    </Box>
  );
}
