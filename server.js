// import fetch from 'node-fetch';
const express = require("express");
const app = express();
PORT = 8000;
//const fetch = require("node-fetch")
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
app.get("/api/ping", (req, res) => {
  res.json({ Success: true });
  return res.status(200);
});

app.get(`/api/posts/:tagName/:sortBy_field?`, async (req, res) => {
  const { tagName, sortBy_field,direction } = req.params;
  if(!sortBy_field){
    
  const url = `https://api.hatchways.io/assessment/blog/posts?tag=${tagName}&"likes"&"desc"`;
  const result = await fetch(url);
  const json_result = await result.json();
  res.json(json_result);

  return res.status(200);
  }
});

app.listen(PORT, () => {
  console.log("Server listening on port 8000");
});
