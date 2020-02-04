import React from 'react';
import axios from 'axios';
import Slide from './Slide'

class Carousel extends React.Component{
    constructor(){
        super();
        this.state = {
            movies: [],
            series: [],
            books: [],
            cds: [],
            moviesIndex: 0,
            seriesIndex: 0,
            booksIndex: 0,
            cdsIndex: 0
        }
    }
    nextSlide = (type) => {
        let media = type;
        let indexString = type+'Index';
        let mediaIndex = this.state[indexString];

        mediaIndex++;

        if(mediaIndex < media.length){
            this.setState({ [indexString]: mediaIndex })
        }

    }
    prevSlide = (type) => {
        let indexString = type+'Index';
        let mediaIndex = this.state[indexString];
        mediaIndex--;
        if(mediaIndex >= 0){
            this.setState({ [indexString]: mediaIndex })
        }
    }
    getSlides = (type) => {
        var mappedType = this.state[type].map(
            (media, index) => {
                return( 
                    <Slide
                        key={index}
                        collection={media}
                    /> 
                );
            }
        )

        return mappedType;
    }
    // fillArrs = (type) => {
    //     axios
    //     .get( `/api/collections?type=${type}` )
    //     .then( res => {type = res.data; this.setState({type})} )
    //     .catch( err => console.log(err) );
    // }
    componentDidMount(){
        let mediaArr = ['movies', 'series', 'books', 'music'];
        let typeData = [];

        mediaArr.forEach(
            type => {
                axios
                .get( `/api/collections?type=${type}` )
                .then( res => {typeData = res.data; this.setState({[type]: typeData})} )
                .catch( err => console.log(err) );
            }
        );
        
    }
    render(){
        let { moviesIndex, movies, series, seriesIndex, books, booksIndex, cds, cdsIndex } = this.state;
        var mappedMovies = this.state.movies.map(
            (movie, index) => {
                return(
                    <Slide
                        key={index}
                        movie={movie}
                    />
                )
            }
        );
        var mappedSeries = this.state.series.map(
            (series, index) => {
                return(
                    <Slide
                        key={index}
                        movie={series}
                    />
                )
            }
        );
        var mappedBooks = this.state.books.map(
            (books, index) => {
                return(
                    <Slide
                        key={index}
                        movie={books}
                    />
                )
            }
        );
        return(
            <>
                <h1>Carousel Beta</h1>
                <div className="carousel-wrap">
                    <div className="carousel-mask">
                        { mappedMovies[moviesIndex] }
                        { mappedMovies[moviesIndex + 1] }
                        { mappedMovies[moviesIndex + 2] }
                        { mappedMovies[moviesIndex + 3] }
                    </div>
                    {
                        moviesIndex <= movies.length - 5
                            ?
                                <button onClick={ (type) => this.nextSlide('movies')} className="next slide-button">
                                    &gt;
                                </button>
                            : null
                    }
                    
                    {
                        moviesIndex > 0
                            ?
                                <button onClick={ (type) => this.prevSlide('movies') } className="prev slide-button">
                                    &lt;
                                </button>
                            : null
                    }
                </div>
                <div className="carousel-wrap mrg-top-60">
                    <div className="carousel-mask">
                        { mappedSeries[seriesIndex] }
                        { mappedSeries[seriesIndex + 1] }
                        { mappedSeries[seriesIndex + 2] }
                        { mappedSeries[seriesIndex + 3] }
                    </div>
                    {
                        seriesIndex <= series.length - 5
                            ?
                                <button onClick={ (type) => this.nextSlide('series') } className="next slide-button">
                                    &gt;
                                </button>
                            : null
                    }
                    
                    {
                        seriesIndex > 0
                            ?
                                <button onClick={ (type) => this.prevSlide('series') } className="prev slide-button">
                                    &lt;
                                </button>
                            : null
                    }
                </div>
                <div className="carousel-wrap mrg-top-60">
                    <div className="carousel-mask">
                        { mappedBooks[booksIndex] }
                        { mappedBooks[booksIndex + 1] }
                        { mappedBooks[booksIndex + 2] }
                        { mappedBooks[booksIndex + 3] }
                    </div>
                    {
                        booksIndex <= books.length - 5
                            ?
                                <button onClick={ (type) => this.nextSlide('books') } className="next slide-button">
                                    &gt;
                                </button>
                            : null
                    }
                    
                    {
                        booksIndex > 0
                            ?
                                <button onClick={ (type) => this.prevSlide('books') } className="prev slide-button">
                                    &lt;
                                </button>
                            : null
                    }
                </div>
            </>
        );
    }
}


export default Carousel;