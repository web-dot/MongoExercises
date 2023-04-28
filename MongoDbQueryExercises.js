/**Mongo Query Exercises, Collection: restaurants */

//write a query to display the fields resturant_id, borough and cuisine, but exclude the field _id

db.getCollection("restaurants").aggregate([
    {
        "$project":{
            "_id":0,
            "restaurant_id":1,
            "borough":1,
            "cuisine":0
        }
    }
])