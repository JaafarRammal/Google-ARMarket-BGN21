const details = require("./details.json");
const fetch = require("node-fetch");
const FormData = require("form-data");

const data = details.data;
console.log(data.length);

data.forEach(async (data) => {
  let formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("quantity", data.quantity);
  formData.append("tags", data.tags);

  await fetch(
    "https://us-central1-bgn-university-hack-rem-1010.cloudfunctions.net/app/api/products",
    {
      method: "POST",
      body: formData,
    }
  ).then((res) => console.log(res));
});
