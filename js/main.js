document.addEventListener('DOMContentLoaded', function () {
  	app.init();
});


var app = {  
    note: document.getElementById('note'),
  	noteSize: 18,
  	clearNotes: document.getElementById('clearNotes'),
    modalClear: document.getElementById('modalClear'),
    menosBtn: document.getElementById('menos'),
  	masBtn: document.getElementById('mas'),

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

      if(localStorage.getItem("_noteSize") && localStorage.getItem("_noteSize")!=''){
        var noteSizeItem = localStorage.getItem("_noteSize");
        app.noteSize = noteSizeItem;
        app.note.style.fontSize = app.noteSize + 'px';
      }

      app.menosBtn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation(); 

        if (app.noteSize > 10) {
          app.noteSize = parseFloat(app.noteSize) - 2
          app.note.style.fontSize = app.noteSize + 'px';
          localStorage.setItem("_noteSize", app.noteSize);
          app.masBtn.classList.remove('disabled');
        } else {
          app.menosBtn.classList.add('disabled');
        }
      });

      app.masBtn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation(); 

        if (app.noteSize < 50) {
          app.noteSize = parseFloat(app.noteSize) + 2
          app.note.style.fontSize = app.noteSize + 'px';
          localStorage.setItem("_noteSize", app.noteSize);
          app.menosBtn.classList.remove('disabled');
        } else {
          app.masBtn.classList.add('disabled');
        }
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
