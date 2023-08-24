import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import type { Pet } from "../../types";
import { useAdoptPetMutation } from "../../store/services/petShopApi";
import AlertPopup from "../../components/AlertPopup";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "../../store/services/authSlice";
import { Role } from "../../types";
interface PetCardProps {
  pet: Pet;
}
export default function PetCard({ pet }: PetCardProps) {
  const [adoptPetMutation, { isLoading }] = useAdoptPetMutation();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const role = useSelector(selectCurrentRole);

  const adoptPet = async () => {
    if (!isLoading) {
      try {
        const message = await adoptPetMutation({ id: pet.id });
        if (message) {
          setIsSuccess(true);
        }
      } catch (error) {
        setHasError(true);
      }
    }
  };
  return (
    <div style={{ margin: "1rem" }}>
      <Card sx={{ maxWidth: 345, marginBottom: "0.5rem" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            src={pet.photoLink}
            alt={pet.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pet.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pet.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Age: {pet.age}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            disabled={pet.adopted || role !== Role.Customer}
            onClick={adoptPet}
            sx={{ display: role === Role.Customer ? "block" : "none" }}
          >
            {pet.adopted ? "Reserved" : "Adopt"}
          </Button>
        </CardActions>
      </Card>
      {hasError && (
        <AlertPopup
          message={"An error occurred and pet can't be adopted"}
          severity={"error"}
        />
      )}
      {isSuccess && (
        <AlertPopup
          message={`You successfully adopted ${pet.name}!`}
          severity={"success"}
        />
      )}
    </div>
  );
}
