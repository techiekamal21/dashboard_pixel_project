import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  TrendingUp,
  Payment,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const RecentActivity = () => {
  const [expanded, setExpanded] = useState(false);

  const activities = [
    {
      id: 1,
      type: 'order',
      title: 'New order received',
      description: 'Order #12345 from techiekamal',
      time: '2 minutes ago',
      icon: <ShoppingCart />,
      color: '#4caf50',
      amount: '$299.99',
    },
    {
      id: 2,
      type: 'user',
      title: 'New user registered',
      description: 'techiekamal joined the platform',
      time: '15 minutes ago',
      icon: <Person />,
      color: '#2196f3',
    },
    {
      id: 3,
      type: 'revenue',
      title: 'Revenue milestone reached',
      description: 'Monthly target achieved',
      time: '1 hour ago',
      icon: <TrendingUp />,
      color: '#ff9800',
      amount: '$50,000',
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment processed',
      description: 'Subscription renewal for Premium Plan',
      time: '2 hours ago',
      icon: <Payment />,
      color: '#9c27b0',
      amount: '$99.99',
    },
    {
      id: 5,
      type: 'order',
      title: 'Order shipped',
      description: 'Order #12340 has been dispatched',
      time: '3 hours ago',
      icon: <ShoppingCart />,
      color: '#4caf50',
    },
    {
      id: 6,
      type: 'user',
      title: 'User feedback received',
      description: '5-star review from techiekamal',
      time: '4 hours ago',
      icon: <Person />,
      color: '#2196f3',
    },
  ];

  const visibleActivities = expanded ? activities : activities.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Card sx={{ 
      border: 'none',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      <CardContent sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="600">
            Recent Activity
          </Typography>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <ExpandMore />
          </IconButton>
        </Box>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <List sx={{ p: 0 }}>
            <AnimatePresence>
              {visibleActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                >
                  <ListItem
                    sx={{
                      px: 0,
                      py: 2,
                      borderBottom: index < visibleActivities.length - 1 ? '1px solid #f0f0f0' : 'none',
                    }}
                  >
                    <ListItemAvatar>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: `${activity.color}15`,
                            color: activity.color,
                          }}
                        >
                          {activity.icon}
                        </Avatar>
                      </motion.div>
                    </ListItemAvatar>
                    
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" fontWeight="500">
                            {activity.title}
                          </Typography>
                          {activity.amount && (
                            <Chip
                              label={activity.amount}
                              size="small"
                              sx={{
                                bgcolor: `${activity.color}15`,
                                color: activity.color,
                                fontWeight: 600,
                              }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5}>
                          <Typography variant="body2" color="text.secondary">
                            {activity.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        </motion.div>

        <Collapse in={expanded}>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Additional content when expanded */}
          </motion.div>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;