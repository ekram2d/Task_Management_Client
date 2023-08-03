import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from './MyContext'; // Correct the import for AuthContext

const SingleData = () => {
  const {id}=useParams();
  const [data,setData]=useState();

      useEffect(()=>{
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res=>res.json())
            .then(datas=>setData(datas?.filter(data=>data.id==id)));

      },[])
console.log(data);

  return (
    <div>
 {
  data?.map(data=>   
    <div id={data.id} className="card w-96 bg-neutral text-neutral-content">
<div className="card-body items-center text-center">
  <h2 className="card-title">{data?.title}</h2>
  <p>id:{data.id}</p>
  <div className="card-actions justify-end">

  
  </div>
  </div>
 
  </div>)
 }
    </div>
  );
};

export default SingleData;
