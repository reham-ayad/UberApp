const mongoose= require('mongoose');

const DriverSchema = new mongoose.Schema({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },



  carinfo:{
    type: String,
    trim: true,
    default: ''

  },
 
  licenseNumber: {
    type: String,
     trim: true,
    default: ''

  },
 isactivable: {
    type: boolean,
    default: true
  }
} ,{timestamps: true}
);
const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;
