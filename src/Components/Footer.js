import React, { Component } from 'react';


export default class Footer extends Component{
    render(){
        let d = new Date();
        return(
            <footer className="text-center">
                <span className="copyright block">My Media Library (v 0.1) by Brandon Warner <br/> &copy; { d.getFullYear() }</span>
            </footer>
        )
    }
}
