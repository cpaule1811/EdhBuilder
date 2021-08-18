import React, { useState } from 'react';
import {useDropzone} from 'react-dropzone';
import './Signin.css'
import json from '../../icons/json.svg'
import upload from '../../icons/upload.svg'

function AddCards() {

    const [setId, setSetId] = useState("")
    const [success, setSuccess] = useState("")
    const [jsonFile, setJsonFile] =useState("")

    const {getRootProps, getInputProps, isDragActive} = useDropzone({ 
        noClick: jsonFile ? true : false,
        accept: '.json',
        maxFiles:1, 
        onDrop: files => { console.log(files); setJsonFile(files[0]) }
    })

    const sendJsonFile = (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('file', jsonFile)
        console.log(jsonFile)
        fetch('https://edh-builder-api-m7vk6.ondigitalocean.app/jsonentrys', { 
            method: 'POST',
            body: fd
        })
    }

    const fetchNewSet = (e) => {
        e.preventDefault();
        fetch(`https://api.scryfall.com/cards/search?order=set&q=e%3A${setId}&unique=prints`)
        .then(data => data.json())
        .then(resp => {
            const { data } = resp
            const cardsToAdd = data.map(item => { 
                return { 
                   cardName: item.name, 
                   type: item.type_line, 
                   price: Number(item.prices.usd) < 0.50 ? 0.50.toFixed(2) : Number(item.prices.usd) * 1.65.toFixed(2),
                   cmc: item.cmc,
                   modal: item.layout,
                   imageUrl: item.layout === "transform" || item.layout === "modal_dfc" ? 
                   item.card_faces[0].image_uris.normal : item.image_uris.normal,
                   imageUrl2: item.layout === "transform" || item.layout === "modal_dfc" ? 
                   item.card_faces[1].image_uris.normal : null,
                   cardArt: item.layout === "transform" || item.layout === "modal_dfc" ? 
                   item.card_faces[0].image_uris.art_crop : item.image_uris.art_crop,
                   color: item.color_identity.join(),
                   legal: item.legalities.commander,
                   producedMana: item.produced_mana ? item.produced_mana.join() : null,
                   mana: item.layout === "transform" || item.layout === "modal_dfc" ? 
                   item.card_faces[0].mana_cost : item.mana_cost,
                   oracle_text: item.oracle_text && item.oracle_text,
                   isPartner: item.keywords.includes("Partner"),
                   artist: item.artist
                }
            })
             const token = window.localStorage.getItem('token')
             fetch('https://edh-builder-api-m7vk6.ondigitalocean.app/updateentries', { 
                 method: 'POST',
                 headers: {
                        'content-Type': 'application/json',
                        'Authorization': token
                 },
                 body: JSON.stringify({ cardsToAdd: cardsToAdd })
             })
             .then(resp => { 
                 if (resp === "success") { 
                     setSuccess(true)
                 }
               })
        })
    }

    return (
    <div className="background">
      <div className="username-container">
		<form>
            <h1>Add new Set</h1>
            <input 
			    onChange={(e) => setSetId(e.target.value)} 
				value={setId} 
				type="text" 
				placeholder="Set Code"
			/>
            <input type="submit" onClick={(e) => fetchNewSet(e)} className="signin-button"/>
            <p style={{margin: "5px"}}>{success && "entrys successfully updated"}</p>
		</form>
        <form>
            <h1>Update Entrys</h1>
            <div {...getRootProps()}>
			  <div className={`drop-area ${isDragActive && 'drag-active'}`}>
				<input onChange {...getInputProps()} />
				{ 
				  jsonFile ? <div className="uploaded-file">
				  <img src={json} alt="profile"/>
				     <div>{jsonFile.name}</div>
				     <button onClick={() => setJsonFile("")} className="clear">x</button>
				  </div> :
				  <><img src={upload} alt="upload-icon"/><p>Drag 'n' drop .json file here, or click to select files</p></>
				}
				</div>
			</div>
            <input type="submit" onClick = {(e) => sendJsonFile(e)} className="signin-button"/>
            <p style={{margin: "5px"}}>{success && "entrys successfully updated"}</p>
		</form>
	  </div>
	</div>
    );
}

export default AddCards;