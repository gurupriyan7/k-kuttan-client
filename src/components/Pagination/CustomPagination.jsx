
import { Pagination } from '@mui/material'
import React from 'react'

const CustomPagination = ({setPage,noOfPages }) => {
    const handlePageChange=(page)=>{
       setPage(page)
       window.scroll(0,0)
    }
  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"10px"}}>
     <Pagination count={noOfPages}  onChange={(e)=>handlePageChange(e.target.textContent)}  hideNextButton hidePrevButton/>
    </div>
  )
}

export default CustomPagination