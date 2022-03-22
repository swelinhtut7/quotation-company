
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QuotationSchema = new Schema({
  Date: Date,
  Qty: Number,
  Item: String,
  Price: Number,
  Amount: Number
});

//Export function to create "QuotationSchema" model class
module.exports = mongoose.model('Quotations', QuotationSchema);