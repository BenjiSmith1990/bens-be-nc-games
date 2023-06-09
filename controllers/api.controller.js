const fs = require('fs/promises')

exports.getEndpoints = (req,res,next) => {
  fs.readFile(`${__dirname}/../endpoints.json`, "utf-8").then((data) => {
    const endpoints = JSON.parse(data);
    res.send({ endpointData: endpoints });
  })
}
