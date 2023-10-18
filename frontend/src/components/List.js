import React, { useEffect, useState } from "react";
import "./List.css";
import { useParams } from "react-router-dom";
import { Card, TextField } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";

const List = () => {

    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTI0MWIwNWJkYzg1Yzg2ZmMxZTNhNjgiLCJuYW1lIjoiQWxleCIsImlhdCI6MTY5NzIwODQ1NywiZXhwIjoxNjk5ODAwNDU3fQ.UNRrwtmrwPYna77Wqv2p4JJzStoRW90E5a0pj3ZA8Zo");
    const [listTitle, setListTitle] = useState(null);
    const [listItems, setListItems] = useState([]);
    const [listID] = useState(useParams().id);
    const [editable, setEditable] = useState(false);
    const navigateTo = useNavigate();

    const goHome = () => {
        navigateTo(`/home`);
    };

    const getList = async () => {
        const resp = await fetch(`${apiURL}/lists/${listID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                },
        }).then((resp) => resp.json());
        setListItems(resp.list.items);
        setListTitle(resp.list.title);
    };

    const editList = () => {
        console.log("Edit List");
        setEditable((prev) => !prev);
    };

    const deleteList = () => {
        console.log("Delete List");
    };

    const addItem = () => {
        // console.log("Add Item to List");
        setListItems((prev) => [
            ...prev,
            `Item`,
        ]);
    };

    const editItem = (value, index) => {
        // console.log("Edit List Item");
        let updatedListItems = [...listItems];
        updatedListItems[index] = value;
        setListItems(updatedListItems);
    };

    const removeItem = (pIndex) => {
        // console.log("Remove List Item", pIndex);
        const updatedListItems = listItems.filter((item, index) => (index !== pIndex && item));
        setListItems(updatedListItems);
    };

    useEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        console.log(listTitle);
        console.log(listItems);
    }, [listItems]);

    return(
        <div>
            <Button size="large" variant="contained" onClick={goHome}>Home</Button>
            <div className="list-container">
                {listItems.length > 0 && listTitle !== null && (
                    <Card sx={{ minHeight: 250, minWidth: 250, margin: 2, display: "flex", flexDirection: "column", justifyContent: "center"}} raised={true}>
                    <CardContent sx={{ paddingY: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {
                            listTitle !== undefined && editable === false && (
                                <Typography variant="h5" component="div">
                                    {listTitle}
                                </Typography>
                            )
                        }
                        {
                            listTitle !== undefined && editable === true && (
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="List Name"
                                    value={listTitle}
                                    onChange={(event) => setListTitle(event.target.value)}
                                    sx={{ marginTop: 2 }}
                                />
                            )
                        }
                        {
                            <div className="list-body">
                            {
                                listItems.length > 0 && editable === false && listItems.map((item, index) => (
                                    <Typography key={index} variant="body2">
                                        {item}
                                    </Typography>
                                ))
                            }
                            {
                                listItems.length > 0 && editable === true && listItems.map((item, index) => (
                                    <div className="item-group" key={index}>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="List Item"
                                            value={item}
                                            size="small"
                                            sx={{ marginTop: 2 }}
                                            onChange={(event) => {editItem(event.target.value, index)}}
                                        />
                                        <IconButton 
                                            aria-label="delete" 
                                            size="small" 
                                            sx={{ marginTop: 2, marginLeft: 1 }} 
                                            onClick={(event) => {removeItem(index)}}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                ))
                            }   
                            </div>
                        }
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button size="small" variant="contained" color="success" onClick={editList}>{ editable === false ? "Edit" : "Save" }</Button>
                        {
                            editable === false ?
                            (<Button size="small" variant="contained" color="error" onClick={deleteList}>Delete</Button>):
                            (<Button size="small" variant="contained" color="primary" onClick={addItem}>Add Item</Button>)
                        }
                    </CardActions>
                </Card>
                )}
            </div>
        </div>
    );
}

export default List;