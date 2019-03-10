import { connect } from 'react-redux';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import * as laneActions from './LaneActions';
import Lane from './Lane';
import { deleteLaneRequest, updateLaneRequest, editLane, moveBetweenLanes, removeFromLane, pushToLane, changeLanesRequest } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';
import callApi from '../../util/apiCaller';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});


const mapDispatchToProps = {
  ...laneActions,
  editLane,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  moveBetweenLanes,
  removeFromLane,
  pushToLane,
  changeLanesRequest,
};

const noteTarget = {

  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId, _id: note_id} = sourceProps;

    if (targetProps.lane.id !== sourceLaneId) {
      const newTargetNotes = targetProps.laneNotes.map(note => note._id)
      newTargetNotes.push(note_id);
      targetProps.changeLanesRequest(sourceLaneId, targetProps.lane.id, noteId, newTargetNotes); 
    
    } else {
      const notes = targetProps.laneNotes.map(note => note._id)
      callApi('lanes','put', {id: sourceLaneId, notes: notes})
    }
  },
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);