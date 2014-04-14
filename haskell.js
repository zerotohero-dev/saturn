var express = require('express'),
    app = express();

var sys = require('sys'),
    fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    child;

var fs = require('fs');

app.configure(function() {
    app.use(express.json());
    app.use(express.urlencoded());
//    app.use(express.multipart());

});

app.get('/compute', function(req, res) {
  res.send('hello world');
});

var counter = 0;

app.post('/compute', function(req, res) {
    var text = req.body.data,
        pad = req.body.pad,
        haskellFileName = 'temp/' + (counter++) + '.hs';

    // Create a random file.
    fs.writeFile(path.join(__dirname, haskellFileName), text, function(err) {
        if (err) {
            res.send('Error #001');

            return;
        }

        exec('ghc ' + haskellFileName, function(err, stdOut, stdErr) {
            if (err) {
                res.send('Error #002: Weird command call.');

                return;    
            }

            exec('temp/' + (counter-1), function(err, stdOut, stdErr) {
                if (err) {
                    res.send('Error #003: Error calling linked code.');

                    return;
                }
                
                res.send(stdOut);
            });
        });
    });

    // Put the text content into the file.
    // Compile the file into an object.
    // Execute the object
    // Return the result
});

app.listen(3010);
