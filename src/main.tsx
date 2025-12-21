import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from "./App"
import './style.css'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


// import './style.css'
// import "./litebox.css";
// import { litebox } from './litebox.ts';

// // <div class="example-gallery gallery-1">
// //   <h3>An example gallery using img src for large images</h3>
// //   <ul>
// //     <li><img src="https://picsum.photos/id/1015/1500/1000" alt="Image 1"></li>
// //     <li><img src="https://picsum.photos/id/1016/1500/1000" alt="Image 2"></li>
// //     <li><img src="https://picsum.photos/id/1018/1500/1000" alt="Image 3"></li>
// //     <li><img src="https://picsum.photos/id/1020/1500/1000" alt="Image 4"></li>
// //   </ul>
// // </div>
// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>

//     <div class="example-gallery gallery-2">
//       <h3>An example gallery using link href for large images</h3>
//       <ul>
//         <li><a href="https://picsum.photos/id/1010/1500/1000"><img src="https://picsum.photos/id/1010/150/100" alt="Image 1"></a></li>
//         <li><a href="https://picsum.photos/id/1011/1500/1000"><img src="https://picsum.photos/id/1011/150/100" alt="Image 2"></a></li>
//         <li><a href="https://picsum.photos/id/1012/1500/1000"><img src="https://picsum.photos/id/1012/150/100" alt="Image 3"></a></li>
//         <li><a href="https://picsum.photos/id/1023/1500/1000"><img src="https://picsum.photos/id/1023/150/100" alt="Image 4"></a></li>
//       </ul>
//     </div>



//   </div>

// <div class="litebox" popover="manual" id="litebox-1">
//   <div class="litebox-content">
//     <ul>
//       <li class="litebox-item active">
//         <img class="litebox-image" src="https://picsum.photos/id/1010/1500/1000" alt="">
//         <div class="litebox-description">Foo bar baz</div>
//       </li>
//       <li class="litebox-item">
//         <img class="litebox-image" src="https://picsum.photos/id/1011/1500/1000" alt="">
//         <div class="litebox-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
//       </li>
//       <li class="litebox-item">
//         <img class="litebox-image" src="https://picsum.photos/id/1012/1500/1000" alt="">
//         <div class="litebox-description">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
//       </li>
//     </ul>
//   </div>
//   <div class="litebox-controls">
//     <button class="litebox-prev">&#10094;</button>
//     <button class="litebox-next">&#10095;</button>
//     <button class="litebox-close">&times;</button>
//   </div>
// </div>

// `

// litebox(".gallery-2", { imageSource: "a" });

//     <div class="litebox" id="litebox-1">
//       <div class="litebox-content">
//         <ul>
//           <li class="litebox-item active">
//             <img class="litebox-image" src="https://picsum.photos/id/1010/1500/1000" alt="">
//             <div class="litebox-description">Foo bar baz</div>
//           </li>
//           <li class="litebox-item">
//             <img class="litebox-image" src="https://picsum.photos/id/1011/1500/1000" alt="">
//             <div class="litebox-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
//           </li>
//           <li class="litebox-item">
//             <img class="litebox-image" src="https://picsum.photos/id/1012/1500/1000" alt="">
//             <div class="litebox-description">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
//           </li>
//         </ul>
//       </div>
//       <div class="litebox-controls">
//         <button class="litebox-prev">&#10094;</button>
//         <button class="litebox-next">&#10095;</button>
//         <button class="litebox-close">&times;</button>
//       </div>
//     </div>
