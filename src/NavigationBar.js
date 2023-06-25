import React from "react";
import {
    FaHome,
    FaSearch,
    FaUser,
    FaSignInAlt,
    FaUserPlus,
    FaPlusSquare,
    FaBook,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./index.css";

const NavigationSidebar = ({ user }) => {
    const { pathname } = useLocation();
    const [, , active] = pathname.split("/");
    const links = [
        { name: "home", icon: FaHome },
        { name: "search", icon: FaSearch },
        { name: "profile", icon: FaUser },
    ];

    if (user && user.type === 'author') {
        links.push({ name: "announcements", icon: FaBook });
    }

    if (user && user.type === 'clubOrganizer') {
        links.push({ name: "create-club", icon: FaPlusSquare });
        links.push({ name: "manage-clubs", icon: FaBook });
    }

    return (
        <div className="list-group">
            {links.map((link) => (
                <Link
                    key={link.name}
                    to={`/${link.name}`}
                    className={`list-group-item text-capitalize ${active === link.name ? "active" : ""}`}
                >
                    <span style={{ display: "flex", alignItems: "center" }}>
                        {React.createElement(link.icon, { className: "" })}
                        <span className="xy d-none d-xxl-block d-xl-block">{link.name}</span>
                    </span>
                </Link>
            ))}
            {!user && (
                <>
                    <Link className="list-group" to="/login">
                        <FaSignInAlt /> Login
                    </Link>
                    <Link className="list-group" to="/register">
                        <FaUserPlus /> Register
                    </Link>
                </>
            )}
        </div>
    );
};

export default NavigationSidebar;
