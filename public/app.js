// Cited In Class Activity: https://harvard.bootcampcontent.com/Harvard-Coding-Boot-Camp/hu-cam-fsf-pt-09-2019-u-c/blob/master/Week_18/01-Activities/11-Scraping-into-a-db/Unsolved/server.js


$(document).ready(function () {

    $(document).on("click", "#show-scrapes-btn", function () {

        $.ajax({
            url: "/scrape",
            method: "GET"
        }).then(() => { // Grab the articles as a json
            $.getJSON("/articles", function (data) {
                // For each one
                for (let i = 0; i < data.length; i++) {
                    // Display the  information on the page

                    $("#articles").prepend("<p data-id='" + data[i]._id + "'>" + "<img src='" + data[i].image + " '/>" + "<br />" + "<br />" + data[i].title + "<br />" + "<br />" + "<a href='" + data[i].link + "'target='blank'>" + data[i].link + "</a>" + "<br />" + "<br />" + "<button class='addNote btn btn-dark'>Add Comment</button>" + "</p>");


                    console.log("Image:", data[i].image)
                };
            });
        });
    });


    // Whenever someone clicks a p tag
    $(document).on("click", "p", function () {
        console.log("Add note button clicked")
        // Empty the notes from the note section
        $("#notes").empty();
        // Save the id from the p tag
        let thisId = $(this).attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
                method: "GET",
                url: "/articles/" + thisId
            })
            // With that done, add the note information to the page
            .then(function (data) {
                console.log(data);

                // The title of the article
                $("#notes").append("<h3>" + data.title + "</h3>");
                // An input to enter a new title
                $("#notes").append("<input id='titleinput' name='title'>");
                // A textarea to add a new note body
                $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
                // A button to submit a new note, with the id of the article saved to it
                $("#notes").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-dark'>Save Comment</button>");
                $("#addNotesModal").modal('toggle');

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#titleinput").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#bodyinput").val(data.note.body);
                    // Add a delete comment button
                    $("#notes").append("<button data-id='" + data.note._id + "' id='deleteNote' class='btn btn-dark'>Delete Comment</button>");
                }
            });
    });

    // When you click the savenote button
    $(document).on("click", "#savenote", function () {
        // Grab the id associated with the article from the submit button
        let thisId = $(this).attr("data-id");

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
                method: "POST",
                url: "/articles/" + thisId,
                data: {
                    // Value taken from title input
                    title: $("#titleinput").val(),
                    // Value taken from note textarea
                    body: $("#bodyinput").val()
                }
            })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                $("#notes").empty();
                $("#addNotesModal").modal("hide");
            });

        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });



    // Delete Note button
    $(document).on("click", "#deleteNote", function (e) {
        e.preventDefault()
        console.log("Delete Note Button Is Clicked")
        let noteId = $(this).attr("data-id");
        let articleId = $(this).attr("data-id");
        $.ajax({
            method: "DELETE",
            // url: "/notes/delete/" + noteId + articleId
            url: "/notes/delete/" + noteId + "/" + articleId
        }).done(function (data) {
            console.log(data)
            // $("#titleinput").val("");
            // $("#bodyinput").val("");
            $("#notes").empty();
            $("#addNotesModal").modal("hide");
            // window.location.href = "/savedArticles"
        })
        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });




    // Cited: W3schools
    function todaysDate() {
        let date = new Date();
        document.getElementById("todays-date").innerHTML = date.toDateString();
    }
    todaysDate();





});