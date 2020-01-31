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
    }else if(query.type == 'checkedOut'){
        res
        .status(200)
        .send(
            collection.filter( (val) => val.checkedOut === true)
        );
    }
    else if(query.search){
        res
        .status(200)
        .send( collection.filter( val => val.title.includes(query.search) ) );
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

    // duplicate body, check each key/value pair, if value is empty, leave it from object, push new/cloned body as object to collection array 
    
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
    let { params, body } = req;
    
    let targetMedia = collection.findIndex( media => media.id == params.id);

    collection[targetMedia]["checkedOut"] = !collection[targetMedia]["checkedOut"]
    if(body){
        collection[targetMedia]["checkedTo"]["person"] = body["checkedTo"]["person"];
        collection[targetMedia]["checkedTo"]["dateCheckedOut"] = body["checkedTo"]["dateCheckedOut"];
    }
    res
    .status(200)
    .send(collection);


}

var updateMedia = (req, res) => {

    let { body } = req;
    var id = body.id;
    
    let newMedia = {
        id,
        ...body
    }
    
    collection.splice(id, 1 ,newMedia);


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
    updateMedia,
    deleteSingle
}