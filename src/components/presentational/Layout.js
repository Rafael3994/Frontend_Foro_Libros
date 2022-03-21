import React from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";


function Layout(props) {
    return (
        <div className="App mx-5">
            <div className="d-flex col-8 flex-column mx-auto">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;