import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import EditItem from "./EditItem";
import { useToggle } from "../../../common/hooks/useToggle";

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
type CarditemProps = {
  item: ItemsForm;
  handleDelete: (id: number) => void;
};

export default function Carditem({ item, handleDelete }: CarditemProps) {
  const [showMore, setShowMore] = useState(false);
  const [openAddCategoreyPopUp, AddCategoryPopUpToggle] = useToggle();
  const [editItemId, setEditItemId] = useState(0);
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={`data:image/jpeg;base64,${item?.imageData}`}
          title="Item Photo"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" textAlign="center">
            {item?.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" key={item.id}>
            {item?.discription.substring(0, 100)}
            {item?.discription.length > 100 && "...."}

            {showMore && item?.discription.substring(100)}
            <Button onClick={() => setShowMore(!showMore)} size="small">
              {showMore ? "See less" : "See more"}
            </Button>
          </Typography>

          <Typography textAlign="right">{item?.price}$</Typography>
          <Typography variant="body2">
            {item?.catName} \ {item?.subCatName}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "right" }}>
          <Button
            variant="outlined"
            //   startIcon={<DeleteIcon />}
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </Button>
          <Button
            style={{ backgroundColor: "green", color: "white" }}
            variant="outlined"
            //   startIcon={<AiFillEdit />}
            onClick={() => {
              setEditItemId(item.id);
              AddCategoryPopUpToggle();
            }}
          >
            Edit
          </Button>
        </CardActions>
      </Card>

      {openAddCategoreyPopUp ? (
        <EditItem
          open={openAddCategoreyPopUp}
          togglePopUp={AddCategoryPopUpToggle}
          Id={editItemId}
        />
      ) : null}
    </>
  );
}
