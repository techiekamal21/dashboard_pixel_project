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
import MiniSidebar from './MiniSidebar';

const Dashboard = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      {/* Full Sidebar */}
      <Sidebar 
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        selectedItem={selectedMenuItem}
        onItemSelect={setSelectedMenuItem}
      />
      
      {/* Mini Sidebar - shows when main sidebar is closed */}
      {!sidebarOpen && (
        <MiniSidebar 
          selectedItem={selectedMenuItem}
          onItemSelect={setSelectedMenuItem}
          onExpand={() => setSidebarOpen(true)}
        />
      )}
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          paddingLeft: !sidebarOpen ? '60px' : 0,
          background: darkMode ? '#121212' : '#f8f9fa',
          minHeight: '100vh',
          transition: 'padding-left 0.3s ease',
        }}
      >
        {/* Header */}
        <Box 
          sx={{ 
            background: darkMode ? '#1a1a1a' : '#ffffff',
            borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => setSidebarOpen(!sidebarOpen)}
              sx={{ 
                color: darkMode ? 'white' : '#333',
                display: sidebarOpen ? 'none' : 'flex'
              }}
            >
              <Menu />
            </IconButton>
            <Box>
              <Typography variant="h5" fontWeight="600" sx={{ color: darkMode ? 'white' : '#333' }}>
                Welcome John Doe! 👋
              </Typography>
              <Typography variant="body2" sx={{ color: darkMode ? '#b3b3b3' : '#666', mt: 0.5 }}>
                Here's what's happening with your business today
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              background: darkMode ? '#2a2a2a' : '#f0f0f0', 
              px: 2, 
              py: 1, 
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Typography variant="body2" sx={{ color: darkMode ? '#b3b3b3' : '#666' }}>
                📅 This Week
              </Typography>
              <Typography variant="body2" fontWeight="500" sx={{ color: darkMode ? 'white' : '#333' }}>
                Sep 15 - Sep 21
              </Typography>
            </Box>
            <IconButton 
              onClick={() => setDarkMode(!darkMode)}
              sx={{ color: darkMode ? 'white' : '#333' }}
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton sx={{ color: darkMode ? 'white' : '#333' }}>
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: '#4CAF50', width: 36, height: 36 }}>
              JD
            </Avatar>
          </Box>
        </Box>

        {selectedMenuItem === 'dashboard' ? (
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
        ) : (
          // Other menu items content
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center'
              }}
            >
              <Box sx={{ fontSize: '120px', mb: 2 }}>
                {selectedMenuItem === 'analytics' && '📊'}
                {selectedMenuItem === 'transactions' && '💳'}
                {selectedMenuItem === 'customers' && '👥'}
                {selectedMenuItem === 'orders' && '🛒'}
                {selectedMenuItem === 'products' && '📦'}
                {selectedMenuItem === 'reports' && '📋'}
                {selectedMenuItem === 'settings' && '⚙️'}
              </Box>
              <Typography variant="h4" fontWeight="600" sx={{ color: darkMode ? 'white' : '#333', mb: 2 }}>
                {selectedMenuItem.charAt(0).toUpperCase() + selectedMenuItem.slice(1)} Section
              </Typography>
              <Typography variant="body1" sx={{ color: darkMode ? '#b3b3b3' : '#666', maxWidth: 400 }}>
                This section is ready for your content. Add your {selectedMenuItem} features here to complete your dashboard experience.
              </Typography>
            </Box>
          </Container>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;