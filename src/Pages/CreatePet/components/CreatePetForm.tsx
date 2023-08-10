import * as React from 'react';
import { TextField, Button, Box, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@mui/material';

import { useState } from "react";
import PetImageList from "./PetImageList";
import {useAddPetMutation} from "../../../store/services/petshop"
import SuccessAlert from '../../sharedcomponents/SuccessAlert';
import ErrorAlert from '../../sharedcomponents/ErrorAlert';



export enum PetType {
    Cat = 'CAT',
    Dog = 'DOG'
}

export default function CreatePetForm() {
    const [petName, setPetName] = useState<string>('');
    const [petDescription, setPetDescription] = useState<string>('');
    const [petAge, setPetAge] = useState<number>(0);
    const [petType, setPetType] = useState<PetType>(PetType.Cat)
    const [petImage, setPetImage] = useState<string>('');

     const [addPet, { isLoading, isError, isSuccess, error, data }] = useAddPetMutation();

     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>  {
        event.preventDefault();
       try {
           await addPet({ name: petName, description: petDescription, age: petAge, type: petType, photoLink: petImage })
           if (isSuccess) {
               setPetName('');
               setPetDescription('');
               setPetAge(0);
               setPetType(PetType.Cat);
               setPetImage('');
           }
         } catch (error) {
           console.log(error)
       }
}

    return (
        <>
            { data &&  <SuccessAlert message={`You successfully add ${data.id} !`}/> }
            { error &&  <ErrorAlert message={`Something unexpected happened. Pet not created!`}/> }
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                noValidate
                autoComplete="on"
                onSubmit={handleSubmit}
            >
                <div>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        variant="outlined"
                        value={petName}
                        placeholder="Your pet's name"
                        onChange={(event) => setPetName(event.target.value)}
                        fullWidth
                        helperText={"Name must be at least three characters long"}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="description"
                        label="Description"
                        variant="outlined"
                        value={petDescription}
                        onChange={(event) => setPetDescription(event.target.value)}
                        placeholder="Your pet's description"
                        helperText={"Description must be at least fifteen characters long"}
                        multiline
                        maxRows={3}
                        fullWidth

                    />
                </div>
                <div>
                    <TextField
                        required
                        id="pet-age"
                        label="Age"
                        type="number"
                        variant="outlined"
                        aria-valuemin={0}
                        value={petAge}
                        helperText={"Age must be at least 0"}
                        fullWidth
                        onChange={(event) => setPetAge( Number(event.target.value))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div>
                    <FormControl fullWidth sx={{width:400}}>
                        <FormLabel id="pet-type">Pet Type</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="pet-type"
                            name="pet-type">
                            <FormControlLabel checked={petType === PetType.Cat} value={PetType.Cat} control={<Radio />} label="Cat" onClick={event => setPetType(PetType.Cat)} />
                            <FormControlLabel value={PetType.Dog} control={<Radio />} label="Dog" onClick={event => setPetType(PetType.Dog)} />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    <PetImageList petType={petType} setPetImage={setPetImage}/>
                    <Button id="submit" variant="contained" color="primary" type="submit"> Submit </Button>
                </div>
            </Box>
        </>
    );
}