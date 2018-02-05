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
    datum: document.getElementById("date"),
    chatContainer: document.getElementById("container"),
    SignInWithGithub: document.getElementById("github")

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
  function datum() {
    let date = new Date();
    let day = date.getDate();
    let weekDay = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

    let d = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']
    let m = ['Januari', 'February', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']

    return d[weekDay] + ' ' + day + ' ' + m[month] + ' ' + year;
  }

  if (document.getElementById('date')!=null) {
    document.getElementById('date').innerHTML = datum();
  }


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
  if (htmlElement.textInput!= null) {
    htmlElement.textInput.addEventListener("change", function(event) {

      message.text = htmlElement.textInput.value;
      message.time = getTime();
    });

  }


  // Send input
  if (  htmlElement.sendBtn!= null) {
    htmlElement.sendBtn.addEventListener("click", function(event) {

      let uniqueMess = db.ref('/messages').push(message);
      console.log(uniqueMess.key);

    });
  }

  // Input uploded to message container
  db.ref("/messages").once("value", function(snapshot) {

    let userData = snapshot.val();
    htmlElement.chatContainer.innerHTML = '';
    let output = '';
    let str;
    let like = 0;
    let dis = 0;
    //let targetId;

    for (let info in userData) {
      str = userData[info];

      //GAMAL ÄNDRA

      output += `<div id='${info}' class = 'message-light'>
                           <p>${str.text} <span>${str.time}</span></p>
                           <button class='likes' id='like${like++}' type="button" name="button">${str.likes} Like</button>
                           <button class='disLikes' id='disLike${dis++}' type="button" name="button">${str.dislikes}Dislike</button>
                         </div>`;

      // DAVID HJÄLP

      /* let div = document.createElement('div');
       div.innerHTML = `<p>${str.text} <span>${str.time}</span></p>
         <button class='likes' id='like${like++}' type="button" name="button">${str.likes} Like</button>
         <button class='disLikes' id='disLike${dis++}' type="button" name="button">${str.dislikes}Dislike</button>`;
       htmlElement.chatContainer.appendChild(div);
       let likeBtn = div.getElementsByTagName('button')[0];
       // om användaren har klickat på like-knappen
       likeBtn.style.backgroundColor = 'lime';*/
       // annars grå
    }
    //GAMAL ÄNDRA
    htmlElement.chatContainer.innerHTML = output;


    if (htmlElement.chatContainer.children.length > 0) {
      let likes = document.getElementsByClassName('likes');
      let disLikes = document.getElementsByClassName('disLikes');


      for (var i = 0; i < likes.length; i++) {
        document.getElementById('like' + i).addEventListener('click', function(event) {
          const targetId = event.target.parentElement.id;
          const messLike = userData[targetId].likes;
          console.log('targetId ',targetId, ', messlike=', messLike);
          //console.log('likes är ',db.ref('/messages/' + targetId + '/likes'));
event.target.style.backgroundColor = 'pink';
event.target.style.border = '4px solid red;';
console.log('bgcolor='+event.target.style.backgroundColor+', element=', event.target);
          if (event.target.style.backgroundColor != 'green') {
            event.target.style.backgroundColor = 'green';

            console.log(' i like');
            console.log('before ', messLike);
            // kanske off
            db.ref('/messages/' + targetId + '/likes').set(messLike +1);
            console.log('after ',messLike);
          } else {
//            event.target.style.backgroundColor = 'gray';

            console.log('i unLike');
            console.log('before ', messLike);
            db.ref('/messages/' + targetId + '/likes').set(messLike - 1);
            console.log('after ', messLike);
          }

        });
      }
    }
  }); // Snapshot END here


//LOGGA IN
if (htmlElement.SignInWithGithub !=null) {

    // Authenticate code
    let provider = new firebase.auth.GithubAuthProvider();
    provider.setCustomParameters({ // optional
      'allow_signup': 'true'
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.location = 'chat.html'; //After successful login, user will be redirected to home.html
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log('onAuthStateChanged: user is signed in', user);

        // ...
      } else {
        // User is signed out.
        // ...
        console.log('onAuthStateChanged: user is signed out');
      }
    });

    htmlElement.SignInWithGithub.addEventListener("click", function(event) {
      firebase.auth().signInWithRedirect(provider);
    })

}


  // LOGGA UT
  if (document.getElementById('logOut')!=null) {
    document.getElementById('logOut').addEventListener('click', function(event) {
      firebase.auth().signOut().then(function(result) {
        console.log('Signed out user');
      })
      .catch(function(error) {
        console.log('Signout failed');
      })
    })

  }




} // THE END of function everything
