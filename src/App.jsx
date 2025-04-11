// File: src/App.jsx

import React, { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import EditCardModal from "./components/EditCardModal";
import CardItem from "./components/Card"; // default card
import { Snackbar, Alert } from "@mui/material";

// Optional CustomHeader component
const CustomHeader = ({ column, expanded }) => (
    <div
        style={{
            writingMode: expanded ? "horizontal-tb" : "vertical-rl",
            transform: expanded ? "none" : "rotate(180deg)",
            textAlign: "center",
            backgroundColor: column.headerColor || "#333",
            color: "white",
            padding: 4,
            borderRadius: 4,
            flexGrow: 1,
        }}
    >
        {column.title}
    </div>
);

const App = () => {
    const [columns, setColumns] = useState([
        {
            id: "todo",
            title: "To Do",
            color: "#fce4ec",
            headerColor: "#ec407a",
            allowToggle: true
        },
        {
            id: "inprogress",
            title: "In Progress",
            color: "#e3f2fd",
            headerColor: "#42a5f5",
            dragAllowedfrom: ["todo"],
            dropAllowedTo: ["completed", "hold"],
            allowToggle: true
        },
        {
            id: "hold",
            title: "On Hold",
            color: "#f3e5f5",
            headerColor: "#ab47bc"
        },
        {
            id: "withdrawn",
            title: "Withdrawn",
            color: "#fbe9e7",
            headerColor: "#ff7043"
        },
        {
            id: "completed",
            title: "Completed",
            color: "#e8f5e9",
            headerColor: "#66bb6a",
            allowToggle: true
        },
        {
            id: "done",
            title: "Done",
            color: "#ede7f6",
            headerColor: "#7e57c2"
        }
    ]);

    const [data, setData] = useState([
        { id: "c1", title: "Setup project", columnId: "todo", tags: ["setup"], priority: "high", assignedTo: "Alice" },
        { id: "c2", title: "Build UI", columnId: "inprogress", tags: ["ui"], priority: "medium", assignedTo: "Bob" },
        { id: "c3", title: "Write tests", columnId: "todo", priority: "low", assignedTo: "Charlie" },
        { id: "c4", title: "Demo review", columnId: "completed" },
        { id: "c5", title: "Bug Fix", columnId: "hold", tags: ["bug"], assignedTo: "David" },
        { id: "c6", title: "Retrospective", columnId: "done" },
        { id: "c7", title: "Requirements analysis", columnId: "withdrawn" },
    ])
    const [editCard, setEditCard] = useState(null);
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

    const handleEditCard = (card, columnId) => {
        setEditCard({ ...card, columnId });
    };

    const handleSaveCard = (updatedCard) => {
        setColumns((prevCols) =>
            prevCols.map((col) =>
                col.id === editCard.columnId
                    ? {
                        ...col,
                        cards: col.cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
                    }
                    : col
            )
        );
        setToast({ open: true, message: "Card updated", severity: "success" });
    };

    const handleDeleteCard = (card, columnId) => {
        setColumns((prevCols) =>
            prevCols.map((col) =>
                col.id === columnId
                    ? { ...col, cards: col.cards.filter((c) => c.id !== card.id) }
                    : col
            )
        );
        setToast({ open: true, message: "Card deleted", severity: "warning" });
    };

    const isDropAllowed = (sourceId, destId) => {
        // Example: Prevent moving from todo → done directly
        if (sourceId === "todo" && destId === "done") return false;
        return true;
    };

    return (
        <>
            <KanbanBoard
                columns={columns}
                setColumns={setColumns}
                onEditCard={handleEditCard}
                onDeleteCard={handleDeleteCard}
                isDropAllowed={isDropAllowed}
                CustomHeader={CustomHeader}
                CustomCard={CardItem}
                cards={data}
            />

            <EditCardModal
                open={!!editCard}
                onClose={() => setEditCard(null)}
                onSave={handleSaveCard}
                card={editCard}
            />

            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast({ ...toast, open: false })}
            >
                <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default App;
