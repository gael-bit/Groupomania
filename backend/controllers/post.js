const Models = require('../models/models');
const fs = require('fs');
const { Op } = require("sequelize");

exports.post = async (req, res, next) => {
    /*try {
        if (req.file) {
          await sharp(req.file.path, { failOnError: false })
            .resize({ width: 200, height: 100 })
            .toFile(
              path.resolve(req.file.destination, req.file.filename),
            )
          // Vous pouvez utiliser ces variables pour faire des insertions en base de données ou autre
          let filename = req.file.filename
          console.log('Hello!!!');
          req.body.image = filename
          //let alt_text = req.body.alt_text
        }
        res.send('Upload fini')
    } 
    catch (e) {
        res.status(400).send(e)
    }*/
    console.log(req.body)
    await Models.sequelizes.sync();

   if(req.file == undefined){
       if(req.body.ref == null){
            Models.Post.create({
                text: req.body.text, 
                image: null,
                author: req.body.author, 
                ref: null,
                user_id: 7 
            })
            .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
            .catch(error => {console.log(error); res.status(400).json({message : "Objet non enregistré !"})});
       }
       else{
        Models.Post.create({
            text: req.body.text, 
            image: null,
            author: req.body.author, 
            ref: req.body.ref,
            user_id: 7 
        })
        .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
        .catch(error => {console.log(error); res.status(400).json({message : "Objet non enregistré !"})});
       }
        
    }
    else{
        if(req.body.ref == null){
            Models.Post.create({
                text: req.body.text, 
                image: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`, 
                author: req.body.author, 
                ref: null,
                user_id: 7 
            })
            .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
            .catch(error => {console.log(error); res.status(400).json({message : "Objet non enregistré !"})});
        }
        else{
            Models.Post.create({
                text: req.body.text, 
                image: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`, 
                author: req.body.author, 
                ref: req.body.ref,
                user_id: 7 
            })
            .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
            .catch(error => {console.log(error); res.status(400).json({message : "Objet non enregistré !"})});
        }
    }  
};

exports.getPost = async (req, res, next) => {// affiche tous les posts enregistrés dans la base de données
   console.log(req.query)
    if(req.query.postId == undefined){
        await Models.sequelizes.sync();
        Models.Post.findAll()
            .then(posts => {
                console.log("ligne 36");
                res.status(201).json({ message: posts })
                posts.forEach((post) => {
                    console.log(post.dataValues);// avec l'instruction : return post.dataValues; on affiche les posts suru l'application

                })
            }).catch(function (e) {
                //gestion erreur
                console.log(e);
            });
    }
    else{
        await Models.sequelizes.sync();
        Models.Post.findAll({
            where: {
                ref: req.query.postId}
            })
                
            .then(posts => {
                console.log("ligne 37");
                res.status(201).json({ message: posts })
                posts.forEach((post) => {
                    console.log(post.dataValues);// avec l'instruction : return post.dataValues; on affiche les posts suru l'application

                })
            }).catch(function (e) {
                //gestion erreur
                console.log(e);
        });
    }
    

};


/*
exports.deletePost = (req, res, next) => {// apès avoir récupéré l'id du post on le supprime de la base de données
    (async () => {
        await Models.sequelizes.sync();
        let id = req.params.id;
        
        Models.Post.destroy({
            where: {id: id}
        })
        .then(post =>{ 
            console.log(post);
        }).catch(function (e) {
            //gestion erreur
            console.log(e);
        });
        
      })()
      .then(() => res.status(201).json({ message : 'Objet supprimé !'}))
	  .catch(error => {console.log(error); res.status(400).json({message : "Objet non supprimé !"})});
   
};*/


exports.deletePost = async (req, res, next) => {// apès avoir récupéré l'id du post on le supprime de la base de données

    console.log(req.body.author)
    await Models.sequelizes.sync();

    Models.Post.findAll({where: {author: req.body.author}})
    .then(post =>{ 
        if(post[0].dataValues.image != null){
            const filename = post[0].dataValues.image.split('/image/')[1];
            fs.unlink(`image/${filename}`,() => {
                Models.Post.destroy({where: {author: req.body.author}})
                .then(() => res.status(201).json({ message: 'Objet supprimé !!!'}))
                .catch(error => res.status(400).json({error}));
            });
        }
        else{
            Models.Post.destroy({where: {author: req.body.author}})
            .then(() => res.status(201).json({ message: 'Objet supprimé pour de bon!!!'}))
            .catch(error => res.status(400).json({error}));
        }
        
    })
    .catch(function (e) {
        //gestion erreur
        console.log(e);
    });
};
