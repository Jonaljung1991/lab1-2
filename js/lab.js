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


    function checkTime(i) {
      if (i < 10) {
        i = '0' + i;
      }
      return i;
    }
    return finalTime;
  }

  // Date of day, month and year
  function getDate() {
    let date = new Date();
    let day = date.getDate();
    let weekDay = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

    let d = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']
    let m = ['Januari', 'February', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']

    return d[weekDay] + ' ' + day + ' ' + m[month] + ' ' + year;
  }

  htmlElement.date.innerHTML = getDate();


  // Message object
  let message = {
    //  messageKey: '',
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

    let uniqueMess = db.ref('/messages').push(message);
    console.log(uniqueMess.key);

  });

  // Input uploded to message container
  db.ref("/messages").on("value", function(snapshot) {
    let userData = snapshot.val();
    htmlElement.chatContainer.innerHTML = '';
    let output = '';
    let str;
    let like = 0;
    let dis = 0;
    let targetId;

    for (let info in userData) {
      str = userData[info];

      output += `<div id='${info}' class = 'message-light'>
                        <p>${str.text} <span>${str.time}</span></p>
                        <button class='likes' id='like${like++}' type="button" name="button">Like</button>
                        <button class='disLikes' id='disLike${dis++}' type="button" name="button">Dislike</button>
                      </div>`
    }
    htmlElement.chatContainer.innerHTML = output;

    if (htmlElement.chatContainer.children.length > 0) {
      let likes = document.getElementsByClassName('likes');
      let disLikes = document.getElementsByClassName('disLikes');


      for (var i = 0; i < likes.length; i++) {
        document.getElementById('like' + [i]).addEventListener('click', function(event) {
          targetId = event.target.parentElement.id;

          console.log('event target click like');
          let clicked = 0;
          if(clicked > 0){
            event.target.style.backgroundColor = 'gray';
            event.target.innerText = 'like 0';
            console.log(' i turn off');
            clicked--;
            db.ref('/messages/' + targetId + '/likes').set(str.likes - 1);
          }else if (clicked === 0) {
            event.target.style.backgroundColor = 'green';
            event.target.innerText = 'like 1';
            console.log('i turn green');
            clicked++;
            db.ref('/messages/' + targetId + '/likes').set(str.likes + 1);
          }


        });
      }
    }
  }); // Snapshot END here




} // THE END of function everything
