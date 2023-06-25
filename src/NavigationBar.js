import React from "react";
import { FaHome, FaHashtag, FaBell, FaEnvelope, FaBookmark, FaList, FaUser, FaEllipsisH } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./index.css";

const NavigationSidebar = () => {
    const { pathname } = useLocation();
    const [, , active] = pathname.split("/");
    const links = [
        { name: "home", icon: FaHome },
        { name: "explore", icon: FaHashtag },
        { name: "notifications", icon: FaBell },
        { name: "messages", icon: FaEnvelope },
        { name: "bookmarks", icon: FaBookmark },
        { name: "lists", icon: FaList },
        { name: "profile", icon: FaUser },
        { name: "more", icon: FaEllipsisH },
    ];
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="list-group">
            {links.map((link) => (
                <Link
                    key={link.name}
                    to={`/tuiter/${link.name}`}
                    className={`list-group-item text-capitalize ${active === link.name ? "active" : ""}`}
                >
                    <span style={{ display: "flex", alignItems: "center" }}>
                        {React.createElement(link.icon, { className: "" })}
                        <span className="xy d-none d-xxl-block d-xl-block">{link.name}</span>
                    </span>
                </Link>
            ))}
            {!currentUser && (
                <Link className="list-group" to="/tuiter/login">
                    Login
                </Link>
            )}
            {!currentUser && (
                <Link className="list-group" to="/tuiter/register">
                    Register
                </Link>
            )}
            {currentUser && (
                <button className="btn btn-primary rounded-pill tuit-btn">
                    Tuit
                </button>
            )}
        </div>
    );
};

export default NavigationSidebar;
