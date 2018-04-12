const Stream = require('../models/stream.js');

// crea un nuovo stream
exports.create = (req, res) => {
      console.log(req.body);
      var newStream = new Stream({
        name:        req.body.name,
        description: req.body.description,
        structures:  req.body.structures,  // saranno vuote all'inizio...
        project:     req.body.project
      });
      newStream.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Save stream failed.'});
        }
        //si ripassa l'obj con l'_id generato
        res.json({success: true, msg: 'Successful created new stream.', data: newStream });
      });
};

// recupera tutti gli stream di un utente
exports.getUserStreams = (req, res) => {
    let userId = req.query.id;
    if (!userId) {
      return res.json({ success: false, msg: 'Save stream failed.' });
    } else {
      Stream
      .find({ _id: userId })
      // .populate('structures','name')  // popola le strutture solo il campo nome
      .populate({
        path: 'structures',
        // Explicitly exclude `jsonstring`, see http://bit.ly/2aEfTdB
        select: 'name _id -jsonstring'
      })
      .exec((err, streams) => {
        if (err) return next(err);
        res.json(streams);
      });
    }
};

// recupera il singolo stream passando l'id
exports.getStreamById = (req, res) => {
      Stream.findById(req.params.streamId, function(err, stream) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({success:false, message: "Stream not found with id " + req.params.streamId});
            }
            return res.status(500).send({success:false, message: "Error retrieving stream with id " + req.params.streamId});
        }
        if(!stream) {
            return res.status(404).send({success:false, message: "Stream not found with id " + req.params.streamId});
        }
        res.send(stream);
    });
};


// aggiorna il singolo stream passando l'id
exports.update = (req, res) => {
      // Update a stream identified by the streamId in the request
      Stream.findById(req.params.streamId, function(err, stream) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({success: false,message: "Stream not found with id " + req.params.streamId});
            }
            return res.status(500).send({success: false,message: "Error finding stream with id " + req.params.streamId});
        }
        if(!stream) {
            return res.status(404).send({success: false,message: "Stream not found with id " + req.params.streamId});
        }
        stream.name        = req.body.name;
        stream.description = req.body.description;
        stream.structures  = req.body.structures;
        stream.project     = req.body.project;

        stream.save(function(err, data){
            if(err) {
                res.status(500).send({success: false,message: "Could not update stream with id " + req.params.streamId});
            } else {
                res.send(data);
            }
        });
    });
};

// cancella il singolo stream passando l'id
exports.delete = (req, res) => {
      // Delete a stream with the specified streamId in the request
      Stream.findByIdAndRemove(req.params.streamId, function(err, stream) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Stream not found with id " + req.params.streamId});
            }
            return res.status(500).send({message: "Could not delete stream with id " + req.params.streamId});
        }
        if(!stream) {
            return res.status(404).send({message: "Stream not found with id " + req.params.streamId});
        }
        res.send({message: "Stream deleted successfully!"})
    });
};
