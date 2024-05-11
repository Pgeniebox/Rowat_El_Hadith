
var toolt = document.querySelector('.option');
   toolt.hidden=true;
let fs =false;

var isEventHandled = false;
var windmove = null;
var offsetX, offsetY, initialX, initialY, initialWidth, initialHeight;
document.addEventListener('mousemove', function(e) {
            if (null!==windmove) {
                if (windmove.state === 'move') {
                    windmove.style.boxShadow = 'var(--shadow)';
                    windmove.style.left = e.clientX - offsetX + 'px';
                    windmove.style.top = e.clientY - offsetY + 'px';
                } else if (windmove.state === 'resize'){
                    const newX = e.clientX;
                    const newY = e.clientY;
                    const newWidth = initialWidth + (newX - initialX);
                    const newHeight = initialHeight + (newY - initialY);
                    windmove.style.width = newWidth + 'px';
                    windmove.style.height = newHeight + 'px';
                }
            } else {
                if (undefined !== e.target.attributes.title) {
                    queueMicrotask(()=>{toolti(e,e.target)});
                    $(this).clearQueue();
                }
            }
});

document.addEventListener('mousedown', function(e) {
    switch (e.type) {
        case 'mousedown':
            switch (e.target.slot) {
                case 'move':
                    windmove = e.target.parentElement;
                    windmove.state = 'move';
                    offsetX = e.clientX - windmove.offsetLeft;
                    offsetY = e.clientY - windmove.offsetTop;
                    break;
                case 'resize':
                    windmove = e.target.parentElement;
                    windmove.state = 'resize';
                    initialX = e.clientX;
                    initialY = e.clientY;
                    initialWidth = windmove.offsetWidth;
                    initialHeight = windmove.offsetHeight;
                    break;
            }
            $(this).clearQueue();

    }
});

document.addEventListener('mouseup', function(e) {
            if(null!=windmove){windmove.style.boxShadow = '';   windmove=null;}
            $(this).clearQueue();
});

document.addEventListener('mouseout', function() {
            if(!toolt.hidden){toolt.style.opacity = '0'}
            $(this).clearQueue();  
});

$('svg').on('click',function(){
    if(fs){document.exitFullscreen();}
    switch(this.slot){
        case 'min':
            const wind = this.parentElement.parentElement;
            wind.hidden = true;
            const newT = document.createElement('p');
            document.getElementById('taskBar').appendChild(newT);
            newT.style.border = '1px solid var(--border-color)';
            newT.style.borderRadius = '5px';
            newT.style.padding = '5px';
            newT.classList = 'newT';
            newT.style.pointerEvents = 'all';
            newT.style.cursor = 'pointer';
            newT.slot = 'open';
            newT.style.zIndex = '1';
            newT.style.fontWeight = '600';
            newT.style.position = 'relative';
            newT.onclick = function (){    document.querySelector('[name="' + this.textContent + '"]').hidden = false;
            this.remove();
            }
            newT.textContent = wind.attributes.name.nodeValue;
            break;
      case 'close':
        toolt.hidden = true;
        toolt.style.opacity = '0';
        this.parentElement.parentElement.remove();
        break;
    }        
});
$( ".head" ).on( "dblclick", function() {
    if(!fs){
        fs = true;
        this.parentElement.requestFullscreen();
    }else{fs=false;  document.exitFullscreen();}
  } );
function toolti(e,a){
    toolt.textContent = a.attributes.title.value;
    toolt.style.opacity = '0.9';
    const tooltipWidth = toolt.offsetWidth;
    const tooltipHeight = toolt.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const posX = e.clientX + 20; 
    const posY = e.clientY + 20;

    if (posX + tooltipWidth > windowWidth) {
        toolt.style.left = (windowWidth - tooltipWidth - 10) + 'px';
    } else {
        toolt.style.left = posX + 'px';
    }
    if (posY + tooltipHeight > windowHeight) {
        toolt.style.top = (windowHeight - tooltipHeight - 10) + 'px';
    } else {
        toolt.style.top = posY + 'px';
    }

    toolt.hidden = false;}


