import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Badge,
} from '@mui/material';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
  Notifications,
  Settings,
  DarkMode,
  LightMode,
  Menu,
} from '@mui/icons-material';
import { useDarkMode } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import RecentActivity from './RecentActivity';
import TopProducts from './TopProducts';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
  const [metrics, setMetrics] = useState({
    revenue: { value: 0, target: 124500, change: 12.5 },
    users: { value: 0, target: 8420, change: 8.2 },
    orders: { value: 0, target: 1250, change: -2.1 },
    conversion: { value: 0, target: 3.4, change: 5.7 },
  });

  // Animate numbers on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics({
        revenue: { value: 124500, target: 124500, change: 12.5 },
        users: { value: 8420, target: 8420, change: 8.2 },
        orders: { value: 1250, target: 1250, change: -2.1 },
        conversion: { value: 3.4, target: 3.4, change: 5.7 },
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar 
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        selectedItem={selectedMenuItem}
        onItemSelect={setSelectedMenuItem}
      />
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          background: darkMode 
            ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          transition: 'margin 0.3s ease',
          marginLeft: sidebarOpen ? 0 : '-280px',
        }}
      >
        {/* Header */}
        <AppBar position="static" elevation={0} sx={{ background: 'transparent' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', fontWeight: 600 }}>
              Dashboard
            </Typography>
            <IconButton 
              color="inherit" 
              onClick={() => setDarkMode(!darkMode)}
              sx={{ mr: 1 }}
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Settings />
            </IconButton>
            <Avatar sx={{ ml: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
              JD
            </Avatar>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Metrics Row */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div variants={itemVariants}>
                  <MetricCard
                    title="Total Revenue"
                    value={metrics.revenue.value}
                    change={metrics.revenue.change}
                    icon={<AttachMoney />}
                    color="#4caf50"
                    prefix="$"
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div variants={itemVariants}>
                  <MetricCard
                    title="Active Users"
                    value={metrics.users.value}
                    change={metrics.users.change}
                    icon={<People />}
                    color="#2196f3"
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div variants={itemVariants}>
                  <MetricCard
                    title="Total Orders"
                    value={metrics.orders.value}
                    change={metrics.orders.change}
                    icon={<ShoppingCart />}
                    color="#ff9800"
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div variants={itemVariants}>
                  <MetricCard
                    title="Conversion Rate"
                    value={metrics.conversion.value}
                    change={metrics.conversion.change}
                    icon={<TrendingUp />}
                    color="#9c27b0"
                    suffix="%"
                  />
                </motion.div>
              </Grid>
            </Grid>

            {/* Main Chart - Full Width */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <ChartCard />
                </motion.div>
              </Grid>
            </Grid>

            {/* Bottom Row - Products and Activity */}
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <motion.div variants={itemVariants}>
                  <TopProducts />
                </motion.div>
              </Grid>
              <Grid item xs={12} lg={6}>
                <motion.div variants={itemVariants}>
                  <RecentActivity />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;