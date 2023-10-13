import React, { useEffect, useState } from "react";
import ListWidget from "./ListWidget";
import "./Home.css";

const Home = () => {

    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTI0MWIwNWJkYzg1Yzg2ZmMxZTNhNjgiLCJuYW1lIjoiQWxleCIsImlhdCI6MTY5NzIwODQ1NywiZXhwIjoxNjk5ODAwNDU3fQ.UNRrwtmrwPYna77Wqv2p4JJzStoRW90E5a0pj3ZA8Zo");
    const [lists, setLists] = useState([]);

    const getAllLists = async () => {
        const resp = await fetch(`${apiURL}/lists`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                },
        }).then((resp) => resp.json());
        setLists(resp.lists);
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
            Home
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
        </div>
    );
}

export default Home;