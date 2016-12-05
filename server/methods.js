/**
* Created by utilisateur on 09/03/2016.
*/

Meteor.methods({
  initUploadServerForCity: function (name, lat, long, description, userId) {
    UploadServer.init({
      tmpDir: process.cwd() + '/../../../../../.uploads/tmp',
      uploadDir: process.cwd() + '/../../../../../public/images/' + name,
      checkCreateDirectories: true,
      finished: function (req) {
        var fileName = "/images/" + name + "/" + req.name;
        Cities.insert({
          _id: "c" + Cities.find({}).count(),
          name: name,
          coordinates: {
            long: lat,
            lat: long
          },
          description: description,
          owner:userId,
          picture: fileName,
          activities: []
        });
      }
    });
  },

  'initUploadServerForActivity': function (city, activities) {
    var dirName = city.name;
    UploadServer.init({
      tmpDir: process.cwd() + '/../../../../../.uploads/tmp',
      uploadDir: process.cwd() + '/../../../../../public/images/' + dirName,
      checkCreateDirectories: true, //create the directories for you
      finished: function (req) {
        var fileName = "/images/" + dirName + "/" + req.name;
        activities.picture.push(fileName);
        if(activities.picture.length == 1) {
          Cities.update({
            "_id":city._id
          },
          {$push: {
            "activities": {
              _id: activities._id,
              name: activities.name,
              nature: activities.nature,
              picture: fileName
            }
          }
        }
      );
    };
    Activities.update({
      "_id":activities._id
    }, {
      $push:
      {
        "picture":fileName
      }
    });
  }
});
},

addComment:function(act, text) {
  Activities.update({
    "_id": act._id},
    {
      $push: {
        comments:
        {
          user: {
            _id:Meteor.userId()
            /*email:Meteor.users().emails[0].address*/
          },
          date: new Date(),
          text: text
        }
      }
    }
  );
},

addLike:function(id, obj) {
  Activities.update({
    _id:id
  },
  {
    $addToSet:obj
  }
);
},

removeLike:function(id) {
  Activities.update({
    _id:id
  },
  {
    $pull: {likes:{_id:Meteor.userId()}}
  }
);
},

insertActivity:function(activities) {
  Activities.insert(activities, function (err, objectId) {
    console.log(objectId + " " + err);
    activities._id = objectId;
  });
},

removeCitie:function(target) {
  Cities.remove({
    _id:target
  });
}
});
