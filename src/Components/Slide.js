import React from 'react';

class Slide extends React.Component{
    constructor(){
        super();
        this.state ={
            showDetails: false
        }
        
    }
    showDetails = () => {
        this.setState({showDetails: true})
    }
    hideDetails = () => {
        this.setState({showDetails: false})
    }
    render(){
        let { title, genre, runtime, releaseYear, poster} = this.props.movie;
        runtime = Math.floor(runtime / 60) + 'h ' + (runtime % 60) + 'm';
        return(
            <div 
                className="single-carousel-item relative"
                style={ {backgroundImage: "url(" +poster +")"} }
                onMouseEnter={this.showDetails}
                onMouseLeave={this.hideDetails}
            >
                {
                    this.state.showDetails === true
                        ? 
                            <div className="overlay">
                                <div className="details">
                                    <h1>{title}</h1>
                                    <span className="block">{genre}</span>
                                    <span className="block">{releaseYear}</span>
                                    <span className="block">{runtime}</span>
                                </div>
                            </div>
                        : null

                }
                
            </div>
        );
    }
}

export default Slide;