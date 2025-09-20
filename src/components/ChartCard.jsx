import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

const ChartCard = () => {
  const [chartType, setChartType] = useState('revenue');

  const revenueData = [
    { name: 'Jan', value: 4000, previous: 3500 },
    { name: 'Feb', value: 3000, previous: 2800 },
    { name: 'Mar', value: 5000, previous: 4200 },
    { name: 'Apr', value: 4500, previous: 4000 },
    { name: 'May', value: 6000, previous: 5200 },
    { name: 'Jun', value: 5500, previous: 5000 },
    { name: 'Jul', value: 7000, previous: 6200 },
  ];

  const usersData = [
    { name: 'Jan', value: 1200, previous: 1000 },
    { name: 'Feb', value: 1800, previous: 1400 },
    { name: 'Mar', value: 2200, previous: 1800 },
    { name: 'Apr', value: 2800, previous: 2400 },
    { name: 'May', value: 3200, previous: 2800 },
    { name: 'Jun', value: 3800, previous: 3400 },
    { name: 'Jul', value: 4200, previous: 3800 },
  ];

  const handleChartChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  const currentData = chartType === 'revenue' ? revenueData : usersData;
  const chartColor = chartType === 'revenue' ? '#4caf50' : '#2196f3';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect"
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{ color: chartColor }}>
            Current: {chartType === 'revenue' ? '$' : ''}{payload[0].value.toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Previous: {chartType === 'revenue' ? '$' : ''}{payload[1]?.value.toLocaleString()}
          </Typography>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <Card sx={{ 
      height: '100%', 
      width: '100%',
      border: 'none',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="600">
            Analytics Overview
          </Typography>
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartChange}
            size="small"
          >
            <ToggleButton value="revenue">Revenue</ToggleButton>
            <ToggleButton value="users">Users</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box className="chart-container" sx={{ height: { xs: 300, lg: 450 }, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <motion.div
              key={chartType}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', height: '100%' }}
            >
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                  tickFormatter={(value) => chartType === 'revenue' ? `$${value/1000}k` : `${value/1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={3}
                  fill="url(#colorGradient)"
                  dot={{ fill: chartColor, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: chartColor, strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="previous"
                  stroke="#ccc"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="none"
                  dot={false}
                />
              </AreaChart>
            </motion.div>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartCard;