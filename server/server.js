const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(cors());

const filePath = path.join(__dirname, "data.json");
const jsonData = require(filePath);

app.get("/getLinks", (req, res) => {
  try {
    // var file = fs.readFileSync(filePath, "utf8");
    res.json(jsonData);
  } catch (ex) {
    res.json({ error: ex });
  }
});

app.post("/addLink", (req, res) => {
  try {
    const newRecord = req.body;

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading data file" });
      }

      let jsonData = JSON.parse(data);

      const maxId = jsonData.reduce((max, record) => (record.id > max ? record.id : max), 0);
      newRecord.id = maxId + 1;

      jsonData.push(newRecord);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: "Error writing data file" });
        }
        res.status(201).json({ message: "Record added successfully", newRecord });
      });
    });
  } catch (ex) {
    res.json({ error: ex });
  }
});

app.delete("/deleteLink", (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Invalid ID provided" });
    }

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading data file" });
      }

      let jsonData = JSON.parse(data);

      const index = jsonData.findIndex((item) => item.id === id);

      if (index === -1) {
        return res.status(404).json({ message: "Data not found" });
      }

      jsonData.splice(index, 1);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: "Error writing data file" });
        }
        res.json({ message: "Link deleted successfully" });
      });
    });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8080, () => {
  console.log("server started on port 8080");
});

// const writeJson = JSON.parse(fs.readFile(filePath));
//     const maxId = writeJson.length > 0 ? Math.max(...writeJson.map((item) => item.id)) : 0;
//     console.log(maxId);

//     const newRecord = {
//       id: maxId + 1,
//       link: req.body.link,
//       title: req.body.title,
//       description: req.body.description,
//     };

//     fs.readFile(filePath, function (err, data) {
//       var json = JSON.parse(data);
//       json.push(newRecord);

//       fs.writeFile(filePath, JSON.stringify(json));
//     });
//     res.json({ done: "done" });
