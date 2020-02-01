// Cited In Class Activity: https://harvard.bootcampcontent.com/Harvard-Coding-Boot-Camp/hu-cam-fsf-pt-09-2019-u-c/blob/master/Week_18/01-Activities/11-Scraping-into-a-db/Unsolved/server.js


$(document).ready(function () {

    $(document).on("click", "#show-scrapes-btn", function () {

        // Grab the articles as a json
        $.getJSON("/articles", function (data) {
            // For each one
            for (let i = 0; i < data.length; i++) {
                // Display the apropos information on the page
                // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
                // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].image + "</p>");
                // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].image + "</p>" + "< button id = 'addNote' > Add Note < /button>" + "<br />");

                // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "<a href='" + data[i].link + "'target='blank'>" + data[i].link + "</a>" + "<br />" + "<img src='" + data[i].image + " '/>" + "<br />" + "Click Here to Add a Note</p>");

                // $("#articles").append("<p data-id='" + data[i]._id + "'></p>" + "<h4>" + data[i].title + "</h4>" + "<br />" +
                //     "<a href='" + data[i].link + "'>" + data[i].link + "</a>" + "<br />" +
                //     "<img src='" + data[i].image + " '/>" + "<br />" +
                //     "< button id = 'addNote' > Add Note < /button>" + "<br />"
                // );

                $("#articles").prepend("<p data-id='" + data[i]._id + "'>" + "<img src='" + data[i].image + " '/>" + "<br />" + "<br />" + data[i].title + "<br />" + "<br />" + "<a href='" + data[i].link + "'target='blank'>" + data[i].link + "</a>" + "<br />" + "<br />" + "<button class='delete btn btn-dark'>Add Comment</button>" + "</p>");

                // $("#articles").prepend("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "<br />" + "<img src='" + data[i].image + " '/>" + "<br />" + "<br />" + "<a href='" + data[i].link + "'target='blank'>" + data[i].link + "</a>" + "<br />" + "<br />" + "<button class='delete btn btn-dark'>Add Note</button>" + "</p>");

                // $("#articles").forEach.prepend()


                console.log("Image:", data[i].image)
            }
        });


    });




    // Whenever someone clicks a p tag
    $(document).on("click", "p", function () {
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
                // $("#notes").append("<button id='deleteNote' class='btn btn-dark'>Delete Note</button>");
                $("#notes").append("<button data-id='" + data._id + "' id='deleteNote' class='btn btn-dark'>Delete Comment</button>");
                $("#addNotesModal").modal('toggle');

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#titleinput").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#bodyinput").val(data.note.body);
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


    // // When user clicks the delete button for a note
    // $(document).on("click", "#deleteNote", function () {
    //     // Save the p tag that encloses the button
    //     var selected = $(this).parent();
    //     // Make an AJAX GET request to delete the specific note
    //     // this uses the data-id of the p-tag, which is linked to the specific note
    //     $.ajax({
    //         type: "GET",
    //         url: "/notes/delete/" + selected.attr("data-id"),

    //         // On successful call
    //         success: function (response) {
    //             // Remove the p-tag from the DOM
    //             selected.remove();
    //             // Clear the note and title inputs
    //             // $("#titleinput").val("");
    //             // $("#bodyinput").val("");
    //             // Make sure the #action-button is submit (in case it's update)
    //             $("#addNotesModal").modal("hide");
    //         }
    //     });
    // });



    //delete a note
    // $(document).on("click", "#deleteNote", function () {
    //     console.log("Delete Note Button Is Clicked")
    //     let thisId = $(this).attr("data-id");
    //     $.ajax({
    //             method: "DELETE",
    //             url: "/delete" + thisId
    //         })
    //         .then(function (data) {
    //             // Log the response
    //             console.log(data);
    //             // $("#titleinput").val("");
    //             // $("#bodyinput").val("");
    //             $("#addNotesModal").modal("hide");
    //         });
    // });


    // SOMEWHAT WORKING //////////////////////////////////////
    // Delete Note button
    $(document).on("click", "#deleteNote", function () {
        console.log("Delete Note Button Is Clicked")
        let noteId = $(this).attr("data-note-id");
        let articleId = $(this).attr("data-article-id");
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




    // When user clicks the delete button for a note
    // $(document).on("click", "#deleteNote", function () {
    //     console.log("Delete btn clicked")
    //     // Save the p tag that encloses the button
    //     let noteId = $(this).attr("data-note-id");

    //     // Make an AJAX GET request to delete the specific note
    //     // this uses the data-id of the p-tag, which is linked to the specific note
    //     $.ajax({
    //         method: "DELETE",
    //         url: "/delete/" + noteId,

    //         // On successful call
    //         success: function (response) {
    //             // Remove the p-tag from the DOM
    //             selected.remove();
    //             // Clear the note and title inputs
    //             $("#titleinput").val("");
    //             $("#bodyinput").val("");
    //             $("#addNotesModal").modal("hide");
    //         }
    //     });
    // });

    // Cited: W3schools
    function todaysDate() {
        let date = new Date();
        document.getElementById("todays-date").innerHTML = date.toDateString();
    }
    todaysDate();



    // Save an article
    // app.post('/articles/save/:id', function (req, res) {
    //     db.Article.findOneAndUpdate({
    //             _id: req.params.id
    //         }, {
    //             saved: true
    //         })
    //         .then(function (dbArticle) {
    //             res.json(dbArticle);
    //         })
    //         .catch(function (err) {
    //             res.json(err);
    //         });
    // });

    // Delete an article
    // app.post('/articles/delete/:id', function (req, res) {
    //     db.Article.findOneAndUpdate({
    //         _id: req.params.id
    //     }, {
    //         saved: false,
    //         notes: []
    //     }, function (err) {
    //         if (err) {
    //             console.log(err);
    //             res.end(err);
    //         } else {
    //             db.Note.deleteMany({
    //                     article: req.params.id
    //                 })
    //                 .exec(function (err) {
    //                     if (err) {
    //                         console.log(err);
    //                         res.end(err);
    //                     } else
    //                         res.send("Article Deleted");
    //                 });
    //         }
    //     });
    // });



});