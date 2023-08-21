import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { PetType } from "./CreatePetForm";

interface PetImageListProps {
  petType: PetType;
  setPetImage: React.Dispatch<React.SetStateAction<string>>;
}
export default function PetImageList({
  petType,
  setPetImage,
}: PetImageListProps) {
  const [petImageListLabel, setPetImageListLabel] = React.useState<string>(
    "Select an image from list",
  );

  const handleListItemClick = (image: string) => {
    setPetImage(image);
    setPetImageListLabel("Image selected successfully!");
  };

  return (
    <>
      <label id={"petImageList"}>{petImageListLabel} </label>
      <ImageList sx={{ width: 500, height: 200 }} cols={3} rowHeight={164}>
        {petType === PetType.Cat &&
          catItemData.map((item) => (
            <ImageListItem
              key={item.img}
              onClick={(_) => handleListItemClick(item.img)}
            >
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        {petType === PetType.Dog &&
          dogItemData.map((item) => (
            <ImageListItem
              key={item.img}
              onClick={(_) => handleListItemClick(item.img)}
            >
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
      </ImageList>
    </>
  );
}

const catItemData = [
  {
    img: "https://source.unsplash.com/sDpmnfv-KRk",
    title: "Cat",
  },
  {
    img: "https://source.unsplash.com/so5nsYDOdxw",
    title: "Cat",
  },
  {
    img: "https://source.unsplash.com/hL4UUjX8pr0",
    title: "Cat",
  },
];

const dogItemData = [
  {
    img: "https://source.unsplash.com/2l0CWTpcChI",
    title: "Dog",
  },
  {
    img: "https://source.unsplash.com/5PVXkqt2s9k",
    title: "Dog",
  },
  {
    img: "https://source.unsplash.com/urs_y9NwFcc",
    title: "Dog",
  },
];
