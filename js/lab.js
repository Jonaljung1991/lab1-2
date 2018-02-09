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
    chatInput: document.getElementById('inputMain'),
    sendBtn: document.getElementById('sendBtn'),
    textInput: document.getElementById("textInput"),
    datum: document.getElementById("date"),
    chatContainer: document.getElementById("container"),
    userImg: document.getElementById("userImg"),
    chatForm:document.getElementsByClassName('chat-form')[0],

    // LOGIN PAGE
    mail: document.getElementById('mail'),
    password: document.getElementById('password'),
    login: document.getElementById('login'),
    createUser: document.getElementById('createUser'),
    SignInWithGithub: document.getElementById("github"),
    signInWithGoogle: document.getElementById('google'),
    signInWithFacebook: document.getElementById('face')
  }


  var userIdInfo = {
    name: "Anonymous user",
    photo: 'img_411076.png',
    userId: '1',

    btnClassLike: 'btnlikes',
    btnClassUnlike: 'btnUnlikes'
  }


  //LOGGA IN

  // Authenticate GIthub code
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

    let googleProvider = new firebase.auth.GoogleAuthProvider();
    htmlElement.signInWithGoogle.addEventListener('click', function(event) {
      firebase.auth().signInWithRedirect(googleProvider);
    });

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

  // Authenticate Google code

  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  //...

  // Authenticate Facebook code
  let facebookProvider = new firebase.auth.FacebookAuthProvider();

  htmlElement.signInWithFacebook.addEventListener('click', function(event) {
    firebase.auth().signInWithRedirect(facebookProvider);
  });
  //...

  // The auth Listener
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
      htmlElement.chatInput.style.display ='block';
      // show user
      if (photoURL != null) {
        document.getElementById('userImg').src = photoURL;
        document.getElementById('userImg').style.backgroundColor = '#fff';

        userIdInfo.photo = photoURL;

      } else {
        document.getElementById('userImg').src = 'img_411076.png';
        document.getElementById('userImg').style.backgroundColor = '#fff';

        userIdInfo.photo = 'img_411076.png';
      }
      if (displayName != null) {
        document.getElementById('userDisplay').innerText = displayName;
        userIdInfo.name = displayName;

      } else {
        document.getElementById("userDisplay").innerText = "Anonymous user";

      }
      if (uid != null) {
        userIdInfo.userId = uid;

      } else {
        document.getElementById("userDisplay").innerText = "Anonymous user";

      }

      // ...
    } else {
      // ...
      console.log('onAuthStateChanged: user is signed out');
    }
  });


  // LOGGA UT
  document.getElementById('logOut').addEventListener('click', function(event) {
    firebase.auth().signOut().then(function(result) {
        console.log('Signed out user');
      })
      .catch(function(error) {
        console.log('Signout failed');
      })
  })


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

  // Message object
  let message = {
    sender: userIdInfo,
    text: '',
    likeList: 0,
    unlikeList: 0,
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

  let userSend;
  // Send input
  if (htmlElement.sendBtn != null) {
    htmlElement.sendBtn.addEventListener("click", function(event) {

      userSend = userIdInfo.name;
      let uniqueMess = db.ref('/messages').push(message);
      console.log(uniqueMess.key);

    });
  }

  // Fetch input
  db.ref("/messages").on("value", function(snapshot) {

    

    let userData = snapshot.val();
    htmlElement.chatContainer.innerHTML = '';
    let output = '';
    let str;
    let val;
    let like = 0;
    let dis = 0;
    var likelist;
    var unlikelist;
    var messageId;


    for (let info in userData) {
      str = userData[info];

      let div = document.createElement('div');
      div.id = info;
      div.className = 'sentMess';
      div.innerHTML = `<div class='userDiv'><h3>${str.sender.name}</h3> <span>${str.time}</span></div>
        <div class='textDiv'><p>${str.text}</p></div>
        <div class='like-disBtnDiv'>
        <button class=${str.sender.btnClassLike} id='like${like++}' type="button" name="button">${str.likes.value} Likes</button>
        <button class=${str.sender.btnClassUnlike} id='disLike${dis++}' type="button" name="button">${str.dislikes.value} Dislikes</button>
        </div>`;

      let likeBtn = div.getElementsByTagName('button')[0];
      let unlikeBtn = div.getElementsByTagName('button')[1];


      // Like Knapp
      likeBtn.addEventListener('click', function(event) {

        messageId = event.target.parentElement.parentElement.id;
        likelist = userData[messageId].likeList;
        unlikelist = userData[messageId].unlikeList;


        if (likelist && likelist.hasOwnProperty(userIdInfo.userId)) {

          db.ref('/messages/' + messageId + '/likeList/' + userIdInfo.userId).remove();

          if (likelist != undefined) {
            val = Object.keys(likelist).length;
            //console.log('val = ' + val);
            db.ref('/messages/' + messageId + '/likes/value').set(val - 1);
          } else if (likelist == undefined || likelist == 0) {
            db.ref('/messages/' + messageId + '/likes/value').set(0);
          } else {
            console.log('i am nothing');
          }
        } else {

          db.ref('/messages/' + messageId + '/likeList/' + userIdInfo.userId).set(1).then(function(response) {
            //console.log('response är =', response);
            //console.log(response);
          });

          if (likelist == undefined || likelist == 0) {
            val = 0;
            db.ref('/messages/' + messageId + '/likes/value').set(val + 1);
            if (unlikelist) {
              val = Object.keys(unlikelist).length;
              if (unlikelist.hasOwnProperty(userIdInfo.userId)) {
                db.ref('/messages/' + messageId + '/unlikeList/' + userIdInfo.userId).remove();
                //console.log('disLike before minus ', val);
                db.ref('/messages/' + messageId + '/dislikes/value').set(val - 1);
              }
            }
          } else if (likelist != undefined) {
            val = Object.keys(likelist).length;
            db.ref('/messages/' + messageId + '/likes/value').set(val + 1);
            if (unlikelist) {
              if (unlikelist.hasOwnProperty(userIdInfo.userId)) {
                db.ref('/messages/' + messageId + '/unlikeList/' + userIdInfo.userId).remove();
                db.ref('/messages/' + messageId + '/dislikes/value').set(val - 1);
              }
            }
          }
        }
      });


      // Unlike knapp
      unlikeBtn.addEventListener('click', function(event) {
        messageId = event.target.parentElement.parentElement.id;
        likelist = userData[messageId].likeList;
        unlikelist = userData[messageId].unlikeList;
        //console.log(userIdInfo.userId);

        if (unlikelist && unlikelist.hasOwnProperty(userIdInfo.userId)) {

          db.ref('/messages/' + messageId + '/unlikeList/' + userIdInfo.userId).remove();

          //ställ i manuelt att det minskar
          if (unlikelist != undefined) {
            val = Object.keys(unlikelist).length;
            //console.log('val = ' + val);
            db.ref('/messages/' + messageId + '/dislikes/value').set(val - 1);
          } else if (unlikelist == undefined || unlikelist == 0) {
            //console.log('unlikelist is undefined');
            // koden här kommer aldrig att köras för listan blir adrig undefined i det hör stadiet
            db.ref('/messages/' + messageId + '/dislikes/value').set(0);
          } else {
            console.log('i am nothing');
          }
        } else {
          db.ref('/messages/' + messageId + '/unlikeList/' + userIdInfo.userId).set(1)
          //ställ i manuelt att det ökar och glöm inte att listan här existerar men registreras som undefined just nu.
          if (unlikelist == undefined || unlikelist == 0) {
            val = 0;
            db.ref('/messages/' + messageId + '/dislikes/value').set(val + 1);
            if (likelist) {
              val = Object.keys(likelist).length;
              if (likelist.hasOwnProperty(userIdInfo.userId)) {
                db.ref('/messages/' + messageId + '/likeList/' + userIdInfo.userId).remove();
                db.ref('/messages/' + messageId + '/likes/value').set(val - 1);
              }
            }
          } else if (unlikelist != undefined) {
            val = Object.keys(unlikelist).length;
            db.ref('/messages/' + messageId + '/dislikes/value').set(val + 1);
            if (likelist) {
              if (likelist.hasOwnProperty(userIdInfo.userId)) {
                db.ref('/messages/' + messageId + '/likeList/' + userIdInfo.userId).remove();
                db.ref('/messages/' + messageId + '/likes/value').set(val - 1);
              }
            }
          }
        }
      });

      htmlElement.chatContainer.appendChild(div);
    }
    //window.scrollTo(0,document.body.scrollHeight);
    htmlElement.chatForm.scrollTop = htmlElement.chatForm.scrollHeight;

  }); // Snapshot END here









} // THE END of function everything
