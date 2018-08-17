import { createStore } from 'redux';
import ContactList from './mock';
import { loadState, saveState } from './localStorage';

const ADD = 'ADD';
export const addContact = contact => ({
  type: ADD,
  payload: contact,
});

const DELETE = 'DELETE';
export const deleteContact = name => ({
  type: DELETE,
  payload: name,
});

const CORRECT = 'CORRECT';
export const correctContact = (index, contact) => ({
  type: CORRECT,
  contact,
  index: +index,
});

const contactReducer = (state = ContactList(), action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.payload];

    case DELETE:
      return [...state].filter(el => el.name !== action.payload);

    case CORRECT:
      return [...state].filter(el => el !== state.splice(action.index, 1, action.contact));

    default:
      return state;
  }
};

const persistedStore = loadState();

export const store = createStore(contactReducer, persistedStore);

store.subscribe(() => {
  saveState(store.getState());
});
