document.addEventListener('DOMContentLoaded', function () {
  	app.init();
});


  


var app = {  
  	note: document.getElementById('note'),
  	clearNotes: document.getElementById('clearNotes'),
  	modalClear: document.getElementById('modalClear'),

    doOnOrientationChange: function() {
      
/*
        alert("The orientation of the screen is: " + screen.orientation.type);
        alert("The orientation of the screen is: " + screen.orientation.angle);
        */
        
      switch(screen.orientation.angle) {  
        case 0:      
          //portrait-primary
          screen.lockOrientation("portrait-primary");
          break; 
            
        case 180:  
          //portrait-secondary
          screen.lockOrientation("portrait-secondary");
          break; 
      
        case 90:  
          //landscape-primary
          screen.lockOrientation("landscape-primary");
          break;  
      
        case 270:  
          //landscape-secondary
          screen.lockOrientation("landscape-secondary");
          break;
      }
    },
  
  	init: function() {
      window.addEventListener('orientationchange', app.doOnOrientationChange);

  		app.note.addEventListener('keyup',
  			() => { setTimeout(function(){ localStorage.setItem("_note", app.note.value); }, 500) }
		  );
		
  		if(localStorage.getItem("_note") && localStorage.getItem("_note")!=''){
    		var noteItem = localStorage.getItem("_note");
    		app.note.value = noteItem;
  		}

      screen.addEventListener("orientationchange", function () {
        alert("The orientation of the screen is: " + screen.orientation);
      });

	  	app.clearNotes.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
	  		app.modalClear.classList.remove('hide');
        app.note.blur();

  			document.getElementById('okClear').addEventListener('click', () => {
				  app.modalClear.classList.add('hide');
		    	app.note.value = '';
		    	localStorage.setItem("_note", '');
          app.note.focus();
				  document.getElementById('okClear').removeEventListener('click', ()=> {});
  			});

  			document.getElementById('closeClear').addEventListener('click', () => {  				
				  app.modalClear.classList.add('hide');
          app.note.focus();
				  document.getElementById('closeClear').removeEventListener('click', ()=> {});
  			});


		    
		});

		if ('serviceWorker' in navigator) {
      		navigator.serviceWorker
        		.register('service-worker.js')
        		.then(function() {
          		//console.log('Service Worker Registered');
        	});
		}
  	}
};
