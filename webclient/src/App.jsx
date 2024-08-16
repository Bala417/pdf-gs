// import { useState } from 'react'
// import axios from 'axios'

// function App() {
//   const [file,setFile]= useState(null)
// const baseurl = 'http://localhost:3000'


// const handleFileChange =(e)=>{
//   console.log(e.target.files[0])
//   setFile(e.target.files[0])
// }

//   const handleSubmit =async()=>{
//     console.log("clicked")

  

//     const formData = new FormData()
//     formData.append('data',file)
//     console.log('click 2')

//     try {
//       const res = await axios.post(`${baseurl}/convert`,formData,{
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       })

//       // if(!res.ok){
//       //   throw new Error('network response was no ok')
//       // }

      
//       console.log(res.data)
//     } catch (error) { 
//       console.error('error while sending files',error)  
//       }
//   }
//   return (
// <div className='bg-slate-500'>
//     <label>
//       <p>select files </p>
//     </label>
//     <input type='file' name='file' accept='.pdf'  onChange={handleFileChange}/>
//     <button className='bg-blue-500 py-2 px-5 rounded-md active:bg-blue-800' onClick={handleSubmit}>Submit</button>
// </div>
//   )
// }

// export default App
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const baseurl = 'http://localhost:3000';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${baseurl}/convert`, formData, {
        responseType: 'blob', // Important for handling binary data
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Create a URL for the response blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'output.png'); // Change filename if needed
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error while sending file', error);
    }
  };

  return (
    <div className='bg-slate-500'>
      <label>
        <p>Select file</p>
      </label>
      <input
        type='file'
        name='file'
        accept='.pdf'
        onChange={handleFileChange}
      />
      <button
        className='bg-blue-500 py-2 px-5 rounded-md active:bg-blue-800'
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
