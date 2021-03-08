export function searchByWord(word) {
  return new Promise((resolve, reject) => {
    let query =
      "https://us-central1-bgn-university-hack-rem-1010.cloudfunctions.net/app/api/search/" +
      word;
    console.log("Query", query);
    fetch(query, { method: "GET" })
      .then((documents) => documents.json().then((data) => resolve(data)))
      .catch((err) => reject(err));
  });
}

export function getAllProducts() {
  return new Promise((resolve, reject) => {
    let query =
      "https://us-central1-bgn-university-hack-rem-1010.cloudfunctions.net/app/api/products";
    console.log("Query", query);
    fetch(query, { method: "GET" })
      .then((documents) => documents.json().then((data) => resolve(data)))
      .catch((err) => reject(err));
  });
}

export function getProduct(id) {
  return new Promise((resolve, reject) => {
    let query =
      "https://us-central1-bgn-university-hack-rem-1010.cloudfunctions.net/app/api/products/" +
      id;
    console.log("Query", query);
    fetch(query, { method: "GET" })
      .then((documents) => documents.json().then((data) => resolve(data)))
      .catch((err) => reject(err));
  });
}
