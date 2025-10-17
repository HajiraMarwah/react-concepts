import React from "react";
import { NavLink,Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <NavLink
          to="profile"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Profile
        </NavLink>
        {" "}|{" "}
        <NavLink
          to="settings"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Settings
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default Dashboard;
