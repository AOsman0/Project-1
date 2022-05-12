const quotesSection = document.getElementById("quotes-section");
const mainElement = document.getElementById("main");

const renderQuotesSection = () => {
  $("#main").append(`<section id="quotes-section">
   <div class="quotes-container">
     <div class="quotes-head">
       <h2 class="quotes-header">
         Quotes
         <div class="button-icons">
           <button class="plus-icon">
             <i class="fa-solid fa-plus"></i>
           </button>
           <button class="refresh-icon">
             <i class="fa-solid fa-arrows-rotate"></i>
           </button>
         </div>
       </h2>
     </div>
     <div class="quotes-info">
       <p class="quotes-text">
         Lorem ipsum, dolor sit amet consectetur adipisicing elit.
         Excepturi mollitia, nemo numquam alias itaque tenetur nesciunt.
         Neque alias, iure labore nostrum nam quo. Optio, animi rerum. Modi
         officiis minus placeat!
       </p>
       <h3 class="quotes-details">Source:</h3>
     </div>
   </div>
 </section>`);
};

const onLoad = () => {
  renderQuotesSection();
};

window.addEventListener("load", onLoad);
