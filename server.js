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

app.get(`/api/posts/:tagName?/:sortBy_field?/:direction?`, async (req, res) => {
  const { tagName, sortBy_field, direction } = req.params;
  console.log("__", tagName, sortBy_field, direction);
  // if (
  //   sortBy_field&&
  //  ( sortBy_field !== "likes" ||
  //   sortBy_field !== "id" ||
  //   sortBy_field !== "reads" ||
  //   sortBy_field !== "popularity")
  // ) {
  //   res.send({
  //     error: "sortBy parameter is invalid",
  //   });
  //    res.status(400);
  // }
  if (!tagName) {
    res.send({ Error: "Tags parameter required" });
    res.status(400);

  } else if (!sortBy_field && !direction) {
    //const url = `https://api.hatchways.io/assessment/blog/posts?tag=${tagName}&${sortBy_field}&${direction}`;
    const url = `https://api.hatchways.io/assessment/blog/posts?tag=${tagName}&sortBy=id&direction=asc`;
    const result = await fetch(url);
    const json_result = await result.json();
    res.json(json_result);

    return res.status(200);
  
  } 
  else {
    const url = `https://api.hatchways.io/assessment/blog/posts?tag=${tagName}&sortBy=${sortBy_field}&direction=${direction}`;
    const result = await fetch(url);
    const json_result = await result.json();
    res.json(json_result);

    return res.status(200);
  }
});

 
app.listen(PORT, () => {
  console.log("Server listening on port 8000");
});
