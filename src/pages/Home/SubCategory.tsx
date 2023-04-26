import { CircularProgress, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../API";
// import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

interface SubCategory {
  id: number;
  categoryId: number;
  subCategoryName: string;
  imageData: string;
}

type SubCategoryProps = {
  categoryId: number;
};

export default function SubCategory({ categoryId }: SubCategoryProps) {
  const [subcategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}lookups/GetSubCategory/${categoryId}`)
      .then((response) => {
        setSubCategories(response.data);
        setLoading(false);
        console.log(response.data);
      });
  }, [categoryId]);
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container maxWidth="90%" mt={4} mx="auto" justifyContent="center">
      {subcategories?.map((subcategory) => (
        <Grid key={subcategory.id} xs={2} item sx={{ m: 2 }} textAlign="center">
          <Button
            // onClick={() => }
            style={{ textDecoration: "none", color: "black" }}
          >
            <div>
              <img src={`data:image/jpeg;base64,${subcategory.imageData}`} />

              <b>{subcategory.subCategoryName}</b>
            </div>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
