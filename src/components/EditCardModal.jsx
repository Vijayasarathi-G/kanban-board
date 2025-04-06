// File: src/components/EditCardModal.jsx

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from "@mui/material";

const EditCardModal = ({ open, onClose, onSave, card }) => {
    const [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(card?.title || "");
    }, [card]);

    const handleSave = () => {
        if (onSave) {
            onSave({ ...card, title });
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Card</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                    sx={{ mt: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCardModal;
