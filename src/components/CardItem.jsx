import React from "react";
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const CardItem = ({ card, onDelete, onEdit }) => {
    return (
        <Card
            sx={{
                mb: 2,
                cursor: "pointer",
                position: "relative",
                "&:hover .card-actions": { opacity: 1 },
            }}
            onDoubleClick={() => onEdit(card)}
        >
            <CardContent>
                <Typography variant="body1">{card.content}</Typography>
                <div
                    className="card-actions"
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        display: "flex",
                        opacity: 0,
                        transition: "opacity 0.2s",
                    }}
                >
                    <Tooltip title="Edit">
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(card);
                            }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(card);
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardItem;
