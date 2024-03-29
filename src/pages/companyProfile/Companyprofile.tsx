import { Grid } from "@mui/material";
import BannerCompany from "./componant/BannerCompany";
import ItemPushUP from "./componant/ItemPushUP";
import FilterItems from "./componant/FilterItems";
import { useState } from "react";

export default function Companyprofile() {
  const [filters, setFilters] = useState("");

  const handleSearchBarpro = (searchBar: string) => {
    setFilters(searchBar);
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <BannerCompany />
        </Grid>

        <Grid
          container
          item
          xs={12}
          mt={2}
          mx="30px"
          justifyContent="center"
          sx={{ height: "80px" }}
          // border: "1px solid rgb(220,220,220,.4)",
        >
          <Grid container item alignItems="center" xs={12}>
            <FilterItems handleSearchBar={handleSearchBarpro} />
          </Grid>
        </Grid>
        {/* //here i need to push item by filterin  once by cars and once by category  */}

        <Grid
          container
          columnSpacing={4}
          rowSpacing={1}
          xs={12}
          mt={2}
          mx="auto"
          py={3}
          pr={3}
          sx={{}}
        >
          <ItemPushUP searchBar={filters} />
        </Grid>
      </Grid>
    </>
  );
}
