import Stack from "@mui/material/Stack";
import { Grid, Box, Typography, Divider } from "@mui/material";
import { FaUsersCog } from "react-icons/fa";
import { BsFillFilePostFill } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { AiOutlineCar } from "react-icons/ai";
import { GiCarWheel } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";

interface SidebarProps {
  setActiveComponent: (component: string) => void;
}

export default function Sidebar({ setActiveComponent }: SidebarProps) {
  // function handleonclick() {
  //   <UserList />;
  // }
  return (
    <Stack
      spacing={6}
      sx={{
        backgroundColor: "greys",
        height: "100%",
        // width: "200px",
        border: "1px solid #ccc",
        bor: "1px solid #ccc",
      }}
      mr={0}
    >
      <Typography align="center" mt={2} variant="h5">
        <Box mr={2} display="inline-flex">
          <GiCarWheel />
        </Box>
        <b>
          Auto <b style={{ color: "blue" }}>Part</b>
        </b>
        <Divider />
      </Typography>

      <Typography paddingLeft={4}>
        <Box mr={2} display="inline-flex">
          <FaUsersCog
            fontSize={30}
            onClick={() => setActiveComponent("Userlist")}
          />
        </Box>
        User List
      </Typography>

      {/* <Divider /> */}

      <Typography paddingLeft={4}>
        <Box mr={2} display="inline-flex">
          <BsFillFilePostFill
            fontSize={30}
            onClick={() => setActiveComponent("Itemslist")}
          />
        </Box>
        Items List
      </Typography>

      {/* <Divider /> */}

      <Typography paddingLeft={4}>
        <Box mr={2} display="inline-flex">
          <AiOutlineCar
            fontSize={30}
            onClick={() => setActiveComponent("Carlist")}
          />
        </Box>
        Car List
      </Typography>

      {/* <Divider /> */}

      <Typography paddingLeft={4}>
        <Box mr={2} display="inline-flex">
          <MdCategory
            fontSize={30}
            onClick={() => setActiveComponent("Categorylist")}
          />
        </Box>
        Category List
      </Typography>

      <Typography paddingLeft={4}>
        <Box mr={2} display="inline-flex">
          <BiCategory
            fontSize={30}
            onClick={() => setActiveComponent("Subcategory")}
          />
        </Box>
        SubCategory
      </Typography>
    </Stack>
  );
}
