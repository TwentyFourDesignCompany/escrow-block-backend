
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: [true, 'User Name already exists'],
    trim: true,
    required: "User Name is required"
  },
  firstName: {
    type: String,
    trim: true,
    required: "First Name is required"
  },
  middleName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true,
    required: "Last Name is required"
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
    lowercase: true
  },
  preferredCommunication: {
    type: String,
    trim: true
  },
  aliasName: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    trim: true,
    required: "Gender is required"
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: "Country is required"
  },
  passportOrId: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: "Phone Number is required"
  },
  telegram: {
    type: String,
    trim: true
  },
  streetAddress: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  zipCode: {
    type: String,
    trim: true
  },
  socialSecurityNumber: {
    type: String,
    trim: true
  },
  grossAnnualIncome: {
    type: String,
    trim: true
  },
  employmentStatus: {
    type: String,
    trim: true
  },
  occupation: {
    type: String,
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  sourceOfFunds: {
    type: String,
    trim: true
  },
  purposeOfEscrowAccount: {
    type: String,
    trim: true
  }, 
  expectedTransactionSizePerTrade: {
    type: String,
    trim: true
  },
  accountHolderName: {
    type: String,
    trim: true
  },
  fullBeneficiaryAddress: {
    type: String,
    trim: true
  },
  bankName: {
    type: String,
    trim: true
  },
  fullBankAddress: {
    type: String,
    trim: true
  },
  accountNumber: {
    type: String,
    trim: true
  },
  routingNumber: {
    type: String,
    trim: true
  },
  intermediaryBank: {
    type: String,
    trim: true
  },
  yearsOfExperience: {
    type: Number
  },
  tradingAccountControl: {
    type: String,
    trim: true
  },
  hearAboutUs: {
    type: String,
    trim: true
  },
  passport: {
    data: Buffer,
    contentType: String
  },
  proofOfAddress: {
    data: Buffer,
    contentType: String
  },
  bankStatement: {
    data: Buffer,
    contentType: String
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  password: {
    type: String,
    trim: true,
    required: "Password is required"
  },
  role: {
    type: String,
    trim: true
  },
  transactions: [ { 
    type: mongoose.Schema.ObjectId, 
    ref: "Transaction" 
  } ],
  forgotPasswordToken: {
    type: Number
  }, 
  firstForm: {
    type: Boolean,
  },
  secondForm: {
    type: Boolean,
  }, 
  address: {
    type: String
  }
});

module.exports = mongoose.model("User", UserSchema);
