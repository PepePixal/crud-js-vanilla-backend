import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { UsersApp } from './users/users-app';
// import { BreakingbadApp } from './breakingbad/breakingbad-app';


document.querySelector('#app').innerHTML = `

  <div class="hero">
    <img src="${javascriptLogo}" class="framework" alt="JavaScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <h2 id="app-title">Get started</h2>
  <div class="card">
    
  </div>
`;

// selecciona elemento html 
const element = document.querySelector('.card');

// llama func principal enviando el elemento donde inertar
UsersApp( element );



// llama func enviando elemento html
// BreakingbadApp( element );


