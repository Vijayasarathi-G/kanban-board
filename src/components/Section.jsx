import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import CardItem from "./Card";
import { IconButton, Typography, Paper } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Section = ({ column, onEditCard, onDeleteCard, columns, CustomHeader, CustomCard }) => {
    const [expanded, setExpanded] = useState(true);

    const isDropAllowed = (sourceId) => {
        if (!sourceId) return true;
        const sourceCol = columns.find(col => col.id === sourceId);
        return sourceCol?.dropAllowedTo?.includes(column.id) ?? true;
    };

    return (
        <Paper style={{ backgroundColor: column.color || '#f0f0f0', padding: 8, width: expanded ? 250 : 'fit-content', transition: "width 0.3s", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ backgroundColor: column.headerColor || "#1976d2", display: "flex", flexDirection: expanded ? "row" : 'column', alignItems: "center", gap: 8, width: '100%', minHeight: expanded ? 'fit-content' : '-webkit-fill-available' }}>
                {column?.expandable && (
                    <IconButton size="small" onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                )}
                {CustomHeader ? (
                    <CustomHeader column={column} expanded={expanded} />
                ) : (
                    <Typography
                        variant="subtitle2"
                        style={{
                            writingMode: expanded ? "horizontal-tb" : "vertical-rl",
                            transform: expanded ? "none" : "rotate(180deg)",
                            textAlign: "center",
                            color: "white",
                            padding: 4,
                            borderRadius: 4,
                            flexGrow: 1
                        }}
                    >
                        {column.title}
                    </Typography>
                )}
            </div>

            {expanded && (
                <Droppable droppableId={column.id}>
                    {(provided, snapshot) => {
                        const isAllowed = snapshot.draggingOverWith ? isDropAllowed(snapshot.draggingOverWith) : true;
                        return (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    marginTop: 8,
                                    minHeight: 50,
                                    width: '100%',
                                    backgroundColor: snapshot.isDraggingOver ? (isAllowed ? '#e8f5e9' : '#ffcdd2') : 'transparent',
                                    border: snapshot.isDraggingOver && !isAllowed ? '2px dashed red' : '2px dashed transparent',
                                    borderRadius: 4,
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {column.cards.map((card, index) => {
                                    const CardComponent = CustomCard || CardItem;
                                    const sourceCol = columns.find(col => col.cards.some(c => c.id === card.id));
                                    const isCardMovable = !sourceCol?.dragAllowedfrom || sourceCol.dragAllowedfrom.includes(column.id);
                                    return (
                                        <div key={card.id} style={{ opacity: isCardMovable ? 1 : 0.5 }}>
                                            <CardComponent
                                                card={card}
                                                index={index}
                                                columnId={column.id}
                                                onEdit={onEditCard}
                                                onDelete={onDeleteCard}
                                            />
                                        </div>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            )}
        </Paper>
    );
};

export default Section;
