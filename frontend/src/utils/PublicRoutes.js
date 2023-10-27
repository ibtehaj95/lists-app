import React from "react";
import { Outlet } from "react-router-dom";

function PublicRoutes(){

    return (
        <div>
            Public Route
            <Outlet></Outlet>
        </div>
    );
}

export default PublicRoutes;