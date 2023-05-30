const TodoRouter=require("express").Router();
const { addTodo, fetchAll } =require('../controllers/todocontroller');

TodoRouter.post('/add',addTodo);

TodoRouter.get('/',fetchAll);


module.exports = TodoRouter;