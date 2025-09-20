import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const MetricCard = ({ title, value, change, icon, color, prefix = '', suffix = '' }) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="metric-card"
    >
      <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: `${color}15`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
            <Chip
              icon={isPositive ? <TrendingUp /> : <TrendingDown />}
              label={`${isPositive ? '+' : ''}${change}%`}
              size="small"
              color={isPositive ? 'success' : 'error'}
              variant="outlined"
            />
          </Box>
          
          <Typography variant="h4" component="div" fontWeight="bold" mb={1}>
            {prefix}
            <CountUp
              end={value}
              duration={2}
              separator=","
              decimals={suffix === '%' ? 1 : 0}
            />
            {suffix}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
        
        {/* Animated background gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60px',
            height: '60px',
            background: `linear-gradient(135deg, ${color}20, ${color}05)`,
            borderRadius: '0 12px 0 60px',
            zIndex: 0,
          }}
        />
      </Card>
    </motion.div>
  );
};

export default MetricCard;