# simple-file-server-nodejs
Simple File Server via HTTP based on Node.js

## Installation
Step 1. Install [Node.js](https://nodejs.org/) on your host.

Step 2. Run file server with the following command

    $ node index.js

Then, your file server works on http://localhost:8080

## Functions
### File Upload
Browsing http://localhost:8080/upload, then you can upload file via form.

### File List
Browsing http://localhost:8080/list, then you can get a list of files on file server.

### File Download
Browsing http://localhost:8080/download/[filename], then you can download the file if it exists on file server.

## Appendix
By default, the files will be stored in the *download* directory within project directory.
By default, the listen port is 8080. 
However, you can change these parameters by coding index.js directly as you wish :)
