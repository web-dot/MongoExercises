/**Mongo Query Exercises, Collection: restaurants */

/**
 * write a query to display the fields resturant_id, borough and cuisine,
 *  but exclude the field _id
 */

db.getCollection("restaurants").aggregate([
    {
        "$project":{
            "_id":0,
            "restaurant_id":1,
            "borough":1,
            "cuisine":1
        }
    }
])

/**
 * waq to display all restaurants that are in the boriugh bronx
 */
db.getCollection("restaurants").find({"borough":"Bronx"})

/**
 * waq to display next 5 restaurants after skipping first 5 
 */
db.getCollection("restaurants").find({}).skip(5).limit(5)


/**
 * restaurants who achived score more than 30
 */
db.getCollection("restaurants").find({"grades":{"$elemMatch":{"score":{"$gt":30}}}})


// notable operators
// 1. $elemMatch










