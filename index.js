const formidable = require('formidable');
const http = require('http');
const fs = require('fs');
const url = require('url')

const repo = './download'

if(!fs.existsSync(repo)) {
  fs.mkdirSync(repo)
}

http.createServer(function (req, res) {

  var myurl = url.parse(req.url)
  action = myurl.pathname.split('/')[1]
  file = myurl.pathname.split('/')[2]

  if (action == 'uploaded') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = repo + '/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else if (action == 'upload' || action == '') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Simple File Server via HTTP</h1>');
    res.write('<form action="uploaded" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  } else if (action == 'download') {
    fs.readFile(repo + '/'+file, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end('Error getting the file: ${err}.');
      } else {
        res.setHeader('Content-disposition', 'attachment; filename='+repo+'/'+file);
        res.end(data);
      }
    });
  } else if (action == 'list') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readdir(repo, (err, files) => {
      files.forEach(file => {
        res.write(file+'<br>')
    });
    res.end()
})
  } else {
    res.write('This page does not exist!');
    return res.end()
  }
}).listen(8080);
