import React, { useState } from "react";
import Axios from 'axios';

function PostImageForm(){
    const url = 'http://127.0.0.1:8000/api/tweets/images/'
    const [data, setData] = useState({
        user:'',
        imagename: '',
        image: '',
        description: ''
    })

    function submit(e){
        e.preventDefault();
        Axios.post(url, {
            user:data.user,
            imagename:data.imagename,
            image:data.image,
            description:data.description
        })
        .then(res=>{
            console.log(res.data)
        })
    }
    function handle(e){
        const newImage = {...data}
        newImage[e.target.id] = e.target.value
        setData(newImage)
        console.log(newImage)
    }
    return(
        <div>
            <form onSubmit={(e)=>submit(e)} >
                <input onChange={(e)=>handle(e)} id='user' value={data.user} placeholder='Type your user id...' type="number" />
                <input onChange={(e)=>handle(e)} id='imagename' value={data.imagename} placeholder='Type image name...' type="text" />
                <input onChange={(e)=>handle(e)} id='image' value={data.image} type="file"  alt="Submit" width="48" height="48"></input>
                <input onChange={(e)=>handle(e)} id='description' value={data.description}></input>
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default PostImageForm;