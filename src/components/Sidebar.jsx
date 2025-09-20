import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Analytics,
  People,
  ShoppingCart,
  Settings,
  TrendingUp,
  Inventory,
  Assessment,
  Menu,
  ChevronLeft,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDarkMode } from '../App';

const Sidebar = ({ open, onToggle, selectedItem, onItemSelect }) => {
  const { darkMode } = useDarkMode();
  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: <DashboardIcon />, active: true },
    { id: 'analytics', label: 'Analytics', icon: <Analytics /> },
    { id: 'transactions', label: 'Transactions', icon: <Assessment /> },
    { id: 'customers', label: 'Customers', icon: <People /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart /> },
    { id: 'products', label: 'Products', icon: <Inventory /> },
    { id: 'reports', label: 'Reports', icon: <TrendingUp /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> },
  ];

  const drawerWidth = 280;

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: darkMode 
            ? '#1a1a1a' 
            : '#ffffff',
          border: 'none',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          borderRight: darkMode 
            ? '1px solid rgba(255,255,255,0.1)' 
            : '1px solid rgba(0,0,0,0.08)',
        },
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box 
            sx={{ 
              width: 32, 
              height: 32, 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #4CAF50, #45a049)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            D
          </Box>
          <Typography variant="h6" fontWeight="600" sx={{ color: darkMode ? 'white' : '#333' }}>
            Dashboard
          </Typography>
        </Box>
        <IconButton onClick={onToggle} size="small">
          <ChevronLeft />
        </IconButton>
      </Box>
      
      <Divider />
      
      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => onItemSelect(item.id)}
                selected={selectedItem === item.id}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(8px)',
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.16)',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedItem === item.id ? 'primary.main' : 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: selectedItem === item.id ? 600 : 400,
                      color: selectedItem === item.id ? 'primary.main' : 'text.primary',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>
      
      <Divider sx={{ mt: 'auto' }} />
      
      <List sx={{ px: 1, py: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 2,
              mx: 1,
              '&:hover': {
                transform: 'translateX(8px)',
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;