import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';

const UploadVideo = () => {
    const [user, setUser] = useState(null);
    const [videoname, setVideoname] = useState(null);
    const [video, setVideo] = useState(null);
    const [about, setAbout] = useState(null);
    const [videos, setVideos] = useState(null);
    const [updated, setUpdated] = useState(false)

    useEffect(()=>{
        const config = {
            headers:{
                'Accept':'application/json',
            }
        };
        const fetData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/tweets/getvideos/', config);
                if (res.status === 200){
                    setVideos(res.data.videos)
                    
                }
            } catch(err) {

            }

        };

        fetData();
    }, [updated]);

    const onFileChange = evt => setVideo(evt.target.files[0]);
    const onVideonameChange = evt => setVideoname(evt.target.value);
    const onAboutChange = evt => setAbout(evt.target.value);
    const onUserChange = evt => setUser(evt.target.value);
    const onSubmit = async evt => {
        evt.preventDefault();

        const config = {
            headers:{
                'Accept':'application/json',
                'content-Type':'multipart/form-data',
            }
        };

        const formData = new FormData();
        formData.append('videoname', videoname);
        formData.append('video', video)
        formData.append('about', about)
        formData.append('user', user)

        const body = formData;

        try {

            const res = await axios.post('http://127.0.0.1:8000/api/tweets/uploadvideos/', body, config)

            if (res.status === 201){
                setUpdated(!updated);
            }
        } catch(err){

        }
    }

    return(
        <div className="mt-5">
            <h2>Upload videos</h2>
            <div className="row">
                <div className="col-5">
                    <form onSubmit={onSubmit}>
                    <div className="form-group">
                            <label className="form-label" htmlFor="user">User</label>
                            <input className="form-control" type="number" name="user" onChange={onUserChange}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="video">Video</label>
                            <input className="form-control" type="file" name="video" onChange={onFileChange}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="videoname">video Upload</label>
                            <input className="form-control" type="text" name="videoname" onChange={onVideonameChange}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="about">Content</label>
                            <input className="form-control" type="text" name="about" onChange={onAboutChange}/>
                        </div>
  
                        <Button type="submit" variant='success'>Upload</Button>
                    </form>
                    <br/>

                </div>
                <div className="offset-1 col-6">
                    <h3>Your videos</h3>
                    <video controls='controls'>Your video</video>
                 

                </div>

            </div>
        </div>
    )

}
    

export default UploadVideo;