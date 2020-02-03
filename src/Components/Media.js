import React, { Component } from 'react';
import axios from 'axios';
import Details from './Details';

class Media extends Component{
    constructor(){
        super();
        this.state = {
            showEdit: false,
            showDetails: false,
            showCheckedOut: false,
            type: '',
            title: '',
            poster: '',
            releaseYear: null,
            genre: '',
            checkedOut: false,
            checkedTo: {
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

        this.updateMedia = this.updateMedia.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.removeMedia = this.removeMedia.bind(this);
        this.changeChecked = this.changeChecked.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
        this.toggleCheckedOut = this.toggleCheckedOut.bind(this);
    }
    componentDidMount() {
        let { 
                type, title, poster, releaseYear, genre, checkedOut, checkedTo, artist,
                director, runtime, seasons,network, author
            } = this.props.collection;

            this.setState(
                {
                    type,
                    title,
                    poster,
                    releaseYear,
                    genre,
                    checkedOut,
                    checkedTo,
                    artist,
                    director,
                    runtime,
                    seasons,
                    network,
                    author
                }
            );
    }
    removeMedia(){
        let id = this.props.collection.id;

        axios
        .delete(`/api/collections/${id}`)
        .then( res => {
                this.props.updateCollection(res.data);
            }
        )
        .catch( err => console.log(err) )
    }
    updateMedia(){
        let id = this.props.collection.id;
        let { 
                type, title, poster, releaseYear, genre, checkedOut, checkedTo, artist,
                director, runtime, seasons,network, author
            } = this.state;
        
        console.log(checkedTo);

        let body = {
            id: id,
            type: type,
            title: title,
            poster: poster,
            releaseYear: releaseYear,
            genre: genre,
            checkedOut: checkedOut,
            checkedTo: checkedTo,
            artist: artist,
            director: director,
            runtime: runtime,
            seasons: seasons,
            network: network,
            author: author
        }

        axios
        .put( `/api/collections/info/${id}`, body)
        .then( res => this.props.updateCollection(res.data) )
        .catch( err => console.log(err) )
    }
    updateInputValue(e){
        if(e.target.name === 'person' || e.target.name === 'dateCheckedOut'){
            let newObj = {
                ...this.state.checkedTo,
                [e.target.name]: e.target.value
            }
            this.setState({checkedTo: newObj})
        }else{
            this.setState({[e.target.name]: e.target.value})
        }
    }

    changeChecked(){
        let { id } = this.props.collection;
        let body;

        if(this.state.checkedOut === false){
            body = {
                checkedTo: this.state.checkedTo
            }
        }else{
            this.setState({checkedOut: false, checkedTo: {person: '', dateCheckedOut: ''}})
            body = {
                checkedTo: this.state.checkedTo
            }
        }


        axios
        .put(`/api/collections/${id}`, body)
        .then( res => {
                this.props.updateCollection(res.data);
            } 
        )
        .catch( err => console.log(err) );
    }

    toggleEdit(){

        this.setState(
            {
                showEdit: !this.state.showEdit
            }
        )

    }
    toggleDetails(){
        this.setState(
            {
                showDetails: !this.state.showDetails
            }
        )
    }
    toggleCheckedOut(){
        if(this.state.checkedOut === false){
            this.setState({ showCheckedOut: !this.state.showCheckedOut });
        }else{
            this.changeChecked();
        }
    }

    render(){
        let { title, type, poster, releaseYear, checkedOut, artist, author } = this.props.collection;
        return(
            <div className="single">
                <div className="buttons-row flex justify-between align-center">
                    {
                        this.state.showCheckedOut === true
                            ?
                                <div className="form-wrap">
                                    <form>
                                        <span onClick={() => this.setState({showCheckedOut: false})} className="close">&times;</span>
                                        <h1 className="text-center">Who checked {title} out?</h1>
                                        <input 
                                            onChange={this.updateInputValue} 
                                            placeholder="Full Name" 
                                            name="person" 
                                            type="text" 
                                        />
                                        <input 
                                            onChange={this.updateInputValue} 
                                            placeholder="Date of checkout" 
                                            name="dateCheckedOut" 
                                            type="text" 
                                        />
                                        <input 
                                            type='submit'
                                            value="Check Out"
                                            onClick={this.changeChecked}
                                        />
                                    </form>
                                </div>
                            : null
                    }
                    <span onClick={this.toggleCheckedOut} className="checked">
                    {
                        checkedOut === true
                            ? <span>&#10003;</span>
                            : null
                    }
                    </span>
                    <button onClick={this.toggleEdit}>Edit</button>
                    {
                        this.state.showEdit === true
                            ? <span className="editing-media">Editing</span>
                            : null
                    }
                    <button onClick={this.removeMedia}>Remove</button>
                </div>
                {
                    this.state.showEdit === true
                        ? <div className="form-wrap">
                            <form>
                                <h1 className="text-center">Editing {title}</h1>
                                <span className="close" onClick={this.toggleEdit}>&times;</span>
                                <div className="poster-wrap">
                                    <input
                                        className="mrg-0-auto block" 
                                        onChange={this.updateInputValue} 
                                        name="poster" 
                                        placeholder="URL to Poster" 
                                        type="text" 
                                        value={this.state.poster}
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
                                    value={this.state.title}
                                />
                                <input 
                                    onChange={this.updateInputValue} 
                                    name="type" 
                                    placeholder="Media Type" 
                                    type="text" 
                                    value={this.state.type}
                                />
                                <input 
                                    onChange={this.updateInputValue} 
                                    name="releaseYear" 
                                    placeholder="Release Year" 
                                    type="text"
                                    value={this.state.releaseYear}
                                />
                                <input 
                                    onChange={this.updateInputValue} 
                                    name="genre" 
                                    placeholder="Genre" 
                                    type="text"
                                    value={this.state.genre}
                                />
                                <input 
                                    onChange={this.updateInputValue} 
                                    name="artist" placeholder="Artist" 
                                    type="text"
                                    value={this.state.artist}
                                />
                                <input 
                                    onChange={this.updateInputValue} 
                                    name="director" 
                                    placeholder="Director" 
                                    type="text"
                                    value={this.state.director}
                                />
                                <input 
                                    onChange={this.updateInputValue} 
                                    name="runtime" 
                                    placeholder="Runtime (In minutes)" 
                                    type="text"
                                    value={this.state.runtime}
                                />
                                <input 
                                    onChange={this.updateInputValue} 
                                    name="seasons" 
                                    placeholder="Number of Seasons" 
                                    type="text"
                                    value={this.state.seasons}
                                />
                                <input 
                                    onChange={this.updateInputValue} 
                                    name="network" 
                                    placeholder="Network(s)" 
                                    type="text"
                                    value={this.state.network}
                                />
                                <input 
                                    onChange={this.updateInputValue} 
                                    name="author" 
                                    placeholder="Author" 
                                    type="text"
                                    value={this.state.author}
                                />

                                <button 
                                    className="submit" 
                                    onClick={this.updateMedia}
                                >Update Collection</button>
                            </form>
                          </div>
                        : null
                }
                <img
                    onClick={this.toggleDetails} 
                    src={ 
                        poster
                            ? poster
                            : 'https://dummyimage.com/250x375/dddddd/ffffff.png&text=Poster+Placeholder'
                    } 
                    alt="poster"
                />
                <div className="essentials">
                    <h2 className="mrg-top-15">{title}</h2>
                    <span className="single-info block">{type.charAt(0).toUpperCase() + type.substring(1)}</span>
                    {
                        artist
                            ? <span className="single-info block">{artist}</span>
                            : null
                    }
                    {
                        author
                            ? <span className="single-info block">{author}</span>
                            : null
                    }
                    <span className="single-info block"><em>({releaseYear})</em></span>
                    
                </div>
                {
                    this.state.showDetails === true
                        ? <Details
                            collection={this.props.collection}
                          />
                        : null
                }

            </div>
        )
    }
}

export default Media;