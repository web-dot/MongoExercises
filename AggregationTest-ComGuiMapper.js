db.getCollection('dhi_committee_guideline_mapper').aggregate([
    {
        "$match":{
            "accreditationBody":"NAAC",
            "guidelineId":"5.1.3",
            "moduleType":"Committee"
        }
    },
    {
        "$project":{
            "committeeLocalField":{
                "$map":{
                    "input":{
                        "$map":{
                            "input":"$mappedCommittees",
                            "in":{
                                "$arrayElemAt":[
                                    {
                                        "$objectToArray":"$$this"
                                    },
                                    1
                                ]
                            }
                        }
                    },
                    "in":"$$this.v"
                }
            }
        }
    },
    {
        "$unwind":{
            "path":"$committeeLocalField",
            "preserveNullAndEmptyArrays":true
        }
    },
    {
        "$lookup":{
            "from":"dhi_committee",
            "localField":"committeeLocalField",
            "foreignField":"_id",
            "as":"committees"
        }
    },
    // {
    //     "$unwind": "$committees"
    //   },
    //   {
    //     "$project": {
    //       "eventLocalField": {
    //         "$map": {
    //           "input": {
    //             "$map": {
    //               "input": "$committees.events",
    //               "in": {
    //                 "$arrayElemAt": [
    //                   {
    //                     "$objectToArray": "$$this"
    //                   },
    //                   1
    //                 ]
    //               }
    //             }
    //           },
    //           "in": "$$this.v"
    //         }
    //       }
    //     }
    //   },
    //   {
    //     "$unwind": {
    //       "path": "$eventLocalField",
    //       "preserveNullAndEmptyArrays": true
    //     }
    //   },
    //   {
    //     "$lookup": {
    //       "from": "dhi_event",
    //       "localField": "eventLocalField",
    //       "foreignField": "_id",
    //       "as": "events"
    //     }
    //   },
    //   {
    //     "$unwind": "$events"
    //   },
    //   {
    //     "$match": {
    //       "events.academicYear": "2021-22",
    //       "events.eventStatus": "Completed"
    //     }
    //   },
  //     {
  //       "$unwind": "$events.participants"
  //     },
  //     {
  //       "$lookup": {
  //         "from": "dhi_user",
  //         "localField": "events.participants._id",
  //         "foreignField": "_id",
  //         "as": "user"
  //       }
  //     },
  //     {
  //       "$unwind": "$user"
  //     },
  //     {
  //       "$match": {
  //         "user.userType": "STUDENT"
  //       }
  //     },
  //     {
  //       "$group": {
  //         "_id": "$events._id",
  //         "eventDesc": {
  //           "$first": {
  //             "$ifNull": [
  //               "$events.description",
  //               "-"
  //             ]
  //           }
  //         },
  //         "eventName": {
  //           "$first": "$events.name"
  //         },
  //         "eventId": {
  //           "$first": "$events._id"
  //         },
  //         "eventFromDate": {
  //           "$first": "$events.fromDate"
  //         },
  //         "eventToDate": {
  //           "$first": "$events.toDate"
  //         },
  //         "user": {
  //           "$push": "$$ROOT.user"
  //         },
  //         "eventType": {
  //           "$first": "$events.eventType"
  //         },
  //         "eventLevel": {
  //           "$first": "$events.level"
  //         }
  //       }
  //     },
  //     {
  //       "$project": {
  //         "eventDesc": {
  //           "$ifNull": [
  //             "$eventDesc",
  //             "-"
  //           ]
  //         },
  //         "eventName": "$eventName",
  //         "eventId": "$eventId",
  //         "eventFromDate": "$eventFromDate",
  //         "eventToDate": "$eventToDate",
  //         "eventType": "$eventType",
  //         "eventLevel": "$eventLevel",
  //         "studentCount": {
  //           "$size": "$user"
  //         }
  //       }
  //     },
  //     {
  //       "$sort": {
  //         "eventLevel": 1
  //       }
  //     }
  // 
])