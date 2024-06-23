import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaCommentAlt,
    FaThList,
    FaCar,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../assets/images/oriLogo.svg";
import "../styles/sidebar.css";

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/logout');
    };

    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/profile",
            name: "Profile",
            icon: <FaUserAlt />
        },
        {
            path: "/analytics",
            name: "Car List",
            icon: <FaCar />
        },
        {
            path: "/addvehicle",
            name: "Add Cars",
            icon: <FaCommentAlt />
        },
        {
            path: "/productList",
            name: "Total Orders",
            icon: <FaThList />
        },
        {
            path: "/settings",
            name: "Settings",
            icon: <FaCog />
        }
    ];

    return (
        <div className="container">
            <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <img src={logo} alt="logo" style={{ display: isOpen ? "block" : "none" }} className="logo" />
                    <div className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
                <div className="sidebar__bottom" onClick={handleLogout}>
                    <div className="icon"><FaSignOutAlt /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Logout</div>
                </div>
            </div>
            <main style={{ marginLeft: isOpen ? "300px" : "50px", width: isOpen ? "calc(100% - 300px)" : "calc(100% - 50px)" }}>
                {children}
            </main>
        </div>
    );
};

export default Sidebar;
