import { findAllByTestId } from "@testing-library/react";

export const defaultShoppingLists = [
  { id: '28e345d8-3d91-4a31-8e1b-041998fd9d86',
    name: 'Groceries 🍴',
    archived: false,
    isOwner: true,
    items: [{name: "Apples", done: true},
            {name: "Bread", done: true},
            {name: "Milk", done: false},
            {name: "Beef", done: false},
            {name: "Cheese", done: false},
            {name: "Ham", done: false},
            {name: "Jam", done: false}],
  },
  { id: '13eb5f72-6d84-4ca1-b28a-fc111a9d31c5',
    name: 'Electronics 💻',
    archived: true,
    isOwner: false,
    items: [{ name: "Type C Charger", done: false },
            { name: "Switch", done: true },
            { name: "micro SD 128GB", done: false }],
  }
];