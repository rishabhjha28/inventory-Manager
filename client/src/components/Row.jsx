import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

const Row = ({row,columnName,category, deleteWithId,updateRow}) => {
    const [update,setUpdate] = useState(false)
    const [curruntValue,setCurruntValue] = useState(row)
    useEffect(()=>{
        cancelUpdate()
    },[row])
    const handleUpdateChange = (e)=>{
        const {name,value} = e.target
        setCurruntValue(prev=>({...prev,[name]:value}))
    }
    const cancelUpdate =()=>{
        setUpdate(false)
        setCurruntValue(row)
    }
    const updateElement = ()=>{
        updateRow(curruntValue)
    }
    return (
        <div style={{display:'flex'}}>
            <div className='row'>
                {   
                    columnName.map((element,index)=>{
                        if(update){
                            if(element === 'cName'){
                                return(<select onChange={handleUpdateChange} name="cid">
                                <option value = ''>Select category</option>
                                {
                                    category.map((opt)=>{
                                        return <option key = {opt.id} value = {opt.id}>{opt.name}</option>
                                    })
                                }
                            </select>)
                            }
                            else{
                                return (<input style ={{width:'100px'}} onChange = {handleUpdateChange} type="text" name={element} value = {curruntValue[element]} />)
                            }
                        }
                        else
                        return (<div className='value' key = {index}>
                            {row[element]}
                        </div>)
                    })
                }
                <div onClick={()=>{deleteWithId(row.pid || row.id)}} className="value delete">delete</div>
                <div onClick={()=>{update?updateElement():setUpdate(true)}} className="value update">update</div>
            </div>
            {
                update &&
                <div onClick={cancelUpdate} className='value delete'>Cancel</div>
            }
        </div>

  )
}

export default Row