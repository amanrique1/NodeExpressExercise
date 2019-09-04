//Import the requirements
let fs = require("fs");
let express = require("express");
let axios = require('axios');

let app = express();

//Accordion Card
function createAccordionCard(id, name) {
  return `<div class="card">
  <div class="card-header">
    <h2 class="mb-0">
      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${id}" aria-expanded="true" aria-controls="collapseOne">
${name}
      </button>
    </h2>
  </div>
  <div id="collapse${id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body row">
      `;
};

//Product card
function createCard(name, image, price, description) {
  return `<div class="card" style="width: 18rem;">
<img src="${image}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${name} [${price}]</h5>
  <p class="card-text">${description}</p>
  <a href="#" class="btn btn-primary">Add To cart</a>
</div>
</div>`;
};


//Get of the json data
axios.get('https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/abb6016942f7db2797846988b039005c6ea62c2f/categories.json')
  .then(function (response) {
    // handle success
    let cards = '<div class="accordion" id="accordionExample">';
    let id = 1;
    //Card creation with info obtained
    for (let obj of response.data) {
      cards += createAccordionCard(id, obj.name);
      for (prod of obj.products) {
        cards += createCard(prod.name, prod.image, prod.price, prod.description);
        ;
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

