import React from 'react';
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
  LinearProgress,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';

const TopProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      sales: 1250,
      revenue: 87500,
      growth: 15.2,
      color: '#4caf50',
      image: '🎧',
    },
    {
      id: 2,
      name: 'Smart Watch',
      sales: 980,
      revenue: 68600,
      growth: 8.7,
      color: '#2196f3',
      image: '⌚',
    },
    {
      id: 3,
      name: 'Laptop Stand',
      sales: 750,
      revenue: 22500,
      growth: -2.1,
      color: '#ff9800',
      image: '💻',
    },
    {
      id: 4,
      name: 'USB-C Cable',
      sales: 2100,
      revenue: 31500,
      growth: 22.5,
      color: '#9c27b0',
      image: '🔌',
    },
  ];

  const maxSales = Math.max(...products.map(p => p.sales));

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
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight="600" mb={3}>
          Top Products
        </Typography>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <List sx={{ p: 0 }}>
            {products.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ListItem
                  sx={{
                    px: 0,
                    py: 2,
                    borderBottom: index < products.length - 1 ? '1px solid #f0f0f0' : 'none',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: `${product.color}15`,
                        color: product.color,
                        fontSize: '1.2rem',
                      }}
                    >
                      {product.image}
                    </Avatar>
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="body2" fontWeight="500">
                          {product.name}
                        </Typography>
                        <Chip
                          label={`${product.growth > 0 ? '+' : ''}${product.growth}%`}
                          size="small"
                          color={product.growth >= 0 ? 'success' : 'error'}
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Typography variant="caption" color="text.secondary">
                            {product.sales} sales
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ${product.revenue.toLocaleString()}
                          </Typography>
                        </Box>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={(product.sales / maxSales) * 100}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: `${product.color}20`,
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: product.color,
                                borderRadius: 3,
                              },
                            }}
                          />
                        </motion.div>
                      </Box>
                    }
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;