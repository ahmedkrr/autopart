import { CircularProgress, Divider, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../../API";
// import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SubCategorys {
  subCategoryId: number;
  categoryId: number;
  subCategoryName: string;
  imageData: string;
}

type SubCategoryProps = {
  categoryId: number;
  categoryname: string;
};

export default function SubCategory({
  categoryId,
  categoryname,
}: SubCategoryProps) {
  const [subcategories, setSubCategories] = useState<SubCategorys[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}lookups/GetSubCategory/${categoryId}`)
      .then((response) => {
        setSubCategories(response.data);
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container maxWidth="90%" mt={4} mx="auto" justifyContent="center">
      <Grid item xs={12}>
        <Divider />
        <Typography textAlign="center" variant="h4" mt={2} mb={2}>
          {categoryname} Sub Category
        </Typography>
      </Grid>

      {subcategories?.map((subcategory) => (
        <Grid
          key={subcategory.subCategoryId}
          xs={2}
          item
          sx={{ m: 2 }}
          textAlign="center"
        >
          <Button
            onClick={() => {
              navigate(`/itemsFilter`, {
                state: {
                  id: subcategory.subCategoryId,
                  name: subcategory.subCategoryName,
                },
              });
            }}
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
