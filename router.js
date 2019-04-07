const Router = require('express').Router()
const Database = require('./database')
const ObjectID=require("mongodb").ObjectID

class DbRouter{
    static get(){
        Router.get('/',async(req,res)=>{
            try{
                const docs = await new Database().read({
                    "criteria" : {},
                    "projection" : {},
                    "collection" : "fifth"
                })
                res.status(200).send(docs)
            }
            catch(e){
                console.log(`${e.message}-${e.stack}`)
                res.status(500).send (e)
            }
        })
        Router.post('/',async(req,res)=>{
            try{
                const docs = await new Database().insert({
                    criteria:{},
                    projection:{},
                    collection:"fifth",
                    payload : req.body    
                })
                res.status(200).send(docs)
            }
            catch(e){
                console.log(`${e.message}-${e.stack}`)
                res.status(500).send (e)
            }
        })

        Router.put('/',async(req,res)=>{
            try {
                const docs = await new Database().update({
                    collection :"fifth",
                    criteria : {_id : new ObjectID(req.body.criteria._id)},
                    payload : req.body.payload
                })    
                res.status(200).send(docs)
            } 
            catch (e) {
                
            }
        })

        Router.delete('/',async(req,res)=>{
            try {
                const docs = await new Database().delete({
                    collection :"fifth",
                    criteria : {"_id" : new ObjectID(req.body.criteria._id)},
                })    
                res.status(200).send(docs)
            } 
            catch (e) {
                
            }
        })

        return Router
    }
}

module.exports = DbRouter