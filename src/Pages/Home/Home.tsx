import {useGetPetsQuery} from "../../store/services/petshop";
import {Error} from "@mui/icons-material";
import {Container} from "@mui/material";
import {Pet} from "../../types";
import PetCard from "./components/PetCard";
import React from "react";

export function Home() {
    const { data, error, isLoading } = useGetPetsQuery()

    return (
       <>
           {error ? (
                    <Error>Oh no, there was an error</Error>
                ) : isLoading ? (
                    <>Loading...</>
                ) : data ? (
                    <>
                        <Container maxWidth="xl" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                            {data.map((pet: Pet) =>
                                <PetCard pet={pet} key={pet.id}/>
                            )}
                        </Container>
                    </>
                ) : null}
       </>
    );
}