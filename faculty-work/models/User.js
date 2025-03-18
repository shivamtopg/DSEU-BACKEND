const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
        isAsync: false,
      },
    },
    password: { type: String, required: true },
    designation: {
      type: String,
      required: true,
      enum: [
        'Training & Placement Officer',
        'Executive Engineer',
        'Deputy Registrar',
        'Assistant Registrar',
        'Test',
        'Faculty',
      ],
    },
  },
  { timestamps: true },
)

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

UserSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
