const Project = require('../models/project.js');

// crea un nuovo progetto
exports.create = (req, res) => {
    var token = getToken(req.headers);
    if (token) {
      console.log(req.body);
      var newProject = new Project({
        name:        req.body.name,
        description: req.body.description,
        category:    req.body.category,
        user:        req.body.user
      });
      newProject.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Save project failed.'});
        }
        //si ripassa l'obj con l'_id generato
        res.json({success: true, msg: 'Successful created new project.', data: newProject });
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

// recupera tutti i progetti di un utente
exports.getUserProjects = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    let userId = req.query.userId;
    if (!userId) {
      return res.json({ success: false, msg: 'Was not possible to retrieve the project of the user' });
    } else {
      Project.find({ user: userId }, function (err, projects) {
        if (err) return next(err);
        res.json(projects);
      });
    }
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
};

// recupera il singolo progetto passando l'id
exports.getProjectById = (req, res) => {
    var token = getToken(req.headers);
    if (token) {
      Project.findById(req.params.projectId, function(err, project) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({success:false, message: "Project not found with id " + req.params.projectId});
            }
            return res.status(500).send({success:false, message: "Error retrieving project with id " + req.params.projectId});
        }
        if(!project) {
            return res.status(404).send({success:false, message: "Project not found with id " + req.params.projectId});
        }
        res.send(project);
    });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};


// aggiorna il singolo progetto passando l'id
exports.update = (req, res) => {
    var token = getToken(req.headers);
    if (token) {
      // Update a project identified by the projectId in the request
      Project.findById(req.params.projectId, function(err, project) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({success: false,message: "Project not found with id " + req.params.projectId});
            }
            return res.status(500).send({success: false,message: "Error finding project with id " + req.params.projectId});
        }

        if(!project) {
            return res.status(404).send({success: false,message: "Project not found with id " + req.params.projectId});
        }

        project.name        = req.body.name;
        project.description = req.body.description;
        project.category    = req.body.category;
        project.user        = req.body.user;

        project.save(function(err, data){
            if(err) {
                res.status(500).send({success: false,message: "Could not update project with id " + req.params.projectId});
            } else {
                res.send(data);
            }
        });
    });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};


// cancella il singolo progetto passando l'id
exports.delete = (req, res) => {
    var token = getToken(req.headers);
    if (token) {
      // Delete a project with the specified projectId in the request
      Project.findByIdAndRemove(req.params.projectId, function(err, project) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Project not found with id " + req.params.projectId});
            }
            return res.status(500).send({message: "Could not delete project with id " + req.params.projectId});
        }

        if(!project) {
            return res.status(404).send({message: "Project not found with id " + req.params.projectId});
        }

        res.send({message: "Project deleted successfully!"})
    });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
