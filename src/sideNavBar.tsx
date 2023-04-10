import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial", position:"fixed", top:0  }}
    >
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#9087cc"
        
        className={""}
        breakpoint={0}
        toggled={false}
        minWidth={""}
        maxWidth={"40vh"}
        
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Motor Rescue &thinsp; &thinsp; &thinsp; &thinsp; &thinsp;
            <p style={{ fontSize: 12 }}>Admin Dashboard</p>
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content" >
          <CDBSidebarMenu >
            <NavLink to="/" className="activeClicked">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/tables" className="activeClicked">
              <CDBSidebarMenuItem icon="comment-alt">Live Chat</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/profile" className="activeClicked">
              <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/analytics" className="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Sales Forecast
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/hero404" target="_blank" className="activeClicked">
              <CDBSidebarMenuItem icon="power-off">
                Logout
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter>
          <div
            style={{
              paddingBottom: "10px",
              textAlign: "center"
            }}
          >
            	&copy;Motor Rescue 2023
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};
export default Sidebar;
