import { Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import { useState } from "react";
import UserList from "./UserList";
import CarList from "./CarList";
import Categorylist from "./Categorylist";
import Itemslist from "./Itemslist";
import SubCategory from "./SubCategory";
import TypeCarlist from "./TypeCarlist";
import YearCarList from "./YearCarList";
import Panel from "./Panel";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  return (
    <Grid container m={0} sx={{ backgroundColor: "RGBA(128, 128, 128, 0.1)" }}>
      <Grid item xs={2} container>
        <Grid item xs={12}>
          <Sidebar setActiveComponent={setActiveComponent} />
        </Grid>
      </Grid>

      <Grid item xs={10}>
        {activeComponent === "Panel" && <Panel />}
        {activeComponent === "Userlist" && <UserList />}
        {activeComponent === "Carlist" && <CarList />}
        {activeComponent === "Car Type" && <TypeCarlist />}
        {activeComponent === "Car Manufacture" && <YearCarList />}
        {activeComponent === "Itemslist" && <Itemslist />}
        {activeComponent === "Categorylist" && <Categorylist />}
        {activeComponent === "Subcategory" && <SubCategory />}
      </Grid>
    </Grid>
  );
}
