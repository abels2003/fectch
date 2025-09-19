fetch("https://4e1c6e52-73f7-433d-a99a-f66cb8c556e2.mock-beta.pstmn.io/forecast/weekly")
.then(res =>{
    return res.json();
})
.then(data => {
    console.log(data);
})