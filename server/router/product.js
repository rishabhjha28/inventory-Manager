const express = require('express');
const router = express.Router();
const connection = require("../dbConnection");

router.get('/:email',(req,res)=>{
    const {email} = req.params
    const {sortBy} = req.query
    let querry = 'select pid,id as cid, product.name as pName,price,category.name as cName from product inner join category on product.cid = category.id where createdBy =\''+email+'\'' 
    if(sortBy){
        querry = 'select pid,id as cid, product.name as pName,price,category.name as cName from product inner join category on product.cid = category.id where createdBy =\''+email+'\' order by cid='+sortBy+' desc'
    }
    connection.query(querry,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(result)

        }
    })
})

router.post('/:email',(req,res)=>{
    const {pName,price,cId} = req.body
    connection.query('insert into product(name,price,cId)values(\''+pName+'\','+price+','+cId+')',(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json('productAdded')
        }
    })
})

router.put('/:email',(req,res)=>{
    const {pid,cid,pName,price} = req.body
    connection.query('update product set name=\''+pName+'\',price='+price+',cId='+cid+' where pid='+pid,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(result)
        }
    })
})

router.delete('/:email/:id',(req,res)=>{
    const {email,id} = req.params
    connection.query('delete from product where pid = '+id,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(result)
        }
    })
})


module.exports = router;