import React from 'react';
import {useGetPetsQuery} from "./store/services/petshop";
import PetCard from "./Components/PetCard";
import type { Pet } from './types'
import { Container } from '@mui/material';
import {Error} from "@mui/icons-material";

function App() {
  const { data, error, isLoading } = useGetPetsQuery()
  // @ts-ignore
    return (
    <div className="App">
      <header className="App-header">
        {error ? (
            <Error>Oh no, there was an error</Error>
        ) : isLoading ? (
            <>Loading...</>
        ) : data ? (
            <>
              <h3>Pets</h3>
              <Container maxWidth="xl" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {data.map((pet: Pet) =>
                    <PetCard {...pet} key={pet.id}/>
                )}
                </Container>
            </>
        ) : null}
      </header>
    </div>
  );
}

export default App;
