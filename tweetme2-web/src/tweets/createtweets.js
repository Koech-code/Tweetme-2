import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';

const CreateTweet = () => {
    const [user, setUser] = useState(null);
    const [content, setContent] = useState(null);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [images, setImages] = useState(null);
    const [updated, setUpdated] = useState(false)

    useEffect(()=>{
        const config = {
            headers:{
                'Accept':'application/json',
            }
        };
        const fetData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/tweets/getweet/', config);
                if (res.status === 200){
                    setImages(res.data.images)
                    
                }
            } catch(err) {

            }

        };

        fetData();
    }, [updated]);

    const onFileChange = e => setImage(e.target.files[0]);
    const onVideoChange = e => setVideo(e.target.files[0]);
    const onContentChange = e => setContent(e.target.value);
    const onUserChange = e => setUser(e.target.value);
    const onSubmit = async e => {
        e.preventDefault();

        const config = {
            headers:{
                'Accept':'application/json',
                'content-Type':'multipart/form-data',
            }
        };

        const formData = new FormData();
        formData.append('image', image);
        formData.append('video', video)
        formData.append('content', content)
        formData.append('user', user)

        const body = formData;

        try {

            const res = await axios.post('http://127.0.0.1:8000/api/tweets/createtweet/', body, config)

            if (res.status === 201){
                setUpdated(!updated);
            }
        } catch(err){

        }
    }

    return(
        <div className="mt-5">
            <h2>Tweet</h2>
            <div className="row">
                <div className="col-5">
                    <form onSubmit={onSubmit}>
                    <div className="form-group">
                            <label className="form-label" htmlFor="user">User</label>
                            <input className="form-control" type="number" name="user" onChange={onUserChange}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="image">Image Post</label>
                            <input className="form-control" type="file" name="image" onChange={onFileChange}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="video">video Upload</label>
                            <input className="form-control" type="file" name="video" onChange={onVideoChange}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="content">Content</label>
                            <input className="form-control" type="text" name="content" onChange={onContentChange}/>
                        </div>
  
                        <Button type="submit" variant='primary'>Create a tweet</Button>
                    </form>
                    <br/>

                </div>
                <div className="offset-1 col-6">
                    <h3>Your tweets</h3>
                    <img src={"http://localhost:8000/api/tweets/getweet/"} alt ='pizza'></img>
                 

                </div>

            </div>
        </div>
    )

}
    

export default CreateTweet;