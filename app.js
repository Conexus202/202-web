'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;
var nodemailer = require('nodemailer');

/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

// For gzip compression
app.use(express.compress());

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}

// Set Handlebars
app.set('view engine', 'handlebars');

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb'}));


// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'conexus202@gmail.com',
        pass: 'L1nk1np4rk'
    }
});


/*
 * Routes
 */
// Index Page
app.get('/', function(request, response, next) {
    console.log('ENTRAMOS AL INDEX');
    response.render('index');
});

// Idea post
app.post('/idea', function(req, res){
    console.log(req.body);
    var email_idea = req.body.email_idea;
    var name = req.body.name_idea;
    var description = req.body.description_idea;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: email_idea, // sender address
        to: 'fabian@conexus202.com', // list of receivers
        subject: 'Enviaron una idea desde la pagina', // Subject line
        //text: 'Hello world ✔', // plaintext body
        html: '<b>' + name + '</b><br><p>' + description + '</p>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }

        res.send({ status: 'succes'});
    });

    
});

// Idea post
app.post('/message', function(req, res){
    console.log(req.body);
    var contact_email = req.body.contact_email;
    var contact_name = req.body.contact_name;
    var contact_message = req.body.contact_message;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: contact_email, // sender address
        to: 'fabian@conexus202.com', // list of receivers
        subject: 'Enviaron un mensaje desde la pagina', // Subject line
        //text: 'Hello world ✔', // plaintext body
        html: '<b>' + contact_name + '</b><br><p>' + contact_message + '</p>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }

        res.send({ status: 'succes'});
    });
});


/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);