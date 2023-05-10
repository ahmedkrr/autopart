import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../API";
import { companyowner } from "../../../common/utils/helpers";
import { Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CardLookUps from "../itemsFilterByCarComponant/CardLookUps";
import { useLocation } from "react-router-dom";

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

type SearchBar = {
  searchBar: string;
};

export default function ItemPushUP({ searchBar }: SearchBar) {
  const [items, setItems] = useState<ItemsForm[]>([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  useEffect(() => {
    console.log();
  });

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchBar.toLowerCase())
  );

  const pageCount = Math.ceil(items.length / 8);
  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
  const visibleItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const GetItems = async () => {
    try {
      console.log(location.state.companyid);
      const response = await axios.get(
        `${API_ENDPOINT}item/${location.state.companyid}/GetallItem`
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
    <>
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
    </>
  );
}
