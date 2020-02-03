import React, { Component } from 'react';
import axios from 'axios';

class AddMedia extends Component{
    constructor(){
        super();

        this.state = {
            type: '',
            title: '',
            poster: '',
            releaseYear: null,
            genre: '',
            checkedOut: false,
            chekcedTo: {
                person: '',
                dateCheckedOut: ''
            },
            artist: '',
            director: '',
            runtime: null,
            seasons: null,
            network: '',
            author: ''
        }

    }
    updateInputValue = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    } 
    toggleNewMedia = () => {
        this.props.toggleNewMedia(false);
    }
    addMedia = () => {
        axios
        .post('/api/collections', this.state)
        .then( res => this.props.updateCollections(res.data) )
        .catch( err => console.log(err) );
    }
    render(){
        return(
            <section className="form-wrap">
                <form>
                    <h1 className="text-center">Add {this.state.title} to your {this.state.type} collection</h1>
                    <span className="close" onClick={this.toggleNewMedia}>&times;</span>
                    <div className="poster-wrap">
                        <input 
                            onChange={this.updateInputValue} 
                            name="poster" 
                            placeholder="URL to Poster" 
                            type="text"
                            className="mrg-0-auto block" 
                        />
                        {
                            this.state.poster !== ''
                                ? <img className='poster-preview block' 
                                        src={this.state.poster}
                                        alt="preview"
                                    />
                                : <img 
                                    src='https://dummyimage.com/150x200/dddddd/ffffff.png&text=Poster+Placeholder'
                                    alt="preview placeholder"
                                    className='poster-preview block'
                                    />
                        }
                    </div>
                    <input 
                        onChange={this.updateInputValue} 
                        name="title" 
                        placeholder="Media Title" 
                        type="text" 
                    />
                    <input 
                        onChange={this.updateInputValue} 
                        name="type" 
                        placeholder="Media Type" 
                        type="text" 
                    />
                    <input 
                        onChange={this.updateInputValue} 
                        name="releaseYear" 
                        placeholder="Release Year" 
                        type="text" 
                    />
                    <input 
                        onChange={this.updateInputValue} 
                        name="genre" 
                        placeholder="Genre" 
                        type="text" 
                    />
                    {/* <div className="radio-wrap">
                        <h3>Is it already checked out?</h3>
                        <label for="out">Yes</label>
                        <input onChange={this.updateInputValue} id="out" name="checkedOut" type="radio" value="true" />
                        <label for="in">No</label>
                        <input onChange={this.updateInputValue} id="in" name="checkedOut" type="radio" value="false" />
                    </div>

                    {   this.state.checkedOut === true
                            ? 
                                <div className="checkedOut-detail-wrap">
                                    <input 
                                        onChange={this.updateInputValue} 
                                        name="checkedToPerson" 
                                        placeholder="Who is it checked out to?" 
                                        type="text" 
                                    />
                                    <input 
                                        onChange={this.updateInputValue} 
                                        name="checkedToDate" 
                                        placeholder="When did they check it out?" 
                                        type="text" 
                                    />
                                </div>
                            : null
                    } */}

                    {/** Conditional based on type's value  **/}
                    <input 
                        onChange={this.updateInputValue} 
                        name="artist" placeholder="Artist" 
                        type="text" 
                    />
                    <input 
                        onChange={this.updateInputValue} 
                        name="director" 
                        placeholder="Director" 
                        type="text" 
                    />
                    <input 
                        onChange={this.updateInputValue} 
                        name="runtime" 
                        placeholder="Runtime (In minutes)" 
                        type="text" 
                    />
                    <input 
                        onChange={this.updateInputValue} 
                        name="seasons" 
                        placeholder="Number of Seasons" 
                        type="text" 
                    />
                    <input 
                        onChange={this.updateInputValue} 
                        name="network" 
                        placeholder="Network(s)" 
                        type="text" 
                    />
                    <input 
                        onChange={this.updateInputValue} 
                        name="author" 
                        placeholder="Author" 
                        type="text" 
                    />

                    <button 
                        className="submit" 
                        onClick={this.addMedia}
                    >Add to Collection</button>
                </form>
            </section>
        );
    }

}


export default AddMedia;