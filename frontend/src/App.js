import React from "react";
import spices from "../public/spices-8246675_640.jpg";
import { Button } from "@mui/material";

function App (){
    return(
        <div className="App">
            The is a Webpack React App
            <img src="https://cdn.pixabay.com/photo/2023/09/20/20/17/skyline-8265564_1280.jpg" width={400} height={400} alt="skyline"></img>
            <img src={spices} width={400} height={400} alt="spices"></img>
            <Button variant="outlined">Outlined</Button>
        </div>
    );
}

export default App;