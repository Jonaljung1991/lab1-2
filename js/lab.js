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


  // project code

window.addEventListener('load', everything);

function everything(event){

  let db = firebase.database();

  // all html elements
  const htmlElement = {
    sendBtn: document.getElementById('sendBtn'),
    textInput: document.getElementById("textInput"),
    showTime: document.getElementById("showTime"),
    chatContainer: document.getElementById("container")

  }

  htmlElement.sendBtn.style.disabled = true;

  // Message
  let message = {
  	sender: 'David',
    text: '',
    likes: 3,
    dislikes: 2,
    time: ''
  };


  // Time Element

  function getTime(){
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


  console.log(getTime());
  console.log(htmlElement.sendBtn);


  htmlElement.textInput.addEventListener("change" , function(event){
    htmlElement.sendBtn.disabled = false;
    message.text = htmlElement.textInput.value;
    message.time = getTime();
  })
  htmlElement.sendBtn.addEventListener("click" , function(event){

    if(message.text !== ""){
    db.ref('/messages').push(message);
    /**/

    db.ref("/messages").on("value", function (snapshot) {
        let userData = snapshot.val();
        let output = '';


        for (let info in userData) {
          console.log(`allData har en property som heter ${info}`);
          console.log('värdet är:' , userData[info]);
          str = userData[info];


            console.log('userdata ', str.text);
           output += `<div class = 'message-light'>
                          <p>${str.text} <span>${str.time}</span></p>
                        </div>`

            }
            htmlElement.chatContainer.innerHTML = output;
      });
    }
  })


}
