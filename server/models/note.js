import mongoose from 'mongoose';

const { Schema } = mongoose;

const noteSchema = new Schema({
  task: { type: 'String', required: true },
  id: { type: 'String', required: true, unique: true },
});

export default mongoose.model('Note', noteSchema);
