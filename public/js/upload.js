function bindPhoto(parseFile) {
    console.log("Should bind to another object here ...");
    /*
      var jobApplication = new Parse.Object("JobApplication");
      jobApplication.set("applicantName", "Joe Smith");
      jobApplication.set("applicantResumeFile", file);
      jobApplication.save();
    */

}

function showPhoto(parseFile) {
    var img = $('#userImage')[0];
    console.log(parseFile);
    img.setAttribute('src', parseFile.url());
    // Show the file
    // var profilePhoto = profile.get("photoFile");
    // $("profileImg")[0].src = profilePhoto.url();
}

function savePhoto(file) {
    
    var parseFile = new Parse.File(file.name, file);
    parseFile.save().then(function() {
	// The file has been saved to Parse.
	showPhoto(parseFile);
    }, function(error) {
	// The file either could not be read, or could not be saved to Parse.
	console.log("Couldn't save photo to parse");
	console.log(error);
    });
}

$('#photo').on(
    'change',
    function(e) {
	var files = e.target.files || e.dataTransfer.files;
	savePhoto(files[0]);
    }
);
