import React, { useEffect, useState } from "react";
import axios from 'axios';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
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
            <h2>Upload image</h2>
            <div className="row">
                <div className="col-5">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="image">Image Upload</label>
                            <input className="form-control" type="file" name="image" onChange={onFileChange}/>
                        </div>
  
                        <button type="submit">Upload image</button>
                    </form>

                </div>
                <div className="offset-1 col-6">
                    <h3></h3>
                    <img src={`http://localhost:8000${image.image}`} alt ='pizza'></img>
                 

                </div>

            </div>
        </div>
    )

}
    

export default ImageUpload;