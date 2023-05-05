import {
  Grid,
  Avatar,
  Box,
  Button,
  Skeleton,
  IconButton,
  Typography,
  Fab,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../../API";
import defaultbackground from "../../../static/defaultbackground.jpg";
import { companyowner } from "../../../common/utils/helpers";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useToggle } from "../../../common/hooks/useToggle";
import Additem from "./Additem";

type CompanyInfo = {
  id: number;
  name: string;
  address: string;
  companyPhoneNumber: number;
  creatDate: string;
  avatar: string;
  backgroundImage: string;
  isDeactive: boolean;
};

export default function BannerCompany() {
  const comapnyId = companyowner();
  const [companyinfo, setcompanyinfo] = useState<CompanyInfo>();
  const [showEdit, setShowEdit] = useState(false);
  const [openAddCategoreyPopUp, AddCategoryPopUpToggle] = useToggle();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}lookups/getCompanyInfo/${comapnyId}`
      );
      if (response.data) {
        setcompanyinfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChangeavatar = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.files);

    if (event.target.files) {
      try {
        const formData = new FormData();
        formData.append(
          "file",
          event.target.files[0] != null ? event.target.files[0] : ""
        );
        console.log(formData);

        axios
          .post(
            `${API_ENDPOINT}Account/AddAvatarCompany/${comapnyId}`,
            formData
          )
          .then(() => {
            fetchData();
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      try {
        const formData = new FormData();
        formData.append(
          "file",
          event.target.files[0] != null ? event.target.files[0] : ""
        );
        console.log(formData);

        axios
          .post(
            `${API_ENDPOINT}Account/AddBackgoundImage/${comapnyId}`,
            formData
          )
          .then(() => {
            fetchData();
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleMouseEnter = () => {
    setShowEdit(true);
  };

  const handleMouseLeave = () => {
    setShowEdit(false);
  };
  const handleAddItem = () => {
    // Handle the update operation here
    AddCategoryPopUpToggle();
  };
  return (
    <Grid
      item
      container
      xs={12}
      height="360px"
      mt="7px"
      style={{ borderBottom: "1px solid gray" }}
    >
      {companyinfo ? (
        <Grid
          item
          position="relative"
          xs={12}
          height="250px"
          style={{ borderBottom: "2px solid black" }}
        >
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={
              companyinfo?.backgroundImage
                ? `data:image/jpeg;base64,${companyinfo?.backgroundImage}`
                : defaultbackground
            }
          />
          <Box
            position="absolute"
            sx={{
              right: 0,
              bottom: 0,
            }}
          >
            <Button
              sx={{ color: "white", textTransform: "capitalize" }}
              component="label"
            >
              Edit
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(event) => {
                  handleFileChange(event);
                }}
              />
            </Button>
          </Box>

          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              position: "relative",
              width: "100px",
              height: "100px",
            }}
            ml={2}
            mt={-2}
          >
            <Avatar
              alt={`${companyinfo?.name}`}
              src={`data:image/jpeg;base64,${companyinfo?.avatar}`}
              sx={{ width: 90, height: 90 }}
            />
            {showEdit && (
              <label htmlFor="file-input">
                <IconButton
                  aria-label="Edit avatar"
                  sx={{
                    position: "absolute",
                    top: "70%",
                    left: "47%",
                    transform: "translate(-50%,-50%)",
                    color: "red",
                  }}
                  component="div"
                >
                  <EditIcon />
                </IconButton>
              </label>
            )}
            <input
              id="file-input"
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleFileChangeavatar}
            />
          </Box>
        </Grid>
      ) : (
        <Skeleton variant="circular" width={90} height={90} />
      )}
      <Grid
        item
        xs={4}
        // style={{ border: "2px solid red" }}
        ml="120px"
        mb="30px"
      >
        <Typography variant="h5">
          Company Name : {companyinfo?.name}{" "}
        </Typography>
        <Typography variant="subtitle2">
          Conpany Address : {companyinfo?.address}{" "}
        </Typography>
        <Typography variant="subtitle2">
          Phone Number : {companyinfo?.companyPhoneNumber}{" "}
        </Typography>
        <Typography variant="body2">
          Created Date : {companyinfo?.creatDate}
        </Typography>
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
        }}
        onClick={handleAddItem}
      >
        <AddIcon />
      </Fab>
      <Additem
        open={openAddCategoreyPopUp}
        togglePopUp={AddCategoryPopUpToggle}
      />
    </Grid>
  );
}