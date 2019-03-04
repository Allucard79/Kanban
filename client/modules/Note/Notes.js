import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import Edit from '../../components/Edit';

// Import Style
import styles from './Note.css';

const Notes = ({ notes, laneId, editNote, updateNote, deleteNote, moveWithinLane }) => {
  return (
    <ul className={styles.Notes}>{ notes.map(note =>
      <Note
        id={note.id}
        key={note.id}
        moveWithinLane={moveWithinLane}
        laneId={laneId}
      >
        <Edit
          editing={note.editing}
          value={note.task}
          onValueClick={() => editNote(note.id)}
          onUpdate={task => updateNote({...note, task, editing: false,})}
          onDelete={() => deleteNote(note.id, laneId)}
        />
      </Note>
    )}
    </ul>
  );
};

Notes.propTypes = {
  notes: PropTypes.array,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  updateNote: PropTypes.func,
  deleteNote: PropTypes.func,
  moveWithinLane: PropTypes.func,
};

export default Notes;