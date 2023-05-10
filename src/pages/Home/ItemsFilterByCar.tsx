import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../API";
import { Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CardLookUps from "./itemsFilterByCarComponant/CardLookUps";

type ItemsForm = {
  id: number;
  companyName: string;
  companyId: number;
  name: string;
  discription: string;
  price: number;
  createdTime: string;
  carName: string;
  carType: string;
  carYear: string;
  userName: string;
  subCatName: string;
  catName: string;
  imageData: string;
};

export default function ItemsFilterByCar() {
  const location = useLocation();
  const [items, setItems] = useState<ItemsForm[]>([]);
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(items.length / 8);
  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

  const GetItems = async () => {
    try {
      console.log(location.state.carId);
      const response = await axios.get(
        `${API_ENDPOINT}lookups/GetItemByCar/${location.state.carId}/${location.state.typeId}/${location.state.yearId}/${location.state.subcategoryId}`
      );
      console.log(response.data);
      if (response.status == 200) {
        setItems(response.data);
      }
    } catch {}
  };

  useEffect(() => {
    GetItems();
  }, []);

  return (
    <Grid
      container
      columnSpacing={4}
      rowSpacing={1}
      xs={12}
      mt={1}
      mx="auto"
      py={3}
      pr={3}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Grid item xs={12} border="2px solid gray">
        <Typography textAlign="center" variant="h4">
          {location.state.carName}-{location.state.typename}-
          {location.state.yearname}
        </Typography>

        <Typography textAlign="center" variant="h5" sx={{ color: "gray" }}>
          {location.state.subcategoryName} SubCategory
        </Typography>
      </Grid>
      {items.length > 0 &&
        visibleItems.map((item) => (
          <Grid item xs={3} key={item.id}>
            <CardLookUps item={item} />
          </Grid>
        ))}
      <Grid container xs={12} justifyContent="center" mt={3}>
        <Pagination
          count={pageCount}
          variant="outlined"
          onChange={(event, page) => {
            setPage(page);
          }}
        />
      </Grid>
    </Grid>
  );
}
