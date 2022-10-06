import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';

const CommentVideos = () => {
    const [user, setUser] = useState(null);
    const [uploadedVideo, setUploadedvideo] = useState(null);
    const [comment, setComment] = useState(null);
    const [comments, setComments] = useState(null);
    const [updated, setUpdated] = useState(false)

    useEffect(()=>{
        const config = {
            headers:{
                'Accept':'application/json',
            }
        };
        const fetData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/tweets/', config);
                if (res.status === 200){
                    setComments(res.data.images)
                    
                }
            } catch(err) {

            }

        };

        fetData();
    }, [updated]);

    const onVideoChange = e => setUploadedvideo(e.target.value);
    const onCommentChange = e => setComment(e.target.value);
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
        formData.append('uploadedVideo', uploadedVideo)
        formData.append('comment', comment)
        formData.append('user', user)

        const body = formData;

        try {

            const res = await axios.post('http://127.0.0.1:8000/api/tweets/commentvideo/', body, config)

            if (res.status === 201){
                setUpdated(!updated);
            }
        } catch(err){

        }
    }

    return(
        <div className="mt-5">
            <h2>Comment</h2>
            <div className="row">
                <div className="col-5">
                    <form onSubmit={onSubmit}>
                    <div className="form-group">
                            <label className="form-label" htmlFor="user">User</label>
                            <input className="form-control" type="number" name="user" onChange={onUserChange}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="uploadedvideo">Video</label>
                            <input className="form-control" type="number" name="uploadedvideo" onChange={onVideoChange}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="comment">Content</label>
                            <input className="form-control" type="text" name="comment" onChange={onCommentChange}/>
                        </div>
  
                        <Button type="submit" variant='primary'>Add a comment</Button>
                    </form>
                    <br/>

                </div>
                <div className="offset-1 col-6">
                    <h3>Comments</h3>
                    <img src={`http://localhost:8000/api/tweets/`} alt ='pizza'></img>
                 

                </div>

            </div>
        </div>
    )

}
    

export default CommentVideos;