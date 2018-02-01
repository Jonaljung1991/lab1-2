// project code

window.addEventListener('load', everything);

function everything(event) {


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAIj_wgXdh22eO10chqNfta3fmPSBPfqYc",
    authDomain: "message-lab.firebaseapp.com",
    databaseURL: "https://message-lab.firebaseio.com",
    projectId: "message-lab",
    storageBucket: "message-lab.appspot.com",
    messagingSenderId: "311965746411"
  };
  firebase.initializeApp(config);

  // link to database
  const db = firebase.database();

  // all html elements
  const htmlElement = {
    sendBtn: document.getElementById('sendBtn'),
    textInput: document.getElementById("textInput"),
    date: document.getElementById("date"),
    chatContainer: document.getElementById("container")

  }

  // THE LOGIN page code

  // code to se user and and check authorisation

  // THE CEATE account page code

  // code to create and puch a new user to the database and check if the username exist allready



  // THE CHAT ROOM code

  // Time Element
  function getTime() {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let h = checkTime(hours);
    let m = checkTime(minutes);
    let finalTime = `${h} : ${m}`;
    console.log(typeof hours);

    function checkTime(i) {
      if (i < 10) {
        i = '0' + i;
      }
      return i;
    }
    return finalTime;
  }

  // Date of day, month and year
  function getDate(){
    let date = new Date();
    let day = date.getDate();
    let weekDay = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

    let d = ['Måndag', 'Tisdag','Onsdag','Torsdag','Fredag', 'Lördag','Söndag']
    let m = ['Januari', 'February', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']

    return d[weekDay] + ' ' + day + ' ' + m[month] + ' ' + year;
  }

  htmlElement.date.innerHTML = getDate();

  // Message object
  let message = {
    sender: 'Jon doe', // users.name
    text: '',
    likes: 0,
    dislikes: 0,
    time: ''
  };


  // Text input
  htmlElement.textInput.addEventListener("change", function(event) {

    message.text = htmlElement.textInput.value;
    message.time = getTime();
  });


  // Send input
  htmlElement.sendBtn.addEventListener("click", function(event) {

    db.ref('/messages').push(message);

  });

  // Input uploded to message container
  db.ref("/messages").on("value", function(snapshot) {
    let userData = snapshot.val();
    htmlElement.chatContainer.innerHTML = '';
    let output = '';
    let str;

    for (let info in userData) {
      console.log(`allData har en property som heter ${info}`);
      console.log('värdet är:', userData[info]);
      str = userData[info];


      console.log('userdata ', str.text);
      output += `<div class = 'message-light'>
                        <p>${str.text} <span>${str.time}</span></p>
                      </div>`

    }
    htmlElement.chatContainer.innerHTML = output;
  });




} // THE END of function everything
