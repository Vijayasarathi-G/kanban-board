Here is the **complete `README.md`** with **all required sections** in a single file, ready to copy-paste or save in your project:

---

```md
# 🗂️ Kanban Board - React Component with MUI & DnD

A fully customizable **Kanban Board** built with **React**, **Material-UI (MUI)**, and **@hello-pangea/dnd**. It supports:

✅ Drag-and-drop  
✅ Conditional drop/drag rules  
✅ Expand/Collapse columns (configurable per column)  
✅ Custom headers and card components  
✅ Snackbar alerts for invalid operations

---

## 🚀 Features

- 🧲 Drag & Drop support using `@hello-pangea/dnd`
- 🔒 Conditional drop logic via `dropAllowedTo` and `dragAllowedFrom`
- 🎨 Customizable colors per column
- ✏️ Custom header and card rendering
- 🚫 Visual indication for disallowed drops
- 🔄 Expand/Collapse columns conditionally
- 🔔 Snackbar alerts for invalid moves

---

## 📦 Installation

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @hello-pangea/dnd
```

---

## 📁 File Structure

```bash
src/
  components/
    KanbanBoard.jsx   # Main Kanban board with drag context
    Section.jsx       # Individual columns
    Card.jsx          # Individual card items
```

---

## ⚙️ How to Use

### Import & Initialize

```jsx
import KanbanBoard from './components/KanbanBoard';
import { useState } from 'react';

const initialColumns = [
  {
    id: "todo",
    title: "To Do",
    color: "#fff3e0",
    headerColor: "#fb8c00",
    cards: [{ id: "c1", title: "Plan architecture" }],
    dropAllowedTo: ["inprogress", "withdrawn"],
    dragAllowedfrom: ["backlog"],
    expandable: true
  },
  {
    id: "inprogress",
    title: "In Progress",
    color: "#e3f2fd",
    headerColor: "#42a5f5",
    cards: [{ id: "c2", title: "Develop UI" }],
    dropAllowedTo: ["completed"],
    expandable: true
  },
  {
    id: "completed",
    title: "Completed",
    color: "#e8f5e9",
    headerColor: "#66bb6a",
    cards: [],
    expandable: false
  }
];

const App = () => {
  const [columns, setColumns] = useState(initialColumns);

  return (
    <KanbanBoard
      columns={columns}
      setColumns={setColumns}
    />
  );
};
```

---

## 🔧 KanbanBoard Props

| Prop            | Type        | Description                                                                 |
|-----------------|-------------|-----------------------------------------------------------------------------|
| `columns`       | `Array`     | List of columns with cards and optional rules                              |
| `setColumns`    | `Function`  | State setter to update column/card data                                    |
| `onEditCard`    | `Function`  | Optional: callback when editing a card                                     |
| `onDeleteCard`  | `Function`  | Optional: callback when deleting a card                                    |
| `CustomHeader`  | `Component` | Optional: custom header rendering component                                |
| `CustomCard`    | `Component` | Optional: custom card rendering component                                  |

---

## 📄 Column Properties

| Property         | Type      | Description                                                                 |
|------------------|-----------|-----------------------------------------------------------------------------|
| `id`             | `string`  | Unique ID for the column                                                    |
| `title`          | `string`  | Display name                                                                |
| `cards`          | `array`   | Array of card objects with `id` and `title`                                 |
| `color`          | `string`  | Background color                                                            |
| `headerColor`    | `string`  | Header color                                                                |
| `dropAllowedTo`  | `array`   | Optional: allows drop **to** these column IDs                               |
| `dragAllowedfrom`| `array`   | Optional: allows drag **from** these column IDs                             |
| `expandable`     | `boolean` | Optional: enable expand/collapse toggle for this column                     |

---

## 📦 Card Object Format

```js
{
  id: "c1",
  title: "Build Login Page"
}
```

---

## 🎨 Customization

### ✅ Custom Header

You can override the default column header with your own component:

```jsx
const CustomHeader = ({ column, expanded }) => (
  <div style={{ color: "purple" }}>
    {column.title} ({expanded ? '↓' : '→'})
  </div>
);

<KanbanBoard columns={columns} setColumns={setColumns} CustomHeader={CustomHeader} />
```

---

### ✅ Custom Card

```jsx
const CustomCard = ({ card }) => (
  <div style={{ padding: 8, background: "#fff", borderRadius: 4 }}>
    {card.title}
  </div>
);

<KanbanBoard columns={columns} setColumns={setColumns} CustomCard={CustomCard} />
```

---

## 🚫 Conditional Rules

### Example:

```js
{
  id: "inprogress",
  dropAllowedTo: ["completed"],
  dragAllowedfrom: ["todo", "backlog"]
}
```

#### Behavior:

- ✅ Cards from `todo` or `backlog` can be dragged into `inprogress`
- ❌ Cards from `inprogress` **cannot** be dropped into any column except `completed`

A red border and snackbar will notify users of invalid moves.

---

## 🧪 Future Enhancements

- 🧠 Save board state to localStorage / backend
- 👤 Add multi-user support
- 🧩 Reorder columns via drag-and-drop
- 🕒 Card due dates and reminders

---

## 🧑‍💻 Author

**Vijay**  
Crafted with ❤️ using React, MUI, and DnD

---

## 📜 License

MIT License
```

---

MIT License

Copyright (c) 2025 Vijay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...

[Full text of the MIT license continues...]
