var catUrl = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';
//var apiKey =  '868927087amsh65a6ffffa5b7c46p19dcadjsn7079a2a63238';
const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		'X-RapidAPI-Key': '868927087amsh65a6ffffa5b7c46p19dcadjsn7079a2a63238',
		'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
	}
};







fetch(catUrl, options)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        document.querySelector('#quote').innerHTML = data.value
        console.log(data);
    })



    //var example = {
//     "categories": [],
//     "created_at": "2020-01-05 13:42:29.569033",
//     "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
//     "id": "uSeGCOlOQaORN_f4wtsLNg",
//     "updated_at": "2020-01-05 13:42:29.569033",
//     "url": "https://api.chucknorris.io/jokes/uSeGCOlOQaORN_f4wtsLNg",
//     "value": "The color brown exists because Chuck Norris scared the shit out of while."
// }