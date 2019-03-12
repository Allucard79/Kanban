// Import Actions
import omit from 'lodash/omit';
import {
  CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, EDIT_NOTE, CREATE_NOTES,
} from './NoteActions';


// Initial State
const initialState = {};

export default function notes(state = initialState, action) {
  switch (action.type) {
    case CREATE_NOTE:
    case UPDATE_NOTE:
      return { ...state, [action.note.id]: action.note };

    case DELETE_NOTE:
      return omit(state, action.noteId);

    case EDIT_NOTE: {
      const note = { ...state[action.noteId], editing: true };
      return { ...state, [action.noteId]: note };
    }
    case CREATE_NOTES:
      return { ...action.notes };

    default:
      return state;
  }
}
