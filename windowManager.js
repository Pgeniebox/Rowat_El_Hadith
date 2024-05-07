let windmove = null;
let initialX = 0;
let initialY = 0;
let initialWidth = 0;
let initialHeight = 0;
let offsetX = 0;
let offsetY = 0;
let working=true;
toolt = document.querySelector('.option');


$(document).on('mousedown mouseup mousemove mouseover mouseout','*', function(e) {
    switch (e.type) {
        case 'mousemove':
            if (windmove !== null) {
                if (windmove.state === 'move') {
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
                if (null != e.target.attributes.title) {
               requestAnimationFrame(()=>{tooltip(e,e.target)});
                }
            }

            break;
        case 'mousedown':
            switch (e.target.slot) {
                case 'min':
                    const wind = e.target.parentElement.parentElement;
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
                    newT.style.zIndex = '99999999';
                    newT.style.fontWeight = '600';
                    newT.style.position = 'relative';
                    newT.textContent = wind.attributes.name.nodeValue;
                    break;
                case 'open':
                    document.querySelector('[name="' + e.target.textContent + '"]').hidden = false;
                    e.target.remove();
                    break;
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
            break;
        case 'mouseup':
            case 'show':
                   if(working){working=false;
                fetch(e.target.download_url)           
                .then(response => response.text())
                .then(text=> {  
                    const newwind = document.createElement('div');
                    document.body.appendChild(newwind);
                    windmodel = windmodel.replaceAll('القاعدة', e.target.path);
                    windmodel = windmodel.replace(
                        "<ul></ul>",
                        "<ul slot='seltext' style=' padding: 22px; word-wrap: break-word; overflow-wrap: break-word;background-color: #070816;height: 100%'>"+ text +"</ul>"
                    );
                    newwind.outerHTML = windmodel;
                })
                .finally(()=>{working=true;})
                .catch(error => console.error('Error downloading file:', error));}  
            if(null!=windmove){windmove.state='fixe';windmove=null;}
            break;
        case 'mouseout':
            if(!toolt.hidden){toolt.style.opacity = '0'}    
        break; 
    }
});

function tooltip(e,a){toolt.textContent = a.attributes.title.value;
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