import { Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
};
export default function CardLookUps({ item }: CarditemProps) {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
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
          <Typography
            variant="body1"
            mt={1}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/ViewCompany", {
                state: {
                  companyid: item.companyId,
                },
              });
            }}
          >
            Company: {item?.companyName}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "right" }}></CardActions>
      </Card>
    </>
  );
}
