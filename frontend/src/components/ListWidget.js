import React from "react";
import { Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ListWidget = (props) => {

    const buttonClick = () => {
        console.log("Card Click");
        //take the user to the specific list page
    };
    
    return(
        <Card sx={{ minWidth: 275, maxWidth: 500, margin: 2 }} raised={true}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" onClick={buttonClick}>Open</Button>
            </CardActions>
        </Card>
    );
}

export default ListWidget;