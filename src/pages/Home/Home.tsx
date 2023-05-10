import { Grid, Box, Typography } from "@mui/material";
import Dropdown from "./HomeComponant/Dropdown";
import Category from "./HomeComponant/Category";
import SubCategory from "./HomeComponant/SubCategory";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategorey] = useState(0);
  const [Categoryname, setCategoryname] = useState("");

  const handleCategorySelectionProcess = (id: number, categoryName: string) => {
    setSelectedCategorey(id);
    setCategoryname(categoryName);
  };
  return (
    <Box>
      <Typography align="center" variant="h3" sx={{ fontweight: 1000, m: 1 }}>
        𝑶𝒏𝒍𝒊𝒏𝒆 𝑪𝒂𝒓 <b style={{ color: "gray" }}>𝑷𝒂𝒓𝒕</b>
      </Typography>

      <Grid sx={{}} mt="4px">
        <Dropdown />
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" align="center">
          <b>𝑺𝑯𝑶𝑷 𝑩𝒀 𝑪𝑨𝑻𝑬𝑮𝑶𝑹𝒀</b>
        </Typography>
      </Box>

      <Category handleCategorySelection={handleCategorySelectionProcess} />

      {selectedCategory ? (
        <SubCategory
          categoryId={selectedCategory}
          categoryname={Categoryname}
        />
      ) : null}
    </Box>
  );
}
