import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import Select from 'react-select-virtualized';
import { requestDecklist } from '../../actions';
import './CreateForm.css';

function CreateForm () {
    const { deckDetails } = useSelector(state => state.requestDecklist)
    const [partners, setPartners] = useState([])
    const [commanders, setCommanders] = useState([])
    const [singlePartner, setSinglePartner] = useState([])
    const [selectedOptionMain, setSelectedOptionMain] = useState();
    const [selectedOptionPartner, setSelectedOptionPartner] = useState();
    const [isPartner, setIsPartner] = useState(false);
    const [isWithPartner, setIsWithPartner] = useState("");
    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");
    const [deckId, setDeckId] = useState(0);
    const [invalid, setInvalid] = useState(false);
    const { userId } = useSelector((state) => state.loginStatus)
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => { 
        fetch(`https://edh-builder-api-m7vk6.ondigitalocean.app/commanders`)
        .then(response => response.json())
        .then(loadedCards => {
            if (loadedCards.length) { 
                const comm = loadedCards.map(commander => {
                    return {value: commander.cardName, label: commander.cardName, isPartner: commander.isPartner, text: commander.oracle_text}
                });
                const part = loadedCards.filter(partner => partner.isPartner && !partner.oracle_text.includes("Partner with"))
                .map(partner => {return {value: partner.cardName, label: partner.cardName}})
                setCommanders(comm)
                setPartners(part)
                setSinglePartner([{value: isWithPartner, label: isWithPartner}])
            }
        })
        .catch()
    }, [setCommanders, setPartners, setSinglePartner, isWithPartner])

    useEffect(() => {
        if(location.pathname !== '/adddeck'){
            setSelectedOptionMain({ label: deckDetails.commander, value: deckDetails.commander });
            setDeckDescription(deckDetails.description);
            setDeckName(deckDetails.deckName)
            if (deckDetails.partner){ 
                setSelectedOptionPartner({ label: deckDetails.partner, value: deckDetails.partner });
                setIsPartner(true)
            }
        }
    },[location, setDeckDescription, setDeckName, setIsPartner, setSelectedOptionMain, setSelectedOptionPartner, deckDetails])


    const createDeck = (e) => { 
        e.preventDefault()
        console.log(selectedOptionMain, selectedOptionPartner)
        const fetchUrl = `https://edh-builder-api-m7vk6.ondigitalocean.app/${location.pathname !== "/adddeck" ? `editdeck/${deckDetails.deckID}` : "createdeck"}`
        fetch(fetchUrl , { 
            method: 'post',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: userId,
                deckName: deckName,
                commander: selectedOptionMain && selectedOptionMain.value,
                deckDescription: deckDescription, 
                partner: selectedOptionPartner && selectedOptionPartner.value
            })
          })
          .then(response => response.json())
          .then(deckID => { 
              if(location.pathname === "/adddeck") { 
                  setDeckId(deckID) 
              } 
              else { 
                  dispatch(requestDecklist(deckDetails.deckID, userId))
              }
            })
          .catch(setInvalid(true))
        }

    const handleChangeMain = selectedOption => {
        setSelectedOptionMain(selectedOption)
        if (selectedOption && selectedOption.isPartner){ 
            setIsPartner(true);
            setIsWithPartner("")
            if (selectedOption.text.includes(`Partner with`))  
                setIsWithPartner(selectedOption.text.substring(13, selectedOption.text.indexOf(" (")))     
        } else { 
            setIsPartner(false)
            setSelectedOptionPartner(null)
        }
    }

    const handleChangePartner = selectedOption => { 
        setSelectedOptionPartner(selectedOption)
    }

    const filterOption = (option, input) => {
        if (option.value.toLowerCase().replace(/'|,|-/g, "").includes(input.toLowerCase().replace(/'|,|-/g, ""))) {
          return true;
        }
        return false;
    };

    const SelectFunc = (options, handleChange, defaultVal) => { 
        return <Select  
                maxMenuHeight={200}
                defaultValue={defaultVal}
                options={options}
                placeholder="Select your commander"
                onChange={handleChange}
                filterOption={filterOption}
                
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        text: "orangered",
                        primary25: "indigo",
                        primary: "indigo",
                        fontsize: "10px"
                    }
                    })}
                />
    }

        return ( 
        <>
        { deckId ? <Redirect to={`/decklist/${deckId}`} /> :
        <div className="outer-create-container">
           <div className="new-deck">
           <div className= "banner"><h1>Deck Details</h1></div>
           <div className = "new-deck-form">
            <input onChange={(e) => setDeckName(e.target.value)} value={deckName} type="text" placeholder="Deck Name" id="deckName"/>
            {SelectFunc(commanders, handleChangeMain, selectedOptionMain)}
                {(isPartner ? SelectFunc(isWithPartner.length ? singlePartner : partners, handleChangePartner, selectedOptionPartner) : null
            )}
            <textarea onChange={(e) => setDeckDescription(e.target.value)} value={deckDescription} placeholder="Your deck in a few words..."/>
            {invalid && <div className="invalid">Please make sure a commander is selected and you have chosen a name for your deck.</div>}
            <input 
                 onClick={(e) => createDeck(e)} 
                 type="submit" 
                 id="new-deck-button" 
                 value={location.pathname === '/adddeck' ? "build" : "edit"}
            />
            </div>
             <div className="bottom-banner"></div>
            </div>
        </div>
        }
        </>
        );
}


export default CreateForm;