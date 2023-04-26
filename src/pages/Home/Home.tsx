import { Grid, Box, Typography } from "@mui/material";
import Dropdown from "./Dropdown";
import Category from "./Category";
import SubCategory from "./SubCategory";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategorey] = useState(0);

  const handleCategorySelectionProcess = (id: number) => {
    setSelectedCategorey(id);
  };
  return (
    <Box>
      <Typography align="center" variant="h3" sx={{ fontweight: 900 }}>
        Online CAR <b style={{ color: "blue" }}>Part</b>
      </Typography>
      <Typography align="center" variant="body2" sx={{ fontweight: 100 }}>
        See The Car World From One Place
      </Typography>
      <Grid sx={{}}>
        <Dropdown />
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" align="center">
          <b>SHOP BY CATEGORY</b>
        </Typography>
      </Box>

      <Category handleCategorySelection={handleCategorySelectionProcess} />
      {selectedCategory ? <SubCategory categoryId={selectedCategory} /> : null}
    </Box>
  );
}
