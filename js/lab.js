// Initialize Firebase
const config = {
  apiKey: "AIzaSyAIj_wgXdh22eO10chqNfta3fmPSBPfqYc",
  authDomain: "message-lab.firebaseapp.com",
  databaseURL: "https://message-lab.firebaseio.com",
  projectId: "message-lab",
  storageBucket: "message-lab.appspot.com",
  messagingSenderId: "311965746411"
};
firebase.initializeApp(config);



// project code
window.addEventListener('load', everything);



function everything(event) {



  // link to database
  const db = firebase.database();

  // all html elements
  const htmlElement = {
    //CHAT PAGE
    sendBtn: document.getElementById('sendBtn'),
    textInput: document.getElementById("textInput"),
    datum: document.getElementById("date"),
    chatContainer: document.getElementById("container"),
    userImg: document.getElementById("userImg"),

    // LOGIN PAGE
    mail: document.getElementById('mail'),
    password: document.getElementById('password'),
    login: document.getElementById('login'),
    createUser: document.getElementById('createUser'),
    SignInWithGithub: document.getElementById("github")
  }


  // THE LOGIN page code

  htmlElement.login.addEventListener('click', function(event) {
    const email = htmlElement.mail.value;
    const pass = htmlElement.password.value;
    const auth = firebase.auth();

    auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Invalid user or ' + errorMessage + '.');
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });

  });


  htmlElement.createUser.addEventListener('click', function(event) {
    const email = htmlElement.mail.value;
    const pass = htmlElement.password.value;
    const auth = firebase.auth();

    auth.createUserWithEmailAndPassword(email, pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });

  });



  //LOGGA IN

  // Authenticate code
  let provider = new firebase.auth.GithubAuthProvider();
  provider.setCustomParameters({ // optional
    'allow_signup': 'true'
  });

  htmlElement.SignInWithGithub.addEventListener("click", function(event) { // Activate sign in
    firebase.auth().signInWithRedirect(provider);
  })

  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      console.log('Your github accesstoken ' + token);
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    console.log(email);
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(credential);
    // ...
  });

  var userIdInfo = {
    name:"Anonymous user",
    photo:'img_411076.png',
    userId:'1',

    userUnlike:0,
    userLike: 0,
    btnClassLike: 'btnlikes',
    btnClassUnlike: 'btnUnlikes'
  }


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.providerData[0].displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.providerData[0].photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.providerData[0].uid;
      var providerData = user.providerData;
      console.log('onAuthStateChanged: user is signed in', user);
      console.log("User logged in..");

      document.getElementsByClassName('start-form')[0].style.display = 'none';
      document.getElementsByClassName('chat-form')[0].style.display = 'block';
      document.getElementById('logOut').style.display = 'block';

      // show user
      if (photoURL != null) {
        document.getElementById('userImg').src = photoURL;
        document.getElementById('userImg').style.backgroundColor = '#fff';

        userIdInfo.photo = photoURL;
      } else {
        document.getElementById('userImg').src = 'img_411076.png';
        document.getElementById('userImg').style.backgroundColor = '#fff';

      }
      if (displayName!= null) {
        document.getElementById('userDisplay').innerText = displayName;
        userIdInfo.name = displayName;
      }else {
        document.getElementById("userDisplay").innerText = "Anonymous user";

      }
      if (uid!= null) {
        userIdInfo.userId = uid;
      }else {
        document.getElementById("userDisplay").innerText = "Anonymous user";

      }


      //window.location = 'chat.html'; //After successful login, user will be redirected to home.html
      // ...
    } else {

      // ...
      console.log('onAuthStateChanged: user is signed out');
    }
  });






  // LOGGA UT
  if (document.getElementById('logOut') != null) {
    document.getElementById('logOut').addEventListener('click', function(event) {
      firebase.auth().signOut().then(function(result) {
          console.log('Signed out user');
        })
        .catch(function(error) {
          console.log('Signout failed');
        })
    })

  }

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

  if (document.getElementById('date') != null) {
    document.getElementById('date').innerHTML = datum();
  }


console.log('userIdInfo ',userIdInfo);

  // Message object
  let message = {
    sender: userIdInfo,
    text: '',
    likes: {
      value: 0,
    },
    dislikes: {
      value: 0,
    },
    time: ''
  };



  // Text input
  if (htmlElement.textInput != null) {
    htmlElement.textInput.addEventListener("change", function(event) {

      message.text = htmlElement.textInput.value;
      message.time = getTime();
    });

  }


  // Send input
  if (htmlElement.sendBtn != null) {
    htmlElement.sendBtn.addEventListener("click", function(event) {

      let uniqueMess = db.ref('/messages').push(message);
      console.log(uniqueMess.key);

    });
  }


  db.ref("/messages").on("value", function(snapshot) {

    let userData = snapshot.val();
    htmlElement.chatContainer.innerHTML = '';
    let output = '';
    let str;
    let like = 0;
    let dis = 0;
    //let targetId;

    for (let info in userData) {
      str = userData[info];
      console.log('str = ', str);


      let div = document.createElement('div');
      div.id = info;
      div.className = 'sentMess';
      div.innerHTML = `<p>${str.text} <span>${str.time}</span></p>
        <button class=${str.sender.btnClassLike} id='like${like++}' type="button" name="button">${str.likes.value} Like</button>
        <button class=${str.sender.btnClassUnlike} id='disLike${dis++}' type="button" name="button">${str.dislikes.value}Dislike</button>`;

      let likeBtn = div.getElementsByTagName('button')[0];
      let unlikeBtn = div.getElementsByTagName('button')[1];
      //likeBtn.style.backgroundColor = 'lime';

      likeBtn.addEventListener('click', function(event) {

        let messageId = event.target.parentElement.id;
        // let userLike = userData[messageId].likes;
        console.log('btnClass = ', snapshot.val()[messageId].likes.btnClass);


        if (snapshot.val()[messageId].sender.btnClassLike == 'btnlikes') {

          db.ref('/messages/' + messageId + '/sender/btnClassLike').set('btnLikeClicked');
          db.ref('/messages/' + messageId + '/sender/userLike').set(snapshot.val()[messageId].sender.userLike = 1);

          if (snapshot.val()[messageId].sender.userId && snapshot.val()[messageId].sender.userLike == 1) {
            db.ref('/messages/' + messageId + '/likes/value').set(snapshot.val()[messageId].likes.value + 1);
          }

        } else {
          db.ref('/messages/' + messageId + '/sender/btnClassLike').set('btnlikes');
          db.ref('/messages/' + messageId + '/sender/userLike').set(snapshot.val()[messageId].sender.userLike = 0);

          if (snapshot.val()[messageId].sender.userId && snapshot.val()[messageId].sender.userLike == 0) {
            db.ref('/messages/' + messageId + '/likes/value').set(snapshot.val()[messageId].likes.value -1);
          }
        }
      });

      unlikeBtn.addEventListener('click', function(event) {

        let messageId = event.target.parentElement.id;
        // let userLike = userData[messageId].likes;



        if (snapshot.val()[messageId].sender.btnClassUnlike == 'btnUnlikes') {

          db.ref('/messages/' + messageId + '/sender/btnClassUnlike').set('btnUnlikeClicked');
          db.ref('/messages/' + messageId + '/sender/userUnlike').set(snapshot.val()[messageId].sender.userunlike = 1);

        } else {
          db.ref('/messages/' + messageId + '/sender/btnClassUnlike').set('btnUnlikes');
          db.ref('/messages/' + messageId + '/sender/userUnlike').set(snapshot.val()[messageId].sender.userunlike = 0);

        }
      });

      htmlElement.chatContainer.appendChild(div);
    }

  }); // Snapshot END here




} // THE END of function everything
