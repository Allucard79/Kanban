import mongoose from 'mongoose';

const { Schema } = mongoose;

const kanbanSchema = new Schema({

});

export default mongoose.model('Kanban', kanbanSchema);
