import React from "react";
import { Typography, Button } from "@mui/material";
import { Home } from "./Pages/Home/Home";
import CreatePetForm from "./Pages/CreatePet/CreatePetForm";
import AlertPop from "./components/AlertPop";
import "./App.css";

function App() {
  const [isCreatePetFormVisible, setIsCreatePetFormVisible] =
    React.useState<boolean>(false);
  const [petId, setPetId] = React.useState<string>("");

  const toggleCreatePetForm = () => {
    setIsCreatePetFormVisible((prevState) => !prevState);
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
          <AlertPop
            message={`You successfully add ${petId} !`}
            severity={"success"}
          />
        )}
      </header>
      <div className="app-container">
        <Button
          id="create-pet"
          variant="contained"
          onClick={toggleCreatePetForm}
          sx={{ marginBottom: "1rem", marginRight: "5rem" }}
        >
          {isCreatePetFormVisible ? "Hide" : "Create Pet"}
        </Button>
        <div>
          {isCreatePetFormVisible && (
            <CreatePetForm
              setIsCreatePetFormVisible={setIsCreatePetFormVisible}
              setPetId={setPetId}
            />
          )}
          {!isCreatePetFormVisible && <Home />}
        </div>
      </div>
    </div>
  );
}

export default App;
