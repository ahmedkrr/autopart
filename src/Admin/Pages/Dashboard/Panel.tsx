import { useState, useEffect } from "react";
import axios from "axios";
import { Divider, Grid, Typography } from "@mui/material";
import { API_ENDPOINT } from "../../../API";

interface PanelInfo {
  users: number;
  companies: number;
  items: number;
  car: number;
  type: number;
  category: number;
  subCategory: number;
  admin: number;
}

interface CategoryCardProps {
  category: string;
  count: number;
}

export default function Panel() {
  const [infoPanel, setInfoPanel] = useState<PanelInfo>({
    users: 0,
    companies: 0,
    items: 0,
    car: 0,
    type: 0,
    category: 0,
    subCategory: 0,
    admin: 0,
  });

  async function fetchData() {
    try {
      const response = await axios.get(`${API_ENDPOINT}admin/GetPanelInfo`);
      if (response.status === 200) {
        setInfoPanel(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container>
      <CategoryCard category="Admin" count={infoPanel.admin} />
      <CategoryCard category="Users" count={infoPanel.users} />
      <CategoryCard category="Companies" count={infoPanel.companies} />
      <CategoryCard category="Items" count={infoPanel.items} />
      <CategoryCard category="Cars" count={infoPanel.car} />
      <CategoryCard category="Car Types" count={infoPanel.type} />
      <CategoryCard category="Categories" count={infoPanel.category} />
      <CategoryCard category="Subcategories" count={infoPanel.subCategory} />
    </Grid>
  );
}

function CategoryCard(props: CategoryCardProps) {
  return (
    <Grid
      item
      mt={2}
      ml="auto"
      sx={{
        height: "180px",
        width: "250px",
        background: "rgb(64,78,103)",
        borderRadius: "25px",
      }}
    >
      <Grid item textAlign="center" mt={3}>
        <Typography color="white" variant="h4" mb={1}>
          {props.category}
        </Typography>
        <Divider sx={{ background: "white" }} />
        <Typography color="white" variant="h3" mt={2}>
          {props.count}
        </Typography>
      </Grid>
    </Grid>
  );
}
