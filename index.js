//Import the requirements
let fs = require("fs");
let express = require("express");
let axios = require('axios');

let app = express();

//Basic file
let arch = `<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
  <!-- Here must be the info-->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  
</body>
    </html>`;

//Write the basic file
fs.writeFile("index.html", arch, err => {
  console.log("Archivo creado");
});

//Get of the json data
axios.get('https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/abb6016942f7db2797846988b039005c6ea62c2f/categories.json')
  .then(function (response) {
    // handle success
    let cards = '<div class="accordion" id="accordionExample">';
    let id = 1;
    //Card creation with info obtained
    for (let obj of response.data) {
      cards += `<div class="card">
  <div class="card-header">
    <h2 class="mb-0">
      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse`+ id + `" aria-expanded="true" aria-controls="collapseOne">
      `  +
        obj.name
        + `
      </button>
    </h2>
  </div>
  <div id="collapse`+ id + `" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body row">
      `;
      for (prod of obj.products) {
        cards += `<div class="card" style="width: 18rem;">
  <img src="`+ prod.image + `" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">`+ prod.name + " [" + prod.price + "]" + `</h5>
    <p class="card-text">`+ prod.description + `</p>
    <a href="#" class="btn btn-primary">Add To cart</a>
  </div>
</div>`;
      }
      cards += `</div>
      </div>
    </div>`;
      id++;
    }

    //Read and render of the file
    app.get("/", (req, res) => {
      fs.readFile("index.html", (err, data) => {
        if (err) throw err;
        //Replacement of the comment with the appropiate info cards
        data = data.toString().replace("<!-- Here must be the info-->", cards);
        res.send(data);
      });
    });

    //Port
    app.listen(8081);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  }).data;

