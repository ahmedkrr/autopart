import { Grid, Stack, Typography } from "@mui/material";
import BannerCompany from "./componant/BannerCompany";
import ItemPushUP from "./componant/ItemPushUP";

export default function Companyprofile() {
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
          mx="auto"
          justifyContent="center"
          sx={{ border: "1px solid gray", height: "70px" }}
        >
          <Grid item mt={2}></Grid>
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
          // spacingbe={1}
          sx={{}}
        >
          <ItemPushUP />
        </Grid>
      </Grid>
    </>
  );
}
