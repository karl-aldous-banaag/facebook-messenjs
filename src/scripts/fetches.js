const https = require("https");
const FormData = require("form-data");

/**
 * 
 * @param {object} options 
 * @returns 
 */
const fetchGet = (options) => {
    return new Promise((resolve, reject) => {
        const req = https.request({...options, method: "GET"}, res => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => { resolve(chunk) });
            res.on('end', () => {});
            res.on("error", (error) => { reject(error) });
        });
        
        req.on('error', (error) => { reject(error) });

        req.end(); 
    })
}

/**
 * 
 * @param {object} options
 * @param {object} body
 */
const fetchPostJSON = (options, body) => {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(body);

        const req = https.request({
            ...options,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, res => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => { resolve(chunk) });
            res.on('end', () => {});
            res.on("error", (error) => { reject(error) });
        });

        req.on('error', (error) => { reject(error) });

        // Write data to request body
        req.write(postData);
        req.end(); 
    })
}

/**
 * 
 * @param {object} options 
 * @param {object} body 
 * @returns 
 */
const fetchPostForm = (options, body) => {
    return new Promise((resolve, reject) => {
        const form = new FormData()
        for (const key in body) {
            form.append(key, body[key]);
        }

        const req = https.request({
            ...options,
            method: "POST",
            headers: form.getHeaders()
        }, res => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => { resolve(chunk) });
            res.on('end', () => {});
            res.on("error", (error) => { reject(error) });
        });
        
        form.pipe(req);
    })
}

const fetchDelete = (options) => {
    return new Promise((resolve, reject) => {
        const req = https.request({...options, method: "DELETE"}, res => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => { resolve(chunk) });
            res.on('end', () => {});
            res.on("error", (error) => { reject(error) });
        });
        
        req.on('error', (error) => { reject(error) });

        req.end();
    });
}

module.exports = {
    fetchGet,
    fetchPostJSON,
    fetchPostForm,
    fetchDelete
}