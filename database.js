const MongoClient = require('mongodb').MongoClient
const ObjectID    = require('mongodb').ObjectID

class Database{
    constructor(){
        async function connect(){
            try{
                const conn=await MongoClient.connect("mongodb://localhost:27017",{ useNewUrlParser: true })
                return conn
            }
            catch(e)
            {
                throw e
             }
        }

        this.read = async function(readParams){
            const connection = await connect()
            const db = connection.db("students")
            const collection = db.collection(readParams.collection)
            const docs = await collection.find(readParams.criteria).project(readParams.projection).toArray()
            return docs
        }

        this.insert = async function(insertParams){
            try{
            const connection = await connect()
            const db = connection.db("students")
            const collection = db.collection(insertParams.collection)
            const docs = await collection.insertOne(insertParams.payload)
            return docs
          }
          catch(e){
              throw e
          }
        }

        this.update = async function(updateParams){
            try{
            const connection = await connect()
            const db = connection.db("students")
            const collection = db.collection(updateParams.collection)
            const docs = await collection.updateOne(updateParams.criteria,{$set:updateParams.payload})
            return docs
            }
            catch(e){
                throw e
            }
        }

        this.delete = async function(deleteparams){
            try{
                const connection = await connect()
                const db = connection.db("students")
                const collection = db.collection(deleteparams.collection)
                const docs = await collection.deleteOne(deleteparams.criteria)
                return docs
                }
                catch(e){
                    throw e
                }
        }
    }
}

module.exports = Database