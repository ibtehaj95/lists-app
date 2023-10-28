import React, { useEffect, useState } from "react";
import ListWidget from "./ListWidget";
// import "./Login.css";
import Button from '@mui/material/Button';
import NewList from "./NewList";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router-dom';

const Trash = (props) => {

    // const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    // const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTI0MWIwNWJkYzg1Yzg2ZmMxZTNhNjgiLCJuYW1lIjoiQWxleCIsImlhdCI6MTY5NzIwODQ1NywiZXhwIjoxNjk5ODAwNDU3fQ.UNRrwtmrwPYna77Wqv2p4JJzStoRW90E5a0pj3ZA8Zo");
    // const [lists, setLists] = useState([]);
    const [location] = useState(useLocation());

    // const getAllLists = async () => {
    //     try{
    //         const resp = await fetch(`${apiURL}/lists`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`,
    //                 },
    //         });
    //         if(resp.ok === true){
    //             const respBody = await resp.json();
    //             setLists(respBody.lists);
    //             // toast.success('Fetched');
    //         }
    //         else{
    //             toast.warn("Response Not Okay!");
    //             const error = await resp.json();
    //             console.log("Failed to Fetch", error);
    //         }
    //     }
    //     catch (error){
    //         console.log("Failed to Fetch", error);
    //         toast.error("Failed to Fetch");
    //     }
    // };

    useEffect(() => {
        console.log("Trash");
        if(location){
            props.setLocation(location.pathname.split("/")[1].toUpperCase());
        }
    }, []);

    // useEffect(() => {
    //     console.log(lists);
    // }, [lists]);

    return(
        <div>
            Trash Page
        </div>
    );
}

export default Trash;