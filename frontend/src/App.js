import React, { useEffect, useState } from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import List from "./components/List";

function App (){

    return(
        <div className="App">
            <Routes>
                <Route path="/" element={<h1>Root</h1>}></Route>
                <Route path="/home" element={<Home></Home>}></Route>
                <Route path="/list/:id" element={<List></List>}></Route>
                <Route path="*" element={<h1>Not Found</h1>}></Route>
            </Routes>
        </div>
    );
}

export default App;