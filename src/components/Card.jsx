// File: src/components/Card.jsx

import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
    Card,
    CardContent,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CardItem = ({ card, index, onEdit, onDelete, columnId }) => {
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const handleDoubleClick = () => {
        if (onEdit) onEdit(card, columnId);
    };

    const handleDeleteClick = () => {
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (onDelete) onDelete(card, columnId);
        setConfirmOpen(false);
    };

    return (
        <>
            <Draggable draggableId={card.id} index={index}>
                {(provided) => (
                    <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{ mb: 1, position: "relative", cursor: "pointer" }}
                        onDoubleClick={handleDoubleClick}
                    >
                        <IconButton
                            size="small"
                            sx={{ position: "absolute", top: 4, right: 4 }}
                            onClick={handleDeleteClick}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                        <CardContent>
                            <Typography variant="body2">{card.title}</Typography>
                        </CardContent>
                    </Card>
                )}
            </Draggable>

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Are you sure you want to delete this card?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CardItem;
