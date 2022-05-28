import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
// import Draggable from "react-draggable";
import DragText from "./DragText";
import { AiOutlineDelete, AiOutlineUp, AiOutlineDown} from 'react-icons/ai';
import html2canvas from "html2canvas";

function Meme() {

    const el = useRef(null);

    const [meme, setmemeImage] = useState({
        texts: [],
        latest: "",
        edit: true,
        select:'',
        url : 'http://i.imgflip.com/1bij.jpg',
        downloadUrl:''
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

    useEffect(() => {
        const element = el.current;
        html2canvas(element, {useCORS: true, allowTaint: true}).then( canvas => {
            setmemeImage( prev => ({
                ...prev,
                downloadUrl: canvas.toDataURL('meme.png')
            }))
        })
    },[meme])

    function getMemeImage() {
        const memesArray = memesData.data.memes;
        const randomNum = Math.floor(Math.random() * memesArray.length);
        const imageURL = memesArray[randomNum].url;
        setmemeImage( prev => ({
            ...prev,
            texts:[],
            latest:'',
            nextId: 1,
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

    function handleAdd() {
        const context = meme.latest;
        const txt = {
            message: context,
            fontSize: 2,
            id: meme.nextId
            // selected: false
        }
        let arr = [...meme.texts];
        arr.push(txt);
        setmemeImage(prev => ({
            ...prev,
            texts: arr,
            latest:'',
            nextId: meme.nextId + 1
        }))
    }

    function clearText() {
        setmemeImage(prev => ({
            ...prev,
            texts:[],
            latest:'',
            edit: false
        }))
    }

    function onText(id) {
        // const newArr = meme.texts.map( (text, index) => {
        //     console.log(index)
        //     console.log(id)
        //     return index === id ? {...text, selected: !text.selected} : text
        // })

        setmemeImage( prev => ({
            ...prev,
            edit: false,
            // texts: newArr
            select: id
        }))

        // console.log(meme)
    }

    function handleEdit(event) {
        // console.log(meme)
        // event.preventDefault();
        const id = event.target.id
        // console.log(event)
        switch(id) {
            case 'plus' : {
                const arr = meme.texts.map( (text, index) => {
                    return meme.select === index ? {...text,fontSize: text.fontSize + 1 } : text
                })
                setmemeImage( prev => ({
                    ...prev,
                    texts: arr
                }))
            }break;
            case 'minus' : {
                const arr = meme.texts.map( (text,index) => {
                    return meme.select === index ? { ...text, 
                                             fontSize: text.fontSize > 1 ? text.fontSize - 1 : text.fontSize 
                                            } : text
                })
                setmemeImage( prev => ({
                    ...prev,
                    texts: arr
                }))
            }break;
            case 'delete' : {
                const arr = [...meme.texts];
                arr.splice(meme.select,1);
                console.log(meme.select);
                console.log(arr);
                setmemeImage( prev => ({
                    ...prev,
                    texts: arr,
                    edit: true,
                    select:''
                }))
            }break;
            default:{}
        }
    }

    function undoSelect(event) {
        const id = event.target.id;
        if(id !== 'plus' && id !== 'minus' && id !== 'delete' ){
            setmemeImage(prev => ({
                ...prev,
                select:'',
                edit: true
            }))
        }
        // setmemeImage(prev => ({
        //     ...prev,
        //     select:'',
        //     edit: true
        // }))
    }

    return (
        <main onClick={undoSelect}>
            <div className="form">
                <input 
                    className="form-input" 
                    type="text" 
                    placeholder="text"
                    name="latest"
                    value={meme.latest}
                    onChange={handleChange}
                />
                    <button 
                        className="meme-button text-button"
                        onClick={handleAdd}
                    >Add to the meme</button>
                    <button 
                        className="meme-button clear"
                        onClick={clearText}
                        disabled={meme.texts.length <= 0}
                    >
                        Clear All
                    </button>
                    <div className="text-controller" onClick={handleEdit}>
                        <button className="meme-button enlarge" id="plus" disabled={meme.edit}><AiOutlineUp id="plus" /></button>
                        <button className="meme-button small" id="minus" disabled={meme.edit}><AiOutlineDown id="minus" /></button>
                        <button className="meme-button delete" id="delete" disabled={meme.edit}><AiOutlineDelete id="delete" /></button>
                    </div>
                    <button 
                        className="meme-button"
                        onClick={getMemeImage}
                    >
                        Get a new meme image
                    </button>
                </div>
                <div className="meme" ref={el}>
                    <img id="meme-image" src={meme.url} alt="pikapika" crossOrigin="*" />
                    <h2 className="meme-text top">{meme.latest}</h2>
                    {meme.texts.map((text, index) => {
                        return (
                            <DragText 
                                context={text.message} 
                                key={text.id} 
                                id={index}
                                size={text.fontSize}
                                show={meme.select}
                                toggle={onText}
                            />
                        )
                    })}
                </div>
                <a href={meme.downloadUrl} download><button className="meme-button">Download</button></a>
            </main>
        )
}

export default Meme;
