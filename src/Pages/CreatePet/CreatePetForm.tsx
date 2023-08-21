import {
  TextField,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import PetImageList from "./PetImageList";
import { useAddPetMutation } from "../../store/services/petShopApi";
import AlertPop from "../../components/AlertPop";
import { CreatePet } from "../../types";

export enum PetType {
  Cat = "CAT",
  Dog = "DOG",
}
interface CreatePetFormProps {
  setIsCreatePetFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPetId: React.Dispatch<React.SetStateAction<string>>;
}
const validateForm = ({
  name,
  description,
  age,
  photoLink,
}: CreatePet): string =>
  [
    name.length < 3 ? "Name must be at least three characters long" : "",
    description.length < 15
      ? "Description must be at least fifteen characters long"
      : "",
    age < 0 ? "Age must be a positive number" : "",
    photoLink.length < 1 ? "You must select an image" : "",
  ]
    .filter((error) => error !== "")
    .join(". ");

export default function CreatePetForm({
  setIsCreatePetFormVisible,
  setPetId,
}: CreatePetFormProps) {
  const [petName, setPetName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [type, setType] = useState<PetType>(PetType.Cat);
  const [photoLink, setPhotoLink] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [addPet] = useAddPetMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pet = { name: petName, description, age, type, photoLink };
    const errors = validateForm(pet);

    if (errors.length > 0) {
      setErrorMessage(errors);
      return;
    }

    setErrorMessage("");

    try {
      const createdPet = await addPet(pet).unwrap();
      if (createdPet) {
        setPetName("");
        setDescription("");
        setAge(0);
        setType(PetType.Cat);
        setPhotoLink("");

        setIsCreatePetFormVisible((prevState) => !prevState);
        setPetId(createdPet.id);
      }
    } catch (error) {
      setErrorMessage(`Something unexpected happened. Pet not created!`);
    }
  };

  return (
    <>
      {errorMessage.length > 0 && (
        <AlertPop message={errorMessage} severity={"error"} />
      )}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        autoComplete="off"
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
            helperText="Name must be at least three characters long"
            error={petName.length < 3}
          />
        </div>
        <div>
          <TextField
            required
            id="description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Your pet's description"
            helperText="Description must be at least fifteen characters long"
            multiline
            maxRows={3}
            error={description.length < 15}
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
            value={age}
            helperText="Age must be at least 0"
            fullWidth
            onChange={(event) => setAge(Number(event.target.value))}
            error={age < 0}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <FormControl fullWidth sx={{ width: 400 }}>
            <FormLabel id="pet-type">Pet Type</FormLabel>
            <RadioGroup row aria-labelledby="pet-type" name="pet-type">
              <FormControlLabel
                checked
                value={PetType.Cat}
                control={<Radio />}
                label="Cat"
                onClick={(_) => setType(PetType.Cat)}
              />
              <FormControlLabel
                value={PetType.Dog}
                control={<Radio />}
                label="Dog"
                onClick={(_) => setType(PetType.Dog)}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <PetImageList type={type} setPhotoLink={setPhotoLink} />
          <Button id="submit" variant="contained" color="primary" type="submit">
            {" "}
            Submit{" "}
          </Button>
        </div>
      </Box>
    </>
  );
}
