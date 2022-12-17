const express = require('express');
const router = express.Router();
const connection = require("../dbConnection");

router.get('/:email',(req,res)=>{
    const {email} = req.params
    connection.query('select * from category where createdBy = \''+email+'\'',(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(result)
        }
    })
})

router.post('/:email',(req,res)=>{
    const {email} = req.params
    const {category} = req.body
    connection.query('select * from category where createdBy = \''+email+'\' and name = \''+category+'\'',(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            if(result.length){
                res.json('alreadyExist')
            }
            else{
                connection.query('insert into category (name,createdBy)values(\''+category+'\',\''+email+'\')',(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.json('categoryAdded')
                    }
                })
            }
        }
    })
})

router.put('/:email',(req,res)=>{
    const {email} = req.params
    const {id,name} = req.body
    connection.query('select * from category where createdBy = \''+email+'\' and name = \''+name+'\'',(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            if(result.length){
                res.json('alreadyExist')
            }
            else{
                connection.query('update category set name = \''+name+'\' where id = \''+id+'\'',(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.json(result)
                    }
                })
            }
        }
    })
})

router.delete('/:email/:id',(req,res)=>{
    const {email,id} = req.params
    connection.query('delete from category where id = '+id,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(result)
        }
    })
})


module.exports = router;
