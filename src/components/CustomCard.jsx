import React from 'react';
import { Paper, Typography } from '@mui/material';

const CustomCard = ({ card }) => (
    <Paper sx={{ p: 2 }}>
        <Typography>{card.content}</Typography>
    </Paper>
);

export default CustomCard;
