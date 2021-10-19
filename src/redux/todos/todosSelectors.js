import { createSelector } from '@reduxjs/toolkit';

export const getTodos = state => state.todos;

export const getLoading = state => state.todos.isLoading;

export const getFilter = state => state.contacts.filter;

export const getVisibleContacts = createSelector(
  [getTodos, getFilter],
  (todos, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return todos.filter(({ title }) =>
      title.toLowerCase().includes(normalizedFilter),
    );
  },
);
