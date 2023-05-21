import Stack from "@mui/material/Stack";
import { Box, Typography, Divider } from "@mui/material";
import { FaUsersCog } from "react-icons/fa";
import { BsFillFilePostFill } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { AiOutlineCar } from "react-icons/ai";
import { GiCarWheel } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FaSolarPanel } from "react-icons/fa";
interface SidebarProps {
  setActiveComponent: (component: string) => void;
}

export default function Sidebar({ setActiveComponent }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <Stack
      spacing={6}
      sx={{
        backgroundColor: "rgb(64,78,103)",
        height: "100%",
        border: "1px solid #ccc",
        bor: "1px solid #ccc",
      }}
      mr={0}
    >
      <Typography align="center" mt={4} mb={-2} variant="h5" color="white">
        <Box mr={2} display="inline-flex" color="white">
          <GiCarWheel onClick={() => navigate("/")} cursor="pointer" />
        </Box>
        <b>
          Auto <b>Part</b>
        </b>
      </Typography>

      <Divider />

      <Typography paddingLeft={4} color="white">
        <Box mr={2} display="inline-flex">
          <FaSolarPanel
            fontSize={30}
            cursor={"pointer"}
            onClick={() => setActiveComponent("Panel")}
          />
        </Box>
        Panel
      </Typography>

      <Typography paddingLeft={4} color="white">
        <Box mr={2} display="inline-flex">
          <FaUsersCog
            fontSize={30}
            cursor={"pointer"}
            onClick={() => setActiveComponent("Userlist")}
          />
        </Box>
        User List
      </Typography>

      {/* <Divider /> */}
      {/* 
      <Typography paddingLeft={4} color="white">
        <Box mr={2} display="inline-flex">
          <BsFillFilePostFill
            fontSize={30}
            cursor={"pointer"}
            onClick={() => setActiveComponent("Itemslist")}
          />
        </Box>
        Items List
      </Typography> */}

      {/* <Divider /> */}

      <Typography paddingLeft={4} color="white">
        <Box mr={2} display="inline-flex">
          <AiOutlineCar
            fontSize={30}
            cursor={"pointer"}
            onClick={() => setActiveComponent("Carlist")}
          />
        </Box>
        Car List
      </Typography>

      <Typography paddingLeft={4} color="white">
        <Box mr={2} display="inline-flex">
          <AiOutlineCar
            fontSize={30}
            cursor={"pointer"}
            onClick={() => setActiveComponent("Car Type")}
          />
        </Box>
        Car Type
      </Typography>

      <Typography paddingLeft={4} color="white">
        <Box mr={2} display="inline-flex">
          <AiOutlineCar
            fontSize={30}
            cursor={"pointer"}
            onClick={() => setActiveComponent("Car Manufacture")}
          />
        </Box>
        Car Manufacture
      </Typography>

      {/* <Divider /> */}

      <Typography paddingLeft={4} color="white">
        <Box mr={2} display="inline-flex">
          <MdCategory
            fontSize={30}
            cursor={"pointer"}
            onClick={() => setActiveComponent("Categorylist")}
          />
        </Box>
        Category List
      </Typography>

      <Typography paddingLeft={4} pb={3} color="white">
        <Box mr={2} display="inline-flex">
          <BiCategory
            fontSize={30}
            cursor={"pointer"}
            onClick={() => setActiveComponent("Subcategory")}
          />
        </Box>
        SubCategory
      </Typography>
    </Stack>
  );
}
