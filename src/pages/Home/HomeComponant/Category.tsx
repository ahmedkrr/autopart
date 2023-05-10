import { CircularProgress, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../../API";
// import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

interface Category {
  id: number;
  categoryName: string;
  imageData: string;
  subCategories: string;
}
type CategoryProps = {
  handleCategorySelection: (id: number, categoryName: string) => void;
};

export default function Category({ handleCategorySelection }: CategoryProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${API_ENDPOINT}lookups/GetCategory`).then((response) => {
      setCategories(response.data);
      setLoading(false);
      console.log(response.data);
    });
  }, []);
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container maxWidth="65%" mt={4} mx="auto" justifyContent="center">
      {categories?.map((category) => (
        <Grid key={category.id} xs={2} item sx={{ m: 2 }} textAlign="center">
          <Button
            onClick={() => {
              console.log(category.id);
              handleCategorySelection(category.id, category.categoryName);
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div>
              <img src={`data:image/jpeg;base64,${category.imageData}`} />

              <b>{category.categoryName}</b>
            </div>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
