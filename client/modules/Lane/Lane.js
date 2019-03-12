import React from 'react';
import PropTypes from 'prop-types';
import NoteContainer from '../Note/NoteContainer';
import Edit from '../../components/Edit';

// Import Style
import styles from './Lane.css';


class Lane extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { connectDropTarget, lane, laneNotes, updateLane, addNote, deleteLane, editLane } = this.props;
    const laneId = lane.id;

    return connectDropTarget(
      <div className={styles.Lane}>
        <div className={styles.LaneHeader}>
          <Edit
            className={styles.LaneName}
            editing={lane.editing}
            value={lane.name}
            onValueClick={() => editLane(lane.id)}
            onUpdate={name => updateLane({ ...lane, name, editing: false })}
          />
          <div className={styles.LaneDelete}>
            <button onClick={() => deleteLane(laneId)}>✖ list</button>
          </div>
          <div className={styles.LaneAddNote}>
            <button onClick={() => addNote({ task: 'new card' }, laneId)}>✚ card</button>
          </div>
        </div>
        <NoteContainer
          notes={laneNotes}
          laneId={laneId}
        />
      </div>
    );
  }
}

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
  editLane: PropTypes.func,
  connectDropTarget: PropTypes.func,
};

export default Lane;
