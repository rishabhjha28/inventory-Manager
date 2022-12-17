import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import Row from './Row'

const Product = () => {
  const {email} = useParams()
  const iniProduct = {
    pName:'',
    price:'',
    cId:''
  }
  const [product,setProduct] = useState([])
  const [isAddActive,setIsAddActive] = useState(false)
  const [category,setCategory] = useState([])
  const [newProduct,setNewProduct] = useState(iniProduct)
  const [sortBy,setSortBy] = useState('')

  const sortByCategory = (e)=>{
    const {name,value} = e.target
    setSortBy(value)
    console.log(value)
    axios.get('/product/'+email+'?sortBy='+value)
    .then((response)=>{
        setProduct(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const handleChangeOfAddNewProduct = (e)=>{
    const {name,value} = e.target
    setNewProduct(prev=>({...prev,[name]:value}))
  }
  const addNewProduct = (e)=>{
    e.preventDefault()
    axios.post('/product/'+email,newProduct)
    .then(res=>{
        getProduct()
        setIsAddActive(false)
        setNewProduct(iniProduct)
    })
    .catch(err=>{
        console.log(err)
    })
  }
  useEffect(()=>{
    getCategories()
  },[])
  const getCategories =()=>{
    axios.get('/category/'+email)
    .then((response)=>{
        setCategory(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  const getProduct =()=>{
    axios.get('/product/'+email)
    .then((response)=>{
        setProduct(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  useEffect(()=>{
    getProduct()
  },[])
  const deleteProduct = (id)=>{
    axios.delete('/product/'+email+'/'+id)
    .then(res=>{
        getProduct()
    })
    .catch(err=>{
        console.log(err)
    })
  }
  const updateProd =(obj)=>{
    axios.put('/product/'+email,{pid:obj.pid,cid:obj.cid,pName:obj.pName,price:obj.price})
    .then(res=>{
        getProduct()
    })
    .catch(err=>{
        console.log(err)
    })
  }
  const columnName = ['Product name','Price ','Category']
  const rowprop = ['pName','price','cName']
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div style = {{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <form>
                sort By:
                <select onChange={sortByCategory} name="filter" value = {sortBy} required>
                    <option  value = ''>Category</option>
                    {
                        category.map((opt)=>{
                            return <option key = {opt.id} value = {opt.id}>{opt.name}</option>
                        })
                    }
                </select>
            </form>
            <div className='table'>
                <div className='row'>
                    {
                        columnName.map((element,index)=><div className='tableHeading' key = {index}>{element}</div>)
                    }
                    <div className="tableHeading">Delete</div>
                    <div className="tableHeading">Update</div>
                </div>    
                    {
                        product.map((prod)=><Row category={category} updateRow={updateProd} deleteWithId={deleteProduct} row = {prod} columnName={rowprop} key = {prod.id}/>)
                    }
                    {
                    !isAddActive ?
                    <div className='addCategory' onClick={()=>{setIsAddActive(true)}} >Add Product</div>:
                    <form className='addNew'>
                        <div>
                            <input required type="text" autoFocus value={newProduct.pName} name='pName' onChange={handleChangeOfAddNewProduct} placeholder='Enter Product Name' />
                            <input required type="number" name = 'price' value={newProduct.price} onChange={handleChangeOfAddNewProduct} placeholder='Enter price' />
                            <select required onChange={handleChangeOfAddNewProduct} name="cId">
                                <option value = ''>Select category</option>
                                {
                                    category.map((opt)=>{
                                        return <option key = {opt.id} value = {opt.id}>{opt.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <button disabled={!(newProduct.pName && newProduct.price && newProduct.cId)} onClick={addNewProduct} type="submit">Add</button>
                        <button onClick={()=>{setIsAddActive(false)}}>Cancel</button>
                    </form>
                }
            </div>
        </div>
    </div>
  )
}

export default Product