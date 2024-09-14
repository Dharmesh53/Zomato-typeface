import "dotenv/config";
import fs from "fs";
import path from "path";
import mongoose, { mongo } from "mongoose";
import csv from "csv-parser";
import connectToDB from "./index.js";

connectToDB();

const dataDirectory = "./data";

fs.readdir(dataDirectory, (err, files) => {
  const selectedFiles = files.filter((file) => path.extname(file) !== ".xlsx");

  selectedFiles.forEach((file) => {
    const filePath = path.join(dataDirectory, file);

    if (path.extname(file) === ".json") {
      readFromJSON(filePath);
    } else if (path.extname(file) == ".csv") {
      readFromCSV(filePath);
    } else {
      console.log("Get the fuck out of my sight");
    }
  });
});

const readFromJSON = (filePath) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    const jsonData = JSON.parse(data);

    const collection = mongoose.connection.collection("results");

    collection
      .insertMany(jsonData)
      .then(() => {
        console.log(`Data from ${filePath} imported successfully`);
      })
      .catch((err) => {
        console.error(`Error importing data from ${filePath}:`, err);
      });
  });
};

const readFromCSV = (filePath) => {
  const result = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => result.push(data))
    .on("end", () => {});

  const collection = mongoose.connection.collection("restaurants");

  collection
    .insertMany(result)
    .then(() => {
      console.log(`Data from ${filePath} imported successfully`);
    })
    .catch((err) => {
      console.error(`Error importing data from ${filePath}:`, err);
    });
};
