// const express = require('express')
// const multer = require('multer')
// const path = require('path');
// const cors = require('cors')
// const { exec } = require('child_process');
// const fs = require('fs')
// const port = 3000
// const app = express()
// // const storage = multer.diskStorage({
// //     destination:function(req,file,cb){
// //         cb(null,'uploads/')
// //     },
// //     filename:function(req,file,cb){
// //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       
// //         cb(null,uniqueSuffix+ path.extname(file.originalname))
        
// //     }
// // })
// const upload = multer({ dest: 'uploads/' });

// // const upload = multer({ storage: storage })
// // // const upload = multer({dest:'uploads/'})
// // const app = express()   


// app.use(cors())

// app.get('/',(req,res)=>{
//     res.send('hello')
// })


// // app.post('/convert',upload.single('data'),(req,res)=>{
   
// //     const filePath = req.file.path;
// //   const outputPath = path.join('uploads', `${req.file.filename}`);

// //   // Ghostscript command to convert file to PDF
// //   const command = `gs -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sOutputFile=${outputPath} ${filePath}`;

// //   exec(command, (err, stdout, stderr) => {
// //     if (err) {
// //       console.error(stderr);
// //       return res.status(500).send('Error processing file');
// //     }

// //     res.download(outputPath, (err) => {
// //       if (err) {
// //         console.error(err);
// //         res.status(500).send('Error downloading file');
// //       } else {
// //         // Clean up temporary files
// //         fs.unlink(filePath, () => {});
// //         fs.unlink(outputPath, () => {});
// //       }
// //     });
// //   });


// // })
// app.post('/convert', upload.single('file'), (req, res) => {
//     const filePath = req.file.path;
//     const outputPath = path.join('output', `${req.file.filename}`);
  
//     // Ghostscript command to convert file to PDF
//     const command = `gs -dBATCH -dNOPAUSE -sDEVICE=png16m -r144 -sOutputFile=${outputPath} ${filePath}`;
//     //  -sOutputFile=output.png input.pdf

//     exec(command, (err, stdout, stderr) => {
//       if (err) {
//         console.error(stderr);
//         return res.status(500).send('Error processing file');
//       }
  
//       res.download(outputPath, (err) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send('Error downloading file');
//         } else {
//           // Clean up temporary files
//           fs.unlink(filePath, () => {});
//           fs.unlink(outputPath, () => {});
//         }
//       });
//     });
//   });

// app.listen(port,()=>{
//     console.log(`Listening at port ${port}`)
// })

const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const port = 3000;
const app = express();

// Ensure the 'output' directory exists
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/convert', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const outputPath = path.join(outputDir, `${path.basename(req.file.filename, path.extname(req.file.filename))}.png`);
    console.log(filePath,outputPath)
  // Ghostscript command to convert PDF to PNG
  const command = `gs -dBATCH -dNOPAUSE -sDEVICE=png16m -r600 -sOutputFile=${outputPath} ${filePath}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send('Error processing file');
    }

    res.download(outputPath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error downloading file');
      } else {
        // Clean up temporary files
        fs.unlink(filePath, () => {});
        fs.unlink(outputPath, () => {});
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
