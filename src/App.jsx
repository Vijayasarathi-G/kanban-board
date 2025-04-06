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
            title: "Todo",
            color: "#fffde7",
            headerColor: "#fbc02d",
            cards: [
                { id: "t1", title: "Initial Research" },
                { id: "t2", title: "Requirement Gathering" }
            ],
            // No dragAllowedfrom or dropAllowedTo — allows all movements by default
        },
        {
            id: "new",
            title: "New Requests",
            color: "#fce4ec",
            headerColor: "#ec407a",
            cards: [
                { id: "n1", title: "API Integration" }
            ],
            dropAllowedTo: ["inprogress", "rejected"]
        },
        {
            id: "inprogress",
            title: "In Progress",
            color: "#e3f2fd",
            headerColor: "#42a5f5",
            cards: [
                { id: "p1", title: "Develop UI" }
            ],
            dragAllowedfrom: ["todo", "new"],
            dropAllowedTo: ["completed", "withdrawn"],
            expandable: true
        },
        {
            id: "completed",
            title: "Completed",
            color: "#e8f5e9",
            headerColor: "#66bb6a",
            cards: [
                { id: "c1", title: "Code Review" }
            ],
            dragAllowedfrom: ["inprogress"], // No dropAllowedTo means this column can drop to any column
            expandable: true

        },
        {
            id: "withdrawn",
            title: "Withdrawn",
            color: "#f3e5f5",
            headerColor: "#ab47bc",
            cards: [],
            // No restrictions — open for any drag/drop
        },
        {
            id: "rejected",
            title: "Rejected",
            color: "#ffebee",
            headerColor: "#ef5350",
            cards: [
                { id: "r1", title: "Out of Scope" }
            ],
            dragAllowedfrom: ["new", "todo"],
            dropAllowedTo: []
            // Drop allowed to no one — cards can’t be moved out from here
        }
    ]);

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
