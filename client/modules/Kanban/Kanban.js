import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
import Lanes from '../Lane/Lanes';

// Import Style
import styles from './Kanban.css';
// import styles from '../Lane/Lane.css';

const Kanban = props => (
  <div className={styles.laneButton}>
    <button className={styles.addLaneButton} onClick={() => props.createLane({ name: 'New column' })}>✚ column</button>
    <Lanes lanes={props.lanes} />
  </div>
);

Kanban.need = [() => { return fetchLanes(); }];

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
};

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes)
});

const mapDispatchToProps = {
  createLane: createLaneRequest,
};

// higher-order functions
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(Kanban);