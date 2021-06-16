import db from '@/firebase/firestore'
import {serverTimeStamp} from '@/firebase/firestore'

export default class baseRepository {

    constructor(collectionName){
        this.collectionName = collectionName
        this.collection = []
    }

    getCollection(cb){
        db.collection(this.collectionName).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data()}`);
                this.collection.push({id: doc.id,  ...doc.data()})
            });
        })
        .catch((e) => {
            console.log(e);
            throw new Error(e.message)
        })

        cb(this.collection)

    }

    updateDocument(data, id = null){
        return new Promise( (resolve, reject) => {
            data = {...data, updated_at: serverTimeStamp}
            db.collection(this.collectionName).doc(id).update(data)
            .then(() => {
                // Message.success("Task submitted successfully")
                resolve()
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                reject( new Error("Error writing document: "+ error.message))
            });
        })
        
    }

    addDocument(data){
        return new Promise( (resolve, reject) => {
            data = {...data, created_at: serverTimeStamp, updated_at: serverTimeStamp}
            db.collection(this.collectionName).add(data)
            .then(() => {
                // Message.success("Task submitted successfully")
                resolve()
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                reject( new Error("Error writing document: "+ error.message))
            });
        })
        
    }

    deleteDocument(id){
        return new Promise( (resolve, reject) => {

            db.collection(this.collectionName).doc(id).delete().then(() => {
            resolve()
            }).catch((error) => {
                console.error("Error removing document: ", error);
            resolve(new Error("Error writing document: "+ error.message))

            });
        })
        
    }

}