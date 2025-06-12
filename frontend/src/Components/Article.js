// import React from 'react';

// const Card = ({ data }) =>
//    {
//   console.log(data);

//    return (
//     <div className="container mt-3"style={{ maxWidth: '1400px' }}>
//       <div className="row justify-content-center  align-items-">
//       { data?.map((curItem, index) => {
//         if(! curItem.urlToImage || curItem.title == '[Removed]')
//         {
//            return null 
//           }
//         else {
//           return (
//          <div className=" card-deck col-md-4 mb-3" key={index}>
//         <div className="card bs" style={{ width: '100%' }} key={index}>
//           <img className="card-img-top" src={curItem.urlToImage} alt="Card image cap" />
//           <div className="card-body">
//             <h5 className="card-title"onClick={() => window.open(curItem.url)}>{curItem.title}</h5>
//             <p className="card-text">{curItem.description}</p>
//             <button className="btn btn-primary " style={{borderRadius:'10px',border:"none"}} onClick={() => window.open(curItem.url)}> Read More</button>
//           </div>
//         </div>
//         </div>
//           )
//         }
//    }) || <h5>No items available.</h5>}
//     </div> </div>
//   )};

// export default Card;




import React from 'react';

const Card = ({ data }) =>
   {
 
   return (
    <div className="container mt-3"style={{ maxWidth: '1400px' }}>
      <div className="row justify-content-center  align-items-">
      { data?.map((curItem, index) => {
        if(! curItem.urlToImage || curItem.title == '[Removed]')
        {
           return null 
          }
        else {
          return (
         <div className=" card-deck col-md-4 mb-3" key={index}>
        <div className="card bs" style={{ width: '100%' }} key={index}>
          <img className="card-img-top" src={curItem.urlToImage} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title"onClick={() => window.open(curItem.url)}>{curItem.title}</h5>
            <p className="card-text">{curItem.description}</p>
            <button className="btn btn-primary " style={{borderRadius:'10px',border:"none"}} onClick={() => window.open(curItem.url)}> Read More</button>
          </div>
        </div>
        </div>
          )
        }
   }) || <h5>No items available.</h5>}
    </div> </div>
  )};

export default Card;
