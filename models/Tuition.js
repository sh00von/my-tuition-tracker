import mongoose from 'mongoose';

const TuitionSchema = new mongoose.Schema({
  className: { type: String, required: true },
  studentName: { type: String, required: true },
  daysPerMonth: { type: Number, required: true },
  attendance: { type: [Number], default: [] },  // Store the days attended
});

export default mongoose.models.Tuition || mongoose.model('Tuition', TuitionSchema);
