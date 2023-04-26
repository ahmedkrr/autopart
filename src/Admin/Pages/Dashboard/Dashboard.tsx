import { Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import { useState } from "react";
import UserList from "./UserList";
import CarList from "./CarList";
import Categorylist from "./Categorylist";
import Itemslist from "./Itemslist";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  return (
    //
    //mt={4} mx="auto" justifyContent="center"
    <Grid container m={0}>
      <Sidebar setActiveComponent={setActiveComponent} />

      {activeComponent === "Userlist" && <UserList />}
      {activeComponent === "Carlist" && <CarList />}
      {activeComponent === "Itemslist" && <Itemslist />}
      {activeComponent === "Categorylist" && <Categorylist />}
    </Grid>
  );
}
