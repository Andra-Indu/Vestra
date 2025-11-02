
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // 👈 Redirect to home page instead of /login
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#fff" : "#121212";
    document.body.style.color = darkMode ? "#000" : "#fff";
  };

  const navLinks = [
    { name: "Products", path: "/admin/products" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Inventory", path: "/admin/inventory" },
    { name: "Analytics", path: "/admin/analytics" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          background: darkMode
            ? "linear-gradient(135deg, #212121, #424242)"
            : "linear-gradient(135deg, #1976d2, #42a5f5)",
          transition: "all 0.4s ease",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/adminDashboard")}
            >
              VESTRA Admin Panel
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton color="inherit" onClick={toggleTheme}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { color: "#ffeb3b" },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        transitionDuration={400}
        PaperProps={{
          sx: {
            width: 270,
            background: darkMode ? "#1c1c1c" : "#f4f6f8",
            color: darkMode ? "#fff" : "#000",
            transition: "all 0.4s ease",
          },
        }}
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 70 }}
        >
          <Box sx={{ p: 2 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              align="center"
              sx={{ mb: 2 }}
            >
              Menu
            </Typography>
            <Divider />
            <List>
              {navLinks.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, x: 10 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <ListItem
                    button
                    onClick={() => {
                      navigate(item.path);
                      toggleDrawer();
                    }}
                    sx={{
                      borderRadius: 2,
                      my: 0.5,
                      "&:hover": {
                        background: darkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(25,118,210,0.1)",
                      },
                    }}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </Box>
        </motion.div>
      </Drawer>
    </>
  );
}


// // ✅ src/components/AdminNavbar.jsx
// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Switch,
//   useTheme,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import LogoutIcon from "@mui/icons-material/Logout";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function AdminNavbar() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//     document.body.style.backgroundColor = darkMode ? "#fff" : "#121212";
//     document.body.style.color = darkMode ? "#000" : "#fff";
//   };

//   const navLinks = [
//     { name: "Products", path: "/admin/products" },
//     { name: "Categories", path: "/admin/categories" },
//     { name: "Orders", path: "/admin/orders" },
//     { name: "Users", path: "/admin/users" },
//     { name: "Reports", path: "/admin/reports" },
//     { name: "Inventory", path: "/admin/inventory" },
//     { name: "Analytics", path: "/admin/analytics" },
//     { name: "Settings", path: "/admin/settings" },
//   ];

//   return (
//     <>
//       <AppBar
//         position="sticky"
//         elevation={4}
//         sx={{
//           background: darkMode
//             ? "linear-gradient(135deg, #212121, #424242)"
//             : "linear-gradient(135deg, #1976d2, #42a5f5)",
//           transition: "all 0.4s ease",
//         }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <IconButton color="inherit" onClick={toggleDrawer}>
//               <MenuIcon />
//             </IconButton>
//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               sx={{ cursor: "pointer" }}
//               onClick={() => navigate("/adminDashboard")}
//             >
//               VESTRA Admin Panel
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <IconButton color="inherit" onClick={toggleTheme}>
//               {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//             </IconButton>
//             <Button
//               color="inherit"
//               startIcon={<LogoutIcon />}
//               onClick={handleLogout}
//               sx={{
//                 textTransform: "none",
//                 fontWeight: 500,
//                 "&:hover": { color: "#ffeb3b" },
//               }}
//             >
//               Logout
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={toggleDrawer}
//         transitionDuration={400}
//         PaperProps={{
//           sx: {
//             width: 270,
//             background: darkMode ? "#1c1c1c" : "#f4f6f8",
//             color: darkMode ? "#fff" : "#000",
//             transition: "all 0.4s ease",
//           },
//         }}
//       >
//         <motion.div
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ type: "spring", stiffness: 70 }}
//         >
//           <Box sx={{ p: 2 }}>
//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               align="center"
//               sx={{ mb: 2 }}
//             >
//               Menu
//             </Typography>
//             <Divider />
//             <List>
//               {navLinks.map((item, idx) => (
//                 <motion.div
//                   key={idx}
//                   whileHover={{ scale: 1.05, x: 10 }}
//                   transition={{ type: "spring", stiffness: 200 }}
//                 >
//                   <ListItem
//                     button
//                     onClick={() => {
//                       navigate(item.path);
//                       toggleDrawer();
//                     }}
//                     sx={{
//                       borderRadius: 2,
//                       my: 0.5,
//                       "&:hover": {
//                         background: darkMode
//                           ? "rgba(255,255,255,0.1)"
//                           : "rgba(25,118,210,0.1)",
//                       },
//                     }}
//                   >
//                     <ListItemText primary={item.name} />
//                   </ListItem>
//                 </motion.div>
//               ))}
//             </List>
//           </Box>
//         </motion.div>
//       </Drawer>
//     </>
//   );
// }



