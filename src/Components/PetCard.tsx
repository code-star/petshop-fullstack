import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import type { Pet } from '../types'
import {useAdoptPetMutation} from "../store/services/petshop";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
export default function PetCard(pet: Pet) {

    const [adoptPetMutation, { isLoading, error , data}] = useAdoptPetMutation();
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [showError, setShowError] = React.useState(false);

    const adoptPet = async () => {
        if (!isLoading) {
            try {
                await adoptPetMutation({ id: pet.id });
                setShowSuccess(true);
            } catch (error) {
                setShowError(true);
            }
        }
    };
    return (
        <div>
        <Card sx={{ maxWidth: 345 }}>
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
                <Button size="small" color="primary" disabled={pet.adopted} onClick={adoptPet} >
                    {pet.adopted ? 'Reserved' : 'Adopt'}
                </Button>
            </CardActions>
        </Card>
            {showError && <ErrorAlert message={error? error.toString() : "An error occurred and pet can't be adopted" }/> }
            {showSuccess && <SuccessAlert message={`You successfully adopt ${pet.name}!`}/> }
        </div>
    );
}