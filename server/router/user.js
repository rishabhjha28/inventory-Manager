const e = require('express');
const express = require('express');
const connection = require('../dbConnection');
const router = express.Router();

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    connection.query('select email from user where email=\''+email+'\'and password = \''+password+'\'',(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            if(result.length == 0){
                res.json("Wrong Credentials")
            }
            else{
                res.json('Login successfull')
            }
        }
    })
})
router.post('/signup',(req,res)=>{
    const {email,password} = req.body
    connection.query('select email from user where email=\''+email+'\'',(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            if(result.length == 0){
                connection.query('insert into user (email,password) values(\''+email+'\',\''+password+'\')',(err,resp)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.json('userAdded')
                    }
                })
            }
            else{
                res.json('userAlreadyExist')
            }
        }
    })
})

router.post('/forgotpassword',(req,res)=>{
    const {email} = req.body
    connection.query('select email from user where email = \''+email+'\'',(err,result)=>{
        if(err){
            console.log(err)
        }
        else if(result.length){
            res.json('exist')
        }
        else{
            res.json('doesn\'tExist')
        }
    })
})
router.put('/changePassword',(req,res)=>{
    const {email,password} = req.body
    connection.query('update user set password = \''+password+'\' where email =\''+email+'\'',(err,result)=>{
        if(err){
            console.log(err)
        }
        else {
            res.json(result)
        }
        // else{
        //     connection.query('update user set password = \''+password+'\' where email =\''+email+'\'',(err,resu)=>{
        //         if(err){
        //             console.log(err)
        //         }
        //         else{
        //             console.log(resu)
        //         }
        //     })
        // }
    })
})
module.exports = router;
