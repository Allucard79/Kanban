import { connect } from 'react-redux';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

import Lane from './Lane';
import { deleteLaneRequest, updateLaneRequest, editLane, moveBetweenLanes } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});


const mapDispatchToProps = {
  editLane,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  moveBetweenLanes,
};

const noteTarget = {

  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;

    const notContains = !targetProps.lane.notes.includes(noteId)
    if (targetProps.lane.id !== sourceLaneId && notContains) {
      targetProps.moveBetweenLanes(
        targetProps.lane.id,
        noteId,
        sourceLaneId,
      );
    }
  },
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);