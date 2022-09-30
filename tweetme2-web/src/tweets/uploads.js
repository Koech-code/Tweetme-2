import React from 'react';

class List extends React.Component{
   constructor(){
      super();
      this.state={
         data:[]
      };
   }

   fetchdata(){
      fetch('http://127.0.0.1:8000/videos/')
      .then(response=>response.json())
      .then((data) => {
         this.setState({
            data:data
         });
         console.log(data)
      });
   }
   
   componentDidCatch(){
      this.fetchdata();
   }
   render(){
      const empdata=this.state.data;
      const info = empdata.map((emp)=> 
      <div key={emp.id}>
         <h3>{emp.videoname}</h3>
         <video>{emp.video}</video>
         <p>{emp.about}</p>

      </div>
      );
      return(
      <p>hello api</p>
      )
   }
}

export default List;