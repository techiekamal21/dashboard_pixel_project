import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Analytics,
  People,
  ShoppingCart,
  Inventory,
  Assessment,
  TrendingUp,
  Settings,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDarkMode } from '../App';

const MiniSidebar = ({ selectedItem, onItemSelect, onExpand }) => {
  const { darkMode } = useDarkMode();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'analytics', label: 'Analytics', icon: <Analytics /> },
    { id: 'customers', label: 'Customers', icon: <People /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart /> },
    { id: 'products', label: 'Products', icon: <Inventory /> },
    { id: 'reports', label: 'Reports', icon: <Assessment /> },
    { id: 'trends', label: 'Trends', icon: <TrendingUp /> },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 64,
        width: 60,
        height: 'calc(100vh - 64px)',
        background: darkMode 
          ? 'rgba(30, 30, 30, 0.9)' 
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRight: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        zIndex: 1000,
      }}
    >
      {menuItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Tooltip title={item.label} placement="right">
            <IconButton
              onClick={() => {
                onItemSelect(item.id);
                if (item.id !== selectedItem) {
                  onExpand();
                }
              }}
              sx={{
                mb: 1,
                width: 44,
                height: 44,
                color: selectedItem === item.id 
                  ? 'primary.main' 
                  : darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                backgroundColor: selectedItem === item.id 
                  ? 'rgba(25, 118, 210, 0.1)' 
                  : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        </motion.div>
      ))}
      
      <Box sx={{ mt: 'auto' }}>
        <Tooltip title="Settings" placement="right">
          <IconButton
            sx={{
              width: 44,
              height: 44,
              color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <Settings />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default MiniSidebar;