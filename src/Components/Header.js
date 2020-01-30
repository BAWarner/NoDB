import React, { Component } from 'react';


export default class Header extends Component{
    render(){
        return(
            <header>
                <div>
                    <img src='' alt='Logo'/>
                </div>
                <div>
                    <nav>
                        <ul>
                            <li>Movies</li>
                            <li>Books</li>
                            <li>Music</li>
                            <li>Add New</li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}