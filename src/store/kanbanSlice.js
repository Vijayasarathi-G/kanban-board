import {createSlice} from "@reduxjs/toolkit";
import undoable from "redux-undo";

const initialState = {
    columns: [],
    cards: [],
};

const kanbanCoreSlice = createSlice({
    name: "kanban",
    initialState,
    reducers: {
        updateColumnsFromCards: (state, action) => {
            const {columns, cards} = action.payload;
            state.columns = columns.map(col => ({
                ...col,
                cards: cards.filter(card => card.columnId === col.id).sort((a, b) => a.order - b.order),
            }));
            state.cards = cards;
        },
        moveCard: (state, action) => {
            const { source, destination } = action.payload;

            const sourceColIndex = state.columns.findIndex(col => col.id === source.droppableId);
            const destColIndex = state.columns.findIndex(col => col.id === destination.droppableId);

            const sourceCol = { ...state.columns[sourceColIndex], cards: [...state.columns[sourceColIndex].cards] };
            const destCol = (sourceColIndex === destColIndex)
                ? sourceCol
                : { ...state.columns[destColIndex], cards: [...state.columns[destColIndex].cards] };

            const [movedCard] = sourceCol.cards.splice(source.index, 1);
            movedCard.columnId = destCol.id;

            destCol.cards.splice(destination.index, 0, movedCard);

            // Recalculate order in both columns
            sourceCol.cards.forEach((card, idx) => card.order = idx);
            if (sourceColIndex !== destColIndex) {
                destCol.cards.forEach((card, idx) => card.order = idx);
            }

            // Update in global cards list
            state.cards = state.cards.map(card => card.id === movedCard.id ? movedCard : card);

            // Rebuild columns list with updated columns
            state.columns = state.columns.map(col => {
                if (col.id === sourceCol.id) return sourceCol;
                if (col.id === destCol.id) return destCol;
                return col;
            });
        },
        updateCard: (state, action) => {
            const updatedCard = action.payload;
            const updatedCards = state.cards.map(card =>
                card.id === updatedCard.id ? {...card, ...updatedCard} : card
            );
            state.cards = updatedCards;
            state.columns = state.columns.map(col => ({
                ...col,
                cards: updatedCards.filter(card => card.columnId === col.id).sort((a, b) => a.order - b.order),
            }));
        },
        deleteCard: (state, action) => {
            const cardId = action.payload;
            const updatedCards = state.cards.filter(card => card.id !== cardId);
            state.cards = updatedCards;
            state.columns = state.columns.map(col => ({
                ...col,
                cards: updatedCards.filter(card => card.columnId === col.id).sort((a, b) => a.order - b.order),
            }));
        },
    },
});

export const {updateColumnsFromCards, updateCard, deleteCard, moveCard} = kanbanCoreSlice.actions;
export const {undo, redo} = kanbanCoreSlice.actions;

export default undoable(kanbanCoreSlice.reducer, {
    limit: 10, // limit history to 10 steps
});
