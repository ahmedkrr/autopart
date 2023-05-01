import { Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import { useState } from "react";
import UserList from "./UserList";
import CarList from "./CarList";
import Categorylist from "./Categorylist";
import Itemslist from "./Itemslist";
import SubCategory from "./SubCategory";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  return (
    <Grid container m={0}>
      <Grid item xs={2} container sx={{ height: "100vh" }}>
        <Grid item xs={12}>
          <Sidebar setActiveComponent={setActiveComponent} />
        </Grid>
      </Grid>

      <Grid item xs={10}>
        {activeComponent === "Userlist" && <UserList />}
        {activeComponent === "Carlist" && <CarList />}
        {activeComponent === "Itemslist" && <Itemslist />}
        {activeComponent === "Categorylist" && <Categorylist />}
        {activeComponent === "Subcategory" && <SubCategory />}
      </Grid>
    </Grid>
  );
}
