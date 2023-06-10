import {
  Grid,
  Avatar,
  Box,
  Button,
  Skeleton,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../../API";
import defaultbackground from "../../../static/defaultbackground.jpg";
import { useLocation } from "react-router-dom";
import { MdLocationPin, MdPhoneInTalk } from "react-icons/md";

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
  const location = useLocation();
  const [companyinfo, setcompanyinfo] = useState<CompanyInfo>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      console.log(location.state.companyid);
      const response = await axios.get(
        `${API_ENDPOINT}lookups/getCompanyInfo/${location.state.companyid}`
      );
      if (response.data) {
        setcompanyinfo(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return (
      <Grid justifyContent="center" alignContent="center">
        <CircularProgress size={20} />
      </Grid>
    );
  }

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
            ></Button>
          </Box>

          <Box
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
        <Typography variant="h5">{companyinfo?.name} </Typography>
        <Typography variant="subtitle2">
          <MdLocationPin /> {companyinfo?.address}
        </Typography>
        <Typography variant="subtitle2">
          <MdPhoneInTalk /> {companyinfo?.companyPhoneNumber}
        </Typography>
        <Typography variant="body2">
          Created Date : {companyinfo?.creatDate}
        </Typography>
      </Grid>
    </Grid>
  );
}
