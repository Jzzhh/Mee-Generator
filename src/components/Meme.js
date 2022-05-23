import React, {useEffect, useState} from "react";
// import memesData from "../memesData.js";
import axios from "axios";

function Meme() {

    const [meme, setmemeImage] = useState({
        topText : "",
        bottomText : "",
        url : 'http://i.imgflip.com/1bij.jpg'
    });
    const [memesData,setMemesData] = useState({});

    useEffect(()=>{
        const url = `https://api.imgflip.com/get_memes`
        axios.get(url)
            .then(res => {
                setMemesData(res.data);
            })
            .catch(err=>{
                alert(err.message)
            })
    },[])

    function getMemeImage() {
        const memesArray = memesData.data.memes;
        const randomNum = Math.floor(Math.random() * memesArray.length);
        const imageURL = memesArray[randomNum].url;
        setmemeImage( prev => ({
            ...prev,
            url: imageURL
        }) );
    }

    function handleChange(event) {
        const name = event.target.name;
        setmemeImage(prev => ({
            ...prev,
            [name]: event.target.value
        }))
    }

    function dragEnd(e) {
        console.log(e);
        e.preventDefault();
        return (
            <p>aaa</p>
        )
    }

    function drop(event) {
        
    }

    return (
        <main>
            <div className="form">
                <input 
                    className="form-input" 
                    type="text" 
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                    <input 
                        className="form-input" 
                        type="text" 
                        placeholder="Bottom text"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}    
                    />
                    <button 
                        className="meme-button"
                        onClick={getMemeImage}
                    >
                        Get a new meme image
                    </button>
                </div>
                <div className="meme">
                    <img id="meme-image" src={meme.url} alt="pikapika"/>
                    <h2 className="meme-text top" draggable="true">{meme.topText}</h2>
                    <h2 
                        className="meme-text bottom" 
                        draggable="true" 
                        onDragEnd={dragEnd}
                        onDrop={drop}
                    >
                        {meme.bottomText}
                    </h2>
                </div>
            </main>
        )
}

export default Meme;


