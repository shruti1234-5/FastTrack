const express = require("express"); //init express
const app = express();   //create app
const dbconfig = require('./connection/connection')
const userModel = require('./models/user')
const cors= require("cors")
app.use(express.json())
app.use(cors())


app.post('/register',(req,res)=>{
userModel.create(req.body)
.then(users=>res.json(users))
.catch(err=>res.json(err))
})

app.post('/login',(req,res)=>{
const {email, password} = req.body;
  userModel.findOne({email: email})
    .then(user => {
      if (user) {
          if (user.password === password) {
            res.json({ status: "success", userName: user.name ,userCountry: user.userCountry});
             } else {
            res.status(400).json({ status: "error", message: "Incorrect Password" });
          }
      } else {
          res.status(404).json({ status: "error", message: "Record not found" });
      }
     })
  .catch(err => {
         console.error(err);
         res.status(500).json({ status: "error", message: "Internal Server Error" });
     });
 });      
            
app.listen(5000,()=>console.log(`Node server started using nodemon on port 5000`)); 
