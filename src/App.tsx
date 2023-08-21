import React from "react";
import { Typography, Button } from "@mui/material";
import { Home } from "./Pages/Home/Home";
import CreatePetForm from "./Pages/CreatePet/CreatePetForm";
import SuccessAlert from "./components/SuccessAlert";
import "./App.css";

function App() {
  const [showCreatePetForm, setShowCreatePetForm] =
    React.useState<boolean>(false);
  const [petId, setPetId] = React.useState<string>("");

  const showFormHandler = () => {
    //show
    setShowCreatePetForm((prevState) => !prevState);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          sx={{ textAlign: "center" }}
        >
          Pet Shop
        </Typography>
        {petId.length > 0 && (
          <SuccessAlert message={`You successfully add ${petId} !`} />
        )}
      </header>
      <div className="app-container">
        <Button
          id="create-pet"
          variant="contained"
          onClick={showFormHandler}
          sx={{ marginBottom: "1rem", marginRight: "5rem" }}
        >
          {showCreatePetForm ? "Hide" : "Create Pet"}
        </Button>
        <div>
          {showCreatePetForm && (
            <CreatePetForm
              setShowCreatePetForm={setShowCreatePetForm}
              setPetId={setPetId}
            />
          )}
          {!showCreatePetForm && <Home />}
        </div>
      </div>
    </div>
  );
}

export default App;
