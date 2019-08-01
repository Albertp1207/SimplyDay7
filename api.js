const express = require('express');
const app = express();
const router = express.Router();


router.get("/todos", (req,res) => {
    const Todo = req.app.get("Todo");
    Todo.find({})
        .then(todos => {
            res.send({todos})
        })
        .catch(err => {
            console.log(err)
        })
})

router.post("/todos", (req,res) => {
    const Todo = req.app.get("Todo");
    const {todoText} = req.body
    if(todoText.trim().length > 0) {
        new Todo({text:req.body.todoText}).save()
        // res.redirect("/todos")
        res.status(200).json({status:"ok"})
    } else {
        res.status(422).json({status:"input is empty"});
    }
})
router.put("/todos/:id", (req,res) => {
    const Todo = req.app.get("Todo");
    const id = req.params.id
    const newText = req.body.todoText;

    Todo.findOne({_id:id})
        .then(todo => {
            let {text} = todo;
            if(text ===newText) {
                throw {status:401,statusText:"Unauthorized"}
            } else if (newText.trim().length < 1) {
                throw {status:422,statusText:"input is empty"}
            }            
            return {id,newText}
            
        })
        .then(obj => {
            // ***
            Todo.updateOne({_id:obj.id},{$set:{text:obj.newText}})
                .then(()=>{
                    res.status(200).json({status:"ok"});
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        .catch(e => {
            res.status(e.status).json({status:e.statusText})
        })
})
router.delete("/todos/:id", (req,res) => {
    const Todo = req.app.get("Todo");
    const id = req.params.id

    Todo.deleteOne({_id:id})
        .then(()=> {
            res.status(200).json({status:"ok"});
        })
        .catch(err => {
            console.log(err)
        })
        
})

module.exports = router;


