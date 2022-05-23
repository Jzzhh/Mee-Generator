import React from "react";

class Header extends React.Component {
    render(){
        return (
            <header className="header">
                <img id="headImage" src={require('../images/face.png')} alt="an interesting face." />
                <h2 id="title">MEME Generator</h2>
                <h4 id="author">Demo</h4>
            </header>

        )
    }
}

export default Header;
