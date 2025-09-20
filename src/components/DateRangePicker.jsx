import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Popover,
  Paper,
  Button,
  Chip,
} from '@mui/material';
import {
  CalendarToday,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../App';

const DateRangePicker = () => {
  const { darkMode } = useDarkMode();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRange, setSelectedRange] = useState('This Week');
  
  const dateRanges = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'This Week', value: 'thisWeek' },
    { label: 'Last Week', value: 'lastWeek' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'Last Month', value: 'lastMonth' },
    { label: 'Last 7 Days', value: 'last7Days' },
    { label: 'Last 30 Days', value: 'last30Days' },
    { label: 'Custom Range', value: 'custom' },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRangeSelect = (range) => {
    setSelectedRange(range.label);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box 
        onClick={handleClick}
        sx={{ 
          background: darkMode ? '#2a2a2a' : '#f0f0f0', 
          px: 2, 
          py: 1, 
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: darkMode ? '#3a3a3a' : '#e0e0e0',
            transform: 'scale(1.02)',
          }
        }}
      >
        <CalendarToday sx={{ fontSize: 16, color: darkMode ? '#b3b3b3' : '#666' }} />
        <Typography variant="body2" sx={{ color: darkMode ? '#b3b3b3' : '#666' }}>
          📅 {selectedRange}
        </Typography>
        <Typography variant="body2" fontWeight="500" sx={{ color: darkMode ? 'white' : '#333' }}>
          Sep 15 - Sep 21
        </Typography>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Paper 
            sx={{ 
              p: 2, 
              minWidth: 280,
              background: darkMode ? '#2a2a2a' : '#ffffff',
              border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2, color: darkMode ? 'white' : '#333' }}>
              Select Date Range
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {dateRanges.map((range, index) => (
                <motion.div
                  key={range.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    fullWidth
                    variant={selectedRange === range.label ? 'contained' : 'text'}
                    onClick={() => handleRangeSelect(range)}
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      py: 1,
                      color: selectedRange === range.label 
                        ? 'white' 
                        : darkMode ? '#b3b3b3' : '#333',
                      backgroundColor: selectedRange === range.label 
                        ? '#1976d2' 
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: selectedRange === range.label 
                          ? '#1565c0' 
                          : darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      },
                    }}
                  >
                    {range.label}
                  </Button>
                </motion.div>
              ))}
            </Box>

            <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
              <Typography variant="body2" sx={{ color: darkMode ? '#b3b3b3' : '#666', mb: 1 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label="Compare" 
                  size="small" 
                  variant="outlined"
                  sx={{ color: darkMode ? '#b3b3b3' : '#666' }}
                />
                <Chip 
                  label="Export" 
                  size="small" 
                  variant="outlined"
                  sx={{ color: darkMode ? '#b3b3b3' : '#666' }}
                />
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Popover>
    </>
  );
};

export default DateRangePicker;