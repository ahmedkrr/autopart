import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../../API";

type Car = {
  id: number;
  name: string;
  type: CarType[];
};

type CarType = {
  id: number;
  type: string;
  year: CarYear[];
};

type CarYear = {
  id: number;
  years: string;
};
type Categories = {
  id: number;
  categoryName: string;
  imageData: string;
};
type SubCategories = {
  subCategoryId: number;
  categoryId: number;
  subCategoryName: string;
  imageData: string;
};

export default function FilterItems() {
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

  const [categories, setcategoreylist] = useState<Categories[]>([]);
  const [subCategorylist, setsubCategorylist] = useState<SubCategories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Categories>();
  const [selectedsubCategory, setSelectedsubCategory] =
    useState<SubCategories>();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}lookups/GetCategory`);
      if (response.data) {
        setcategoreylist(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}lookups/GetSubCategory/${selectedCategory?.id}`
      );
      if (response.data) {
        setsubCategorylist(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSubCategory();
  }, [selectedCategory]);
  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   props.handleCarSelection(
  //     selectedCar?.id == undefined ? 0 : selectedCar?.id,
  //     selectedCarType?.id == undefined ? 0 : selectedCarType?.id,
  //     selectedCarYear?.id == undefined ? 0 : selectedCarYear?.id
  //   );
  // }, [, selectedCar?.id, selectedCarType?.id, selectedCarYear?.id]);

  return (
    <Grid container item xs={12} justifyContent="center">
      <FormControl sx={{ width: "15%" }} variant="outlined">
        <InputLabel id="Car Model" sx={{ color: "black", fontSize: 18 }}>
          Car Model
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
          labelId="Car Model"
          id="Car Model"
          label="Car Model"
          color="primary"
          sx={{ background: "white", color: "black", alignItems: "center" }}
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

      <FormControl sx={{ width: "13%", mx: "8px" }} variant="outlined">
        <InputLabel id="Type" sx={{ color: "black", fontSize: 18 }}>
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
          labelId="Type"
          id="Type"
          label="Type"
          sx={{ background: "white", color: "black" }}
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
      <FormControl sx={{ width: "10%", mx: "8px" }} variant="outlined">
        <InputLabel id="Year" sx={{ color: "black", fontSize: 18 }}>
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
          labelId="Year"
          id="Year"
          label="Year"
          sx={{ background: "white", color: "black" }}
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

      <FormControl variant="outlined" sx={{ width: "18%", mx: "8px" }}>
        <InputLabel id="Category" sx={{ color: "black", fontSize: 18 }}>
          Category
        </InputLabel>

        <Select
          required
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(
              categories.find(
                (category) => category.id == parseInt(`${e.target.value}`)
              )
            );
            console.log(
              categories.find(
                (category) => category.id == parseInt(`${e.target.value}`)
              )
            );
          }}
          labelId="Category"
          id="Category"
          label="Category"
          color="primary"
          sx={{ background: "white", color: "black", alignItems: "center" }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ width: "18%", mx: "8px" }}>
        <InputLabel id="dropdsown1-label" sx={{ color: "black", fontSize: 18 }}>
          Sub Category
        </InputLabel>

        <Select
          required
          value={selectedsubCategory?.subCategoryName}
          onChange={(e) => {
            setSelectedsubCategory(
              subCategorylist.find(
                (subcategory) =>
                  subcategory.subCategoryId == parseInt(`${e.target.value}`)
              )
            );
            console.log(
              subCategorylist.find(
                (subcategory) =>
                  subcategory.subCategoryId == parseInt(`${e.target.value}`)
              )
            );
          }}
          labelId="dropdown1-label"
          id="dropdown1"
          label="Sub Category"
          color="primary"
          sx={{
            background: "white",
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
          {subCategorylist.map((subcategory) => (
            <MenuItem
              key={subcategory.subCategoryId}
              value={subcategory.subCategoryId}
            >
              {subcategory.subCategoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
