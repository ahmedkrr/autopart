import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../API";
import { companyowner } from "../../../common/utils/helpers";
import { Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Carditem from "./Carditem";

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
      const companyid = companyowner();
      const response = await axios.get(
        `${API_ENDPOINT}item/${companyid}/GetallItem`
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

  const deleteItem = async (ItemmId: number) => {
    const confirmed = window.confirm(
      ` Are you sure you want to delete this user ID = ${ItemmId}?`
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `${API_ENDPOINT}item/DeleteItem/${ItemmId}`
        );
        console.log(response.status);
        if (response.status == 200) {
          window.alert("The Item Deleted successfully");
          GetItems();
        }
      } catch {}
    }
  };

  return (
    <>
      {items.length > 0 &&
        visibleItems.map((item) => (
          <Grid item xs={3} key={item.id}>
            <Carditem item={item} handleDelete={deleteItem} />
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
