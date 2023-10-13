import React, { useEffect, useState } from "react";
import {Route, Routes} from "react-router-dom";

function App (){

    useEffect(() => {
        console.log("Working");
    }, []);

    return(
        <div className="App">
            <Routes>
                <Route path="/" element={<h1>Root</h1>}></Route>
                <Route path="/home" element={<h1>Home</h1>}></Route>
                <Route path="/list" element={<h1>List</h1>}></Route>
                <Route path="*" element={<h1>Not Found</h1>}></Route>
            </Routes>
        </div>
    );
}

export default App;