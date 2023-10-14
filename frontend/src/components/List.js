import React, { useEffect, useState } from "react";
import "./List.css";
import { useParams } from "react-router-dom";
import { Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const List = () => {

    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTI0MWIwNWJkYzg1Yzg2ZmMxZTNhNjgiLCJuYW1lIjoiQWxleCIsImlhdCI6MTY5NzIwODQ1NywiZXhwIjoxNjk5ODAwNDU3fQ.UNRrwtmrwPYna77Wqv2p4JJzStoRW90E5a0pj3ZA8Zo");
    const [list, setList] = useState(null);
    const [listID] = useState(useParams().id);

    const buttonClick = () => {
        console.log("List Click!");
    };

    const getList = async () => {
        const resp = await fetch(`${apiURL}/lists/${listID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                },
        }).then((resp) => resp.json());
        setList(resp.list);
    };

    useEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        console.log(list);
    }, [list]);

    return(
        <div>
            <div className="list-container">
                {list !== null && (
                    <Card sx={{ minHeight: 250, minWidth: 250, margin: 2, display: "flex", flexDirection: "column", justifyContent: "center"}} raised={true}>
                    <CardContent sx={{ paddingY: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h5" component="div">
                            {list.title}
                        </Typography>
                        {
                            <div className="list-body">
                            {
                                list.items.length > 0 && list.items.map((item, index) => (
                                    <Typography key={index} variant="body2">
                                        {item}
                                    </Typography>
                                ))
                            }    
                            </div>
                        }
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button disabled={true} size="small" variant="contained" onClick={buttonClick}>Open</Button>
                    </CardActions>
                </Card>
                )}
            </div>
        </div>
    );
}

export default List;