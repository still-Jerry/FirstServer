
var express = require('express');
var router = express.Router();
var fs = require('fs');
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/test', function(req, res ) {
    console.log(JSON.stringify(req.body))
    
    fs.open('testFile.txt', 'w', (err) => {
        if(err) throw err;
        console.log('File created');
        
        fs.appendFile('testFile.txt', JSON.stringify(req.body), (err) => {
            if(err) throw err;
            console.log('Data has been added!');
            res.send('response from post');
        });
    });
});

router.get('/test', function(req, res ) {
    console.log(JSON.stringify(req.body))
    
    fs.open('testFile.txt', 'r', (err) => {
        if(err) throw err;
        
        console.log("Синхронное чтение файла")
        let fileContent = fs.readFileSync("testFile.txt", "utf8");
//        console.log(fileContent);
        res.send(fileContent);
    });
});

module.exports = router;
