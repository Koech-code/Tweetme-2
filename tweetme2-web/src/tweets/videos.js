import React, { useState } from "react";
import Axios from 'axios';

function PostImageForm(){
    const url = 'http://127.0.0.1:8000/api/tweets/images/'
    const [data, setData] = useState({
        imagename: '',
        image: '',
        description: ''
    })

    function submit(e){
        e.preventDefault();
        Axios.post(url, {
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
            <form onSubmit={(e)=>submit(e)} method="POST">
                <input onChange={(e)=>handle(e)} id='imagename' value={data.imagename} placeholder='Type image name...' type="text" />
                <input onChange={(e)=>handle(e)} id='image' value={data.image} type="file" src="img_submit.gif" alt="Submit" width="48" height="48"></input>
                <input onChange={(e)=>handle(e)} id='description' value={data.description}></input>
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default PostImageForm;