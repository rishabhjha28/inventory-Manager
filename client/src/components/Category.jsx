import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import Row from './Row'

const Category = () => {
  const {email} = useParams()
  const [category,setCategory] = useState([])
  const [isAddActive,setIsAddActive] = useState(false)
  const [addCategory,setAddCategory] = useState('')
  const [alreadyExist,setAlreadyExist] = useState(false)
  
  useEffect(()=>{
    getCategories()
  },[])
  useEffect(()=>{
    setTimeout(() => {
        setAlreadyExist(false)
    }, 3000);
  },[alreadyExist])
  const getCategories =()=>{
    axios.get('/category/'+email)
    .then((response)=>{
        setCategory(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  const addNewCategory =(e)=>{
    e.preventDefault()
    axios.post('/category/'+email,{category:addCategory})
    .then((response)=>{
        if(response.data == 'alreadyExist'){
            setAlreadyExist(true)
        }
        else{
            setIsAddActive(false)
            setAddCategory('')
            getCategories()
        }
    })
    .catch(err=>{
        console.log(err)
    })
  }
  const deleteCategory = (id)=>{
    console.log(id)
    axios.delete('/category/'+email+'/'+id)
    .then((response)=>{
        getCategories()
    })
    .catch(err=>{
        console.log(err)
    })
  }
  const updateCategory = (obj)=>{
    axios.put('/category/'+email,obj)
    .then(res=>{
        if(res.data == 'alreadyExist'){
            setAlreadyExist(true)
        }
        else{
            getCategories()

        }
    })
    .catch(err=>{
        console.log(err)
    })
  }
  const columnName = ['Category name']
  const rowprop = ['name']
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div className='table'>
            <div className='row'>
                {
                    columnName.map((element,index)=><div className='tableHeading' key = {index}>{element}</div>)
                }
                <div className="tableHeading">Delete</div>
                <div className="tableHeading">Update</div>
            </div>
            {
                category.map((cat)=><Row updateRow={updateCategory} deleteWithId = {deleteCategory} row = {cat} columnName={rowprop} key = {cat.id}/>)
            }
            {
                alreadyExist && <div className = "notification">Already Exist Please make Different Category</div>
            }
            {
                !isAddActive ?
                <div className='addCategory' onClick={()=>{setIsAddActive(true)}} >Add category</div>:
                <form className='addNew'>
                    <input type="text" required autoFocus value={addCategory} onChange={(e)=>{setAddCategory(e.target.value)}} placeholder='Enter category Name' />
                    <button onClick={addNewCategory} disabled={!addCategory} type="submit">Add</button>
                    <button onClick={()=>{setIsAddActive(false)}}>Cancel</button>
                </form>
            }
        </div>
    </div>
  )
}

export default Category