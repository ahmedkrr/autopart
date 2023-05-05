import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../API";
import { companyowner } from "../../../common/utils/helpers";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AiFillEdit } from "react-icons/ai";

type ItemsForm = {
  id: number;
  companyName: string;
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

export default function ItemPushUP() {
  const [items, setItems] = useState<ItemsForm[]>([]);
  const [showMore, setShowMore] = useState(false);

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
        items.map((item) => (
          <Grid item xs={3} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={`data:image/jpeg;base64,${item?.imageData}`}
                title="green iguana"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" textAlign="center">
                  {item?.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {item?.discription.substring(0, 100)}
                  {item?.discription.length > 100 && "... "}
                  {item?.discription.length > 100 && (
                    <span
                      className="see-more"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? "See less" : "See more"}
                    </span>
                  )}
                  {showMore && item?.discription.substring(100)}
                </Typography>

                <Typography textAlign="right">{item?.price}$</Typography>
                <Typography variant="body2">
                  {item?.catName} \ {item?.subCatName}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "right" }}>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </Button>
                <Button
                  style={{ backgroundColor: "green", color: "white" }}
                  variant="outlined"
                  startIcon={<AiFillEdit />}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </>
  );
}
