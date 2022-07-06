
var express = require('express');
var router = express.Router();
var fs = require('fs');
var FileName='testFile.txt'

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

async function OpenFileAs(param){
    await fs.open(FileName, param, (err) => {
        if(err) throw err;
//        console.log('File created');
    });
}
async function WriteFile(text){
    OpenFileAs('w')
    await fs.appendFile(FileName, text, (err) => {
        if(err) throw err;
        console.log('Data has been added!');
    });
}
function ReadFile(){
    OpenFileAs('r')
    console.log("Синхронное чтение файла")
    let fileContent = fs.readFileSync(FileName, "utf8");
    return fileContent
}
router.post('/test', function(req, res ) {
    WriteFile(JSON.stringify(req.body))
    res.send('response from post');
});

router.get('/test', function(req, res ) {
    res.send(ReadFile());
});

module.exports = router;
