// moving to single file
$("#button").click(function() {
    // Create instance of Facebook provider object
    var provider = new firebase.auth.FacebookAuthProvider();

    // Login
    firebase.auth().signInWithPopup(provider).then(function(data) {

        // Store info
        var user = data.additionalUserInfo.profile;
        var name = user.first_name;
        var id = user.id;
        var picture = user.picture.data.url;

        // If new user...
        database.ref("users/" + id).once("value", function(snapshot) {
            // if exists is 'null' it won't
            // trigger an if statement
            // i.e.
            //
            // if (null) { 
            //   console.log("print this"); 
            // } else { 
            //   console.log("print that"); 
            // }
            //
            // will return -> print that
            var existing_user = snapshot.val()
            if (!existing_user) { // Write to DB
                database.ref("users/" + id).set({
                    name: name,
                    profilePic: picture,
                    pokedollar: 0,
                    experience: 0,
                });
            }
            // Store id in localstorage
            localStorage.setItem("id", id);

            // Switch to Main Menu
            document.location.href = "main.html";
        });

    }).catch(function(error) {
        console.log(error);
    });
});

$(".btn-github").click(function() {
    document.location.href = "main.html";
});
