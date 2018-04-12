const Structure = require('../models/structure.js');

// crea una nuova struttura
exports.create = (req, res) => {
      console.log(req.body);
      var newStructure = new Structure({
        name:       req.body.name,
        jsonstring: req.body.jsonstring,
        stream:     req.body.stream
      });
      newStructure.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Save structure failed.'});
        }
        //si ripassa l'obj con l'_id generato
        res.json({success: true, msg: 'Successful created new structure.', data: newStructure });
      });
};

// recupera tutte le structure di un utente
exports.getUserStructures = (req, res) => {
    let userId = req.query.id;
    if (!userId) {
      return res.json({ success: false, msg: 'Save structure failed.' });
    } else {
      Structure.find({ _id: userId }, function (err, structures) {
        if (err) return next(err);
        res.json(structures);
      });
    }
};

// recupera il singolo structure passando l'id
exports.getStructureById = (req, res) => {
      Structure.findById(req.params.structureId, function(err, structure) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({success:false, message: "Structure not found with id " + req.params.structureId});
            }
            return res.status(500).send({success:false, message: "Error retrieving structure with id " + req.params.structureId});
        }
        if(!structure) {
            return res.status(404).send({success:false, message: "Structure not found with id " + req.params.structureId});
        }
        res.send(structure);
    });
};


// aggiorna il singolo structure passando l'id
exports.update = (req, res) => {
      // Update a structure identified by the structureId in the request
      Structure.findById(req.params.structureId, function(err, structure) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({success: false,message: "Structure not found with id " + req.params.structureId});
            }
            return res.status(500).send({success: false,message: "Error finding structure with id " + req.params.structureId});
        }

        if(!structure) {
            return res.status(404).send({success: false,message: "Structure not found with id " + req.params.structureId});
        }

        structure.name        = req.body.name;
        structure.description = req.body.description;
        structure.category    = req.body.category;
        structure.user        = req.body.user;

        structure.save(function(err, data){
            if(err) {
                res.status(500).send({success: false,message: "Could not update structure with id " + req.params.structureId});
            } else {
                res.send(data);
            }
        });
    });
};


// cancella il singolo structure passando l'id
exports.delete = (req, res) => {
      // Delete a structure with the specified structureId in the request
      Structure.findByIdAndRemove(req.params.structureId, function(err, structure) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Structure not found with id " + req.params.structureId});
            }
            return res.status(500).send({message: "Could not delete structure with id " + req.params.structureId});
        }

        if(!structure) {
            return res.status(404).send({message: "Structure not found with id " + req.params.structureId});
        }

        res.send({message: "Structure deleted successfully!"})
    });
};

