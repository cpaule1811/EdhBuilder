import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import XLSX from "xlsx";
import {useDropzone} from 'react-dropzone';
import { requestDecklist } from '../../actions'; 
import './Upload.css'
import upload from '../../icons/upload.svg'
import excel from '../../icons/excel.svg'

function Upload() {
    const [file, setFile] = useState("")
    const [noFile, setNoFile] = useState(false)
    const {getRootProps, getInputProps, isDragActive} = useDropzone({noClick:file ? true : false,  accept: '.xlsx, xls', maxFiles:2, onDrop: files => setFile(files[0])})
    const dispatch = useDispatch()
    const { deckDetails } = useSelector((state) => state.requestDecklist)
    const { userID } = useSelector(state => state.loginStatus)

    const readFile = () => {
        if (!file) {
          return setNoFile(true)
        }
        const reader = new FileReader();
        reader.onload = function(e) {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, {type: 'array'});
          var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
          var uploadData = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
          fetch('https://edh-builder-api-m7vk6.ondigitalocean.app/exceldecklist' , { 
            method: 'post',
            headers: { 
              'Content-Type': 'application/json',
              "Authorization": window.localStorage.getItem('token')
            },
            body: JSON.stringify({
              deckID: deckDetails.deckID,
              data: uploadData
            })
          })
          .then(data => data.json())
          .then((resp) => { if(resp === 'success') dispatch(requestDecklist(deckDetails.deckID, userID)) });
        };
        reader.readAsArrayBuffer(file);
      }

    return (
        <div className ="drag-n-drop">
        <h3>Upload cards from Excel</h3>
        <div className={`drop-area ${isDragActive && 'drag-active'}`} {...getRootProps()}>
            <input onChange {...getInputProps()} />
               { file ? <div className="uploaded-file">
                           <img src={excel} alt="excel file"/>
                             <div>{file.name}</div>
                             <button onClick={(e) => setFile("")} className="clear">x</button>
                         </div> :
                   <><img src={upload} alt="upload-icon"/><p>Drag 'n' drop .xlsx, xls file here, or click to select files</p></>
                   }
            </div>
            {noFile && <div className="invalid invalid-pos">Please add file</div>}
            <button onClick={() => readFile()} className="upload">UPLOAD</button>
        </div>
    );
}

export default Upload;