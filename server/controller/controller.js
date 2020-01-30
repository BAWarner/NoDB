const collection = require('./collection');

var getAll = (req, res) => {
    let { query } = req;
    if(query.type == 'movie' || query.type == 'movies'){
        res
        .status(200)
        .send(
            collection.filter( (val) => val.type == 'movie')
        );
    }else if(query.type == 'tv' || query.type == 'series' || query.type == 'tv-series'){
        res
        .status(200)
        .send(
            collection.filter( (val) => val.type == 'series')
        );
    }else if(query.type == 'book' || query.type == 'books' || query.type == 'literature'){
        res
        .status(200)
        .send(
            collection.filter( (val) => val.type == 'book')
        );
    }else if(query.type == 'cd' || query.type == 'cds' || query.type == 'music'){
        res
        .status(200)
        .send(
            collection.filter( (val) => val.type == 'cd')
        );
    }
    else{
        res
        .status(200)
        .send(collection);
    }
}

var getSingle = (req, res) => {
    let { params } = req;
    res
    .status(200)
    .send(
        collection.filter( media => media.id == params.id )
    );
}

var createSingle = (req, res) => {
    let { body } = req;
    var id = collection[collection.length - 1]["id"] ;
    id++;
    console.log(id);
    let newMedia = {
        id,
        ...body
    }
    
    collection.push(newMedia);

    res
    .status(200)
    .send(collection);
}

var updateChecked = (req, res) => {
    let { params } = req;

    let targetMedia = collection.findIndex( media => media.id == params.id);

    // if input field is empty, find current value and pass in body

    collection[targetMedia]["checkedOut"] = !collection[targetMedia]["checkedOut"]

    res
    .status(200)
    .send(collection);


}

var deleteSingle = (req, res) => {
    let { params } = req;
    let targetMedia = collection.findIndex( media => media.id == params.id);

    collection.splice(targetMedia, 1);

    res
    .status(200)
    .send(collection);
}


module.exports = {
    getAll,
    getSingle,
    createSingle,
    updateChecked,
    deleteSingle
}