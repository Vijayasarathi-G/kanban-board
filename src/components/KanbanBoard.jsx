import React from "react";
import Section from "./Section";
import { DragDropContext } from "@hello-pangea/dnd";
import { Snackbar } from "@mui/material";

const KanbanBoard = ({ columns, setColumns, onEditCard, onDeleteCard, CustomHeader, CustomCard }) => {
    const [snackbar, setSnackbar] = React.useState({ open: false, message: "" });

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) return;

        const sourceCol = columns.find(col => col.id === source.droppableId);
        const destCol = columns.find(col => col.id === destination.droppableId);

        // Check if drop is allowed based on source and destination
        if (sourceCol?.dropAllowedTo && !sourceCol.dropAllowedTo.includes(destCol.id)) {
            setSnackbar({ open: true, message: `Cannot move card from ${sourceCol.title} to ${destCol.title}` });
            return;
        }

        const sourceCards = [...sourceCol.cards];
        const [removed] = sourceCards.splice(source.index, 1);

        if (sourceCol === destCol) {
            sourceCards.splice(destination.index, 0, removed);
            const updatedCol = { ...sourceCol, cards: sourceCards };
            const updatedColumns = columns.map(col => col.id === updatedCol.id ? updatedCol : col);
            setColumns(updatedColumns);
        } else {
            const destCards = [...destCol.cards];
            destCards.splice(destination.index, 0, removed);
            const updatedColumns = columns.map(col => {
                if (col.id === sourceCol.id) return { ...col, cards: sourceCards };
                if (col.id === destCol.id) return { ...col, cards: destCards };
                return col;
            });
            setColumns(updatedColumns);
        }
    };

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "nowrap", padding: 16 }}>
                    {columns.map((column) => (
                        <Section
                            key={column.id}
                            column={column}
                            onEditCard={onEditCard}
                            onDeleteCard={onDeleteCard}
                            columns={columns}
                            CustomHeader={CustomHeader}
                            CustomCard={CustomCard}
                        />
                    ))}
                </div>
            </DragDropContext>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ open: false, message: "" })}
                message={snackbar.message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </>
    );
};

export default KanbanBoard;