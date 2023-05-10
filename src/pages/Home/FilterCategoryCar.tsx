import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_ENDPOINT } from "../../API";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type SubCategorys = {
  subCategoryId: number;
  categoryId: number;
  subCategoryName: string;
  categoryName: string;
  imageData: string;
};

export default function FilterCategoryCar() {
  const location = useLocation();
  const [subcategories, setSubCategories] = useState<SubCategorys[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_ENDPOINT}lookups/GetAllSubCategory/`).then((response) => {
      setSubCategories(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  const subcategoriesByCategory = subcategories.reduce((acc, subcategory) => {
    const { categoryId, categoryName } = subcategory;
    if (!acc[categoryName]) {
      acc[categoryName] = { categoryId, categoryName, subcategories: [] };
    }
    acc[categoryName].subcategories.push(subcategory);
    return acc;
  }, {} as Record<string, { categoryId: number; categoryName: string; subcategories: SubCategorys[] }>);

  return (
    <Grid container maxWidth="90%" mt={4} mx="auto" justifyContent="center">
      {Object.values(subcategoriesByCategory).map((category) => (
        <Grid key={category.categoryId} item xs={12} sx={{ mb: 4 }}>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            {category.categoryName} Category
          </Typography>
          <Divider />

          <Grid container mt={2} justifyContent="center" spacing={2}>
            {category.subcategories.map((subcategory) => (
              <Grid
                key={subcategory.subCategoryId}
                xs={2}
                item
                sx={{ m: 2 }}
                textAlign="center"
              >
                <Button
                  onClick={() => {
                    navigate(`/CategorySelect/ItemsFilterByCar`, {
                      state: {
                        subcategoryId: subcategory.subCategoryId,
                        subcategoryName: subcategory.subCategoryName,
                        carId: location.state.carId,
                        typeId: location.state.typeId,
                        yearId: location.state.yearId,
                        carName: location.state.carName,
                        typename: location.state.typename,
                        yearname: location.state.yearname,
                      },
                    });
                  }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${subcategory.imageData}`}
                    />

                    <b>{subcategory.subCategoryName}</b>
                  </div>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
