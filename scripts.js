"use strict";

const myKey = 'zURgoE4HavD2m6V0rTQlBQPLxf2dgjGFsjrvZTn2'

function buildRequest(state,results){
    console.log("building request");
    let requestURL = "https://developer.nps.gov/api/v1/parks?";
    /*
    */
    //API takes comma delimited string of states
    //remove whitespace
    let encodedStateList = state.replace(/\s/g, "");
    //convert commas to %2C for URL
    encodedStateList = encodedStateList.replace(',','%2C');
    console.log(encodedStateList);
    requestURL += `stateCode=${encodedStateList}&limit=${results}&api_key=${myKey}`;

    console.log(requestURL);
    getParks(requestURL)
}

function getParks(requestURL) {
    fetch(requestURL)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        displayResults(responseJson.data)
      })
      .catch(error => alert('Something went wrong. Try again later.'));
  }
  
  function displayResults(parkData) {
    console.log(parkData);
    $('.parks').remove();
    let parkList = ""
    for(let p = 0; p < parkData.length; p++){
        parkList += `<p class="parks"><a href="${parkData[p].url}">${parkData[p].fullName}</a></p>
                    <p class="parks">${parkData[p].description}</p><br class="parks">`
    }
    $('main').append(parkList);
  }
  
  function watchForm() {
      //console.log("submitted")
    $('form').submit(event => {
      event.preventDefault();
      //console.log($('#state-list').val());
      //console.log($('#result-size').val());
      let state = $('#state-list').val();
      let results = $('#result-size').val();
      buildRequest(state,results);
    });
  }
  //wait for submission
  $(watchForm());