import Draggable from "react-draggable";
// import React, {useState} from "react";

export default function DragText(props) {
    const styles = {
        fontSize: props.size + 'em',
        border: props.show ===props.id ? '1.5px solid black' : 'none'
    }

    return (
        <Draggable bounds="parent">
                <h2 
                    className="meme-text" 
                    style={styles}
                    onDoubleClick={ () => props.toggle(props.id)}
                >{props.context}</h2>
        </Draggable>
    )
}
