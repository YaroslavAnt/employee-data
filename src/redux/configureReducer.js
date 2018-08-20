import { createStore } from 'redux';
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

const contactReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.payload];

    case DELETE:
      return [...state].filter(el => el.name !== action.payload);

    case CORRECT:
      console.log(
        [...state].filter(
          el => el !== state.splice(action.index, 1, action.contact),
        ),
      );

      return [...state].filter(
        el => el !== state.splice(action.index, 1, action.contact),
      );

    default:
      return state;
  }
};

const persistedStore = loadState();

export const store = createStore(contactReducer, persistedStore);

store.subscribe(() => {
  saveState(store.getState());
});
