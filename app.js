const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const  app = express();

app.use(bodyParser.urlencoded({extended : true}));

// Way to access the static files on ur computer like styles.css and image folder
app.use(express.static("public"));

app.get("/" , function(req , res) {
	res.sendFile(__dirname + "/signup.html");
});


app.post("/" , function(req , res) {
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.emailId;

	// console.log(firstName + " " + lastName +" " + email);
	
	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				}
			}
		]
	}

	const jsonData = JSON.stringify(data);

	const url = "https://us6.api.mailchimp.com/3.0/lists/c3f4846da8";

	const options = {
		method: "POST",
		auth: "sumeet1:139800f5fc4748eb62139debae63ab9c-us6"
	}

	const request = https.request(url, options, function(response) {
		
		if(response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		}
		else {
			res.sendFile(__dirname + "/failure.html");
		}


		response.on("data", function(data) {
			console.log(JSON.parse(data));
		})
	})

	request.write(jsonData);
	request.end();


});


app.post("/failure" , function(req , res) {
	res.redirect("/");
})



app.listen(process.env.PORT || 3000, function() {
	console.log("Starting server on port 3000");
});


// API Key
// 139800f5fc4748eb62139debae63ab9c-us6

// Audience id
// c3f4846da8


// https://us6.admin.mailchimp.com/lists/members?id=694173#p:1-s:25-sa:last_update_time-so:false
