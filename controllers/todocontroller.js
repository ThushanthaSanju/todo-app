const Todo = require('../models/todo');


//add todo
exports.addTodo = async (req, res) => {
 
    //constant variables for the attributes
    const {title, description} = req.body;

    //object
    const newTodo= new Todo({
      //initializing properties
      title, 
      description, 
    })
   
    //saving the object to the db 
    newTodo.save().then(() => {
      res.status(200).json({ status: "New Todo Added" });
    }).catch((error) => {
      res.status(500).json({message:"Fail to Add Todo",error:error.message})
    })
  }

  //get todos
exports.fetchAll =async(req,res) =>{

    Todo.find().then((todos)=>{
        
        res.status(200).json(todos)
    }).catch((error)=>{
        res.status(500).json({message:"fetching failed", error:error.message});
    })
}
