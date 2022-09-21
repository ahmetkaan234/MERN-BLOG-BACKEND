const mongoose = require("mongoose");
const slugify = require('slugify')

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type:String,
    required: true
  },
  createdAt : {
    type:Date,
    default: new Date(),
  },
  slug:{
    type:String,
    unique:true
  }

});

articleSchema.pre('validate',function(next){
  this.slug = slugify(this.title,{
    lower:true,
    strict:true      //gereksiz karakterleri atmak için
  })
  next();
})


module.exports = mongoose.model("Article", articleSchema);
