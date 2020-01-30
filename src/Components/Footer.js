import React, { Component } from 'react';


export default class Footer extends Component{
    render(){
        let d = new Date();
        return(
            <footer>
                &copy; { d.getFullYear() }
            </footer>
        )
    }
}
