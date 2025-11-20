import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({

  studentName: { 
    type: String, 
    required: true 
  },

  rollNumber: { 
    type: String, 
    required: true 
  },

  systemNumber: { 
    type: String, 
    required: true 
  },

  quizCode: { 
    type: String, 
    required: true 
  },

  quizTitle: { 
    type: String, 
    required: true 
  }

}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
