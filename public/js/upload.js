function showPhoto(parseFile) {
    var img = $('#userImage')[0];
    console.log(parseFile);
    img.setAttribute('src', parseFile.url());

    $('#next').removeClass("disabled");

}

function savePhoto(file) {
    
    var parseFile = new Parse.File(file.name, file);
    parseFile.save().then(function() {
	// The file has been saved to Parse.
	window.photoFile = parseFile;

	var submission = new Parse.Object("Submission");
	submission.id = submissionID;
	submission.set("photo", photoFile);
	submission.save();

	showPhoto(parseFile);
    }, function(error) {
	// The file either could not be read, or could not be saved to Parse.
	console.log("Couldn't save photo to parse");
	console.log(error);

	var errorContent = $('#error');
	errorContent.removeClass("disabled");
	errorContent[0].innerText = "Error:" + JSON.stringify(error);
    });
}

$('#photo').on(
    'change',
    function(e) {
	var files = e.target.files || e.dataTransfer.files;
	savePhoto(files[0]);
    }
);
