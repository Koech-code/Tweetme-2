import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState('')
  const [videoname, setVideoname] = useState('')
  const [video, setVideo] = useState('')
  const [about, setAbout] = useState('')
  
  const uploadVideo =() =>{
    const uploadData = new FormData();
    uploadData.append('user', user);
    uploadData.append('videoname', videoname);
    uploadData.append('video', video)
    uploadData.append('about', about);

    fetch('http://127.0.0.1:8000/api/tweets/uploadvideos/', {
    method:'POST',
    body:uploadData
    })
    .then( res =>console.log(res))
    .catch(error => console.log(error))
  }
  return (
    <div className="App">
      <h4>Youtweet web app</h4>
      <label>
     User <input type='number' value={user} onChange={(evt) => setUser(evt.target.value)}/>
      </label>
      <label>
        Video name <input type='text' value={videoname} onChange={(evt) => setVideoname(evt.target.value)}/>
      </label>
      <br/>
      <label>
        Video <input type='file' value={video} onChange={(evt) => setVideo(evt.target.files[0])}/>
      </label>
      <br/>
        About<input type='text' value={about} onChange={(evt) => setAbout(evt.target.value)}/>
      <br/>
      <button onClick={()=>uploadVideo()}>Upload video</button>
    </div>
  );
}

export default App;