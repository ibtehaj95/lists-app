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
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';

const List = () => {

    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTI0MWIwNWJkYzg1Yzg2ZmMxZTNhNjgiLCJuYW1lIjoiQWxleCIsImlhdCI6MTY5NzIwODQ1NywiZXhwIjoxNjk5ODAwNDU3fQ.UNRrwtmrwPYna77Wqv2p4JJzStoRW90E5a0pj3ZA8Zo");
    const [listTitle, setListTitle] = useState(null);
    const [listItems, setListItems] = useState([]);
    const [listCompleted, setListCompleted] = useState(null);
    const [listTitleOld, setListTitleOld] = useState(null);
    const [listItemsOld, setListItemsOld] = useState([]);
    const [listCompletedOld, setListCompletedOld] = useState(null);
    const [listID] = useState(useParams().id);
    const [editable, setEditable] = useState(false);
    const navigateTo = useNavigate();

    const theme = useTheme();

    const goHome = () => {
        navigateTo(`/home`);
    };

    const getList = async () => {
        try{
            const resp = await fetch(`${apiURL}/lists/${listID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    },
            });
            if(resp.ok === true){
                const respBody = await resp.json();
                setListItems(respBody.list.items);
                setListTitle(respBody.list.title);
                setListCompleted(respBody.list.completed);
                setListItemsOld(respBody.list.items);
                setListTitleOld(respBody.list.title);
                setListCompletedOld(respBody.list.completed);
                // toast.success('Fetched');
            }
            else{
                toast.warn("Response Not Okay!");
            }
        }
        catch{
            console.log("Failed to Fetch");
            toast.warn("Response Not Okay!");
        }
    };

    const editList = async () => {
        console.log("Edit List");
        //distinguish b/w edit start and edit save to DB
        // console.log("Editable", editable); //false when edit start, true when save
        if(editable === false){
            setListItemsOld(listItems);
            setListTitleOld(listTitle);
            setListCompletedOld(listCompleted);
            setEditable((prev) => !prev);
            return;
        }
        try{
            const data = {
                title: listTitle,
                items: listItems,
                completed: listCompleted,
            };
            // console.log(data);
            const resp = await fetch(`${apiURL}/lists/${listID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    },
                body: JSON.stringify(data),
            });
            if(resp.ok === true){
                setEditable((prev) => !prev);
                toast.success('Updated!');
            }
            else{
                toast.warn("Response Not Okay!");
            }
        }
        catch (error){
            console.log("Failed to Fetch", error);
            toast.warn("Response Not Okay!");
        }
    };

    const deleteList = async () => {
        console.log("Delete List");
        try{
            const resp = await fetch(`${apiURL}/lists/${listID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    },
            });
            if(resp.ok === true){
                toast.success('Deleted');
                goHome();
            }
            else{
                toast.warn("Response Not Okay!");
            }
        }
        catch (error){
            console.log("Failed to Fetch", error);
            toast.warn("Response Not Okay!");
        }
    };

    const handleListCompleted = () => {
        console.log("Change Completed Status");
        setListCompleted((prev) => !prev);
    };

    const cancelChanges = () => {
        console.log("Cancel Changes");
        setListTitle(listTitleOld);
        setListItems(listItemsOld);
        setListCompleted(listCompletedOld);
        setEditable((prev) => !prev);
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
        console.log({
            listTitle,
            listItems,
            listCompleted
        });
    }, [listItems]);

    return(
        <div>
            <Button size="large" variant="contained" onClick={goHome}>Home</Button>
            <div className="list-container">
                {listTitle !== null && (
                    <Card sx={{ minHeight: 250, minWidth: 250, margin: 2, display: "flex", flexDirection: "column", justifyContent: "center"}} raised={true}>
                    <CardContent sx={{ paddingY: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {
                            listTitle !== undefined && editable === false && (
                                <div className="title-div">
                                    <Typography variant="h5" component="div">
                                        {listTitle}
                                    </Typography>
                                    <Button variant="contained" color={listCompleted ? "success" : "error"} size="small" disableElevation sx={{ margin: 1, paddingX: 1, "pointerEvents": "none"}}>{listCompleted ? "Complete" : "Incomplete"}</Button>
                                    {/* In the line above, disabling pointer events takes care of click disable and point change, hence no need for "&:hover": { backgroundColor: theme.palette.success.main, cursor: "default"}*/}
                                </div>
                            )
                        }
                        {
                            listTitle !== undefined && editable === true && (
                                <div className="title-div">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="List Name"
                                        value={listTitle}
                                        onChange={(event) => setListTitle(event.target.value)}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <Button size="small" variant="contained" color={listCompleted ? "success" : "error"} onClick={handleListCompleted} sx={{ marginX: 1, marginTop: 1.5, paddingX: 1 }}>{listCompleted ? "Complete" : "Incomplete"}</Button>
                                </div>
                            )
                        }
                        {
                            <div className="list-body">
                            {
                                listItems.length > 0 && editable === false && listItems.map((item, index) => (
                                    <Typography key={index} variant="subtitle1">
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
                            (
                                <div>
                                    <Button size="small" variant="contained" color="primary" onClick={addItem} sx={{ marginLeft: 1 }}>Add Item</Button>
                                    <Button size="small" variant="contained" color="error" onClick={cancelChanges} sx={{ marginLeft: 1 }}>Cancel</Button>
                                </div>
                            )
                        }
                    </CardActions>
                </Card>
                )}
            </div>
        </div>
    );
}

export default List;