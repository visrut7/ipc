import * as http from "http";
import * as fs from "fs/promises";
import formidable from "formidable";

const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url);

  if (req.method === "GET" && req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    const html = await fs.readFile("public/index.html", { encoding: "utf-8" });
    res.end(html);
    return;
  }

  if (req.method === "POST" && req.url === "/image") {
    const form = formidable({ multiples: false, uploadDir: "uploads" });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error parsing the form");
        console.error(err);
        return;
      }

      const imageData = fields.image;
      console.log(imageData);
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
