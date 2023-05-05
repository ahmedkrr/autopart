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
  Grid,
  Typography,
} from "@mui/material";
import { set } from "react-hook-form";
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
      <Grid
        sx={{ background: "rgba(52,52,52,.4)" }}
        xs={5.5}
        container
        justifyContent="center"
      >
        <Grid item xs={12} textAlign="center">
          <Typography
            variant="h4"
            sx={{ background: "rgba(52,52,52,.4)", color: "white" }}
          >
            𝑺𝒆𝒍𝒆𝒄𝒕 𝒀𝒐𝒖𝒓 𝑪𝒂𝒓
          </Typography>
        </Grid>

        {/* First dropdown list */}
        <Grid item xs={12} justifyContent="center">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="CAR" sx={{ color: "white", fontSize: 18 }}>
              CAR
            </InputLabel>

            <Select
              style={{
                background: "rgba(52,52,52,.9)",
                color: "white",
                textAlign: "center",
              }}
              value={selectedCar?.id}
              onChange={(e) => {
                setSelectedCar(
                  cars.find((car) => car.id == parseInt(`${e.target.value}`))
                );
                console.log(
                  cars.find((car) => car.id == parseInt(`${e.target.value}`))
                );
              }}
              required
              labelId="CAR"
              id="CAR"
              label="CAR"
              variant="standard"
              color="info"
              sx={{
                background: "#FFFFE0",
                color: "black",
                alignItems: "center",
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              {cars.map((car) => (
                <MenuItem key={car.id} value={car.id}>
                  {car.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Second dropdown list */}
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="Type" sx={{ color: "white", fontSize: 18 }}>
              Type
            </InputLabel>
            <Select
              style={{
                background: "rgba(52,52,52,.9)",
                color: "white",
                textAlign: "center",
              }}
              onChange={(e) => {
                setSelectedCarType(
                  selectedCar?.type?.find(
                    (type) => type.id == parseInt(`${e.target.value}`)
                  )
                );
              }}
              required
              labelId="Type"
              id="Type"
              label="Type"
              variant="standard"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              {selectedCar?.type?.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Third dropdown list */}
          <FormControl sx={{ m: 1, minWidth: 120, height: "33px" }}>
            <InputLabel id="Year" sx={{ color: "white", fontSize: 18 }}>
              Year
            </InputLabel>
            <Select
              style={{
                background: "rgba(52,52,52,.9)",
                color: "white",
                textAlign: "center",
              }}
              onChange={(e) => {
                setSelectedCarYear(
                  selectedCarType?.year?.find(
                    (year) => year.id == parseInt(`${e.target.value}`)
                  )
                );
              }}
              required
              labelId="Year"
              id="Year"
              label="Year"
              variant="standard"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              {selectedCarType?.year?.map((year) => (
                <MenuItem key={year.id} value={year.id}>
                  {year.years}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            color="primary"
            variant="contained"
            sx={{
              width: "90px",
              height: "33px",
              mt: "22px",
              background: "rgba(52,52,52,.9)",
            }}
            onClick={() => {
              setSelectedCar(undefined);
              setSelectedCarType(undefined);
              setSelectedCarYear(undefined);
            }}
          >
            Reset
          </Button>

          <Button
            disabled={!selectedCarYear}
            variant="contained"
            sx={{
              width: "90px",
              height: "33px",
              mt: "22px",
              ml: "10px",
              background: "rgba(52,52,52,.9)",
            }}
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
        </Grid>
      </Grid>
    </Box>
  );
}
