import React from 'react';
import { Typography } from '@mui/material';

const CustomHeader = ({ column }) => {
    return <Typography variant="h6">{column.title}</Typography>;
};

export default CustomHeader;
