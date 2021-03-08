export function searchByWord(word) {
  return new Promise((resolve, reject) => {
    let query =
      "https://us-central1-bgn-university-hack-rem-1010.cloudfunctions.net/app/api/search/" +
      word;
    console.log("Query", query);
    fetch(query, { method: "GET" })
      .then((documents) =>
        console.log(documents.json().then((data) => resolve(data)))
      )
      .catch((err) => reject(err));
  });
}
