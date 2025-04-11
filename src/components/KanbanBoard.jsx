// File: src/components/KanbanBoard.jsx

import React, { useEffect, useMemo, useState } from "react";
import Section from "./Section";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Snackbar, TextField, Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateColumnsFromCards, moveCard, undo, redo } from "../store/kanbanSlice";
import { saveAs } from "file-saver";

const KanbanBoard = ({ columns, cards, onEditCard, onDeleteCard, CustomHeader, CustomCard }) => {
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const mappedColumns = useSelector(state => state.kanban.present.columns);

    useEffect(() => {
        dispatch(updateColumnsFromCards({ columns, cards }));
    }, [columns, cards, dispatch]);

    const handleMoveCard = (source, destination) => {
        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) return;

        const sourceCol = mappedColumns.find(col => col.id === source.droppableId);
        const destCol = mappedColumns.find(col => col.id === destination.droppableId);

        if (sourceCol?.dropAllowedTo && !sourceCol.dropAllowedTo.includes(destCol.id)) {
            setSnackbar({ open: true, message: `Cannot move card from ${sourceCol.title} to ${destCol.title}` });
            return;
        }

        dispatch(moveCard({ source, destination }));
    };

    const handleExportJSON = () => {
        const exportData = JSON.stringify(mappedColumns, null, 2);
        const blob = new Blob([exportData], { type: "application/json" });
        saveAs(blob, "kanban_board.json");
    };

    const filteredColumns = mappedColumns.map(col => ({
        ...col,
        cards: col.cards.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }));

    return (
        <>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                <Button onClick={() => dispatch(undo())} variant="contained">Undo</Button>
                <Button onClick={() => dispatch(redo())} variant="contained">Redo</Button>
                <TextField
                    size="small"
                    label="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <Button variant="outlined" onClick={handleExportJSON}>Export JSON</Button>
            </Stack>
            <DndProvider backend={HTML5Backend}>
                <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", padding: 16 }}>
                    {filteredColumns.map((column) => (
                        <Section
                            key={column.id}
                            column={column}
                            onEditCard={onEditCard}
                            onDeleteCard={onDeleteCard}
                            columns={mappedColumns}
                            onMoveCard={handleMoveCard}
                            CustomHeader={CustomHeader}
                            CustomCard={CustomCard}
                        />
                    ))}
                </div>
            </DndProvider>
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
