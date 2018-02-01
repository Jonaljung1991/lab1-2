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

let db = firebase.database();
let message = {  // exempel objekt
	sender: 'David',
  text: 'Hur mår du'
  image: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg',
  likes: 3,
  dislikes: 2,
  time: '12.30'

};




window.addEventListener('load', everything);

function everything(event){
  console.log('I am working :)');
}
