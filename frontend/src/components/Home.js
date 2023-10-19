import React, { useEffect, useState } from "react";
import ListWidget from "./ListWidget";
import "./Home.css";
import Button from '@mui/material/Button';
import NewList from "./NewList";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Home = () => {

    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTI0MWIwNWJkYzg1Yzg2ZmMxZTNhNjgiLCJuYW1lIjoiQWxleCIsImlhdCI6MTY5NzIwODQ1NywiZXhwIjoxNjk5ODAwNDU3fQ.UNRrwtmrwPYna77Wqv2p4JJzStoRW90E5a0pj3ZA8Zo");
    const [lists, setLists] = useState([]);
    const [showNewList, setShowNewList] = useState(false);
    
    const openNewListCreate = () => setShowNewList(true);

    const getAllLists = async () => {
        try{
            const resp = await fetch(`${apiURL}/lists`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    },
            });
            if(resp.ok === true){
                const respBody = await resp.json();
                setLists(respBody.lists);
                // toast.success('Fetched');
            }
            else{
                toast.warn("Response Not Okay!");
            }
        }
        catch (error){
            console.log("Failed to Fetch", error);
            toast.error("Failed to Fetch");
        }
    };

    useEffect(() => {
        console.log("Home");
        getAllLists();
    }, []);

    // useEffect(() => {
    //     console.log(lists);
    // }, [lists]);

    return(
        <div>
            <Button size="large" variant="contained" onClick={openNewListCreate}>New List</Button>
            <div className="card-container">
                {lists.length > 0 && (
                    lists.map((list) => (
                        <ListWidget
                            id = {list._id}
                            key = {list._id}
                            title = {list.title}
                        ></ListWidget>
                    ))
                )}
            </div>
            {
                showNewList === true && <NewList
                    showModal = {showNewList}
                    setShowModal = {setShowNewList}
                ></NewList>
            }
            <ToastContainer
                position="top-right"
                autoClose={2}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default Home;