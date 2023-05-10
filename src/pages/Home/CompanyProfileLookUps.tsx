import { Grid } from "@mui/material";

import { useState } from "react";
import BannerCompany from "./companyProfileLookUps/BannerCompany";
import ItemPushUP from "./companyProfileLookUps/ItemPushUp";
import FilterItems from "../companyProfile/componant/FilterItems";
import { useLocation } from "react-router-dom";

export default function CompanyProfileLookUps() {
  const [filters, setFilters] = useState("");
  const location = useLocation();
  const handleSearchBarpro = (searchBar: string) => {
    setFilters(searchBar);
  };
  console.log(location.state.companyid);
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
