import React, { useState } from "react";
import { Card, Modal, TextField } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NewList = (props) => {

    const [newListTitle, setNewListTitle] = useState("Untitled");
    const [newListItems, setNewListItems] = useState([]);

    const closeNewListCreate = () => props.setShowModal(false);

    const createNewList = () => {
        console.log("Create New List");
        closeNewListCreate();
    };

    const addItem = () => {
        console.log("Add Item to List");
        setNewListItems((prev) => [
            ...prev,
            `Item ${prev.length}`,
        ]);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        minHeight: 250, 
        minWidth: 250,
        margin: 2, 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center"
    };
    
    return(
        <Modal
            open={props.showModal}
            onClose={closeNewListCreate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            
                <Card sx={ style } raised={true}>
                    <CardContent sx={{ paddingY: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h5" component="div" sx={{ paddingTop: 2 }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="List Name"
                            defaultValue={newListTitle}
                            onChange={setNewListTitle}
                        />
                        </Typography>
                        {
                            <div className="list-body">
                            {
                                newListItems.length > 0 && newListItems.map((item, index) => (
                                    <Typography key={index} variant="body2">
                                        {item}
                                    </Typography>
                                ))
                            }    
                            </div>
                        }
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button size="small" variant="contained" onClick={addItem}>Add Item</Button>
                        <Button size="small" variant="contained" onClick={createNewList}>Create</Button>
                    </CardActions>
                </Card>
        </Modal>
    );
}

export default NewList;