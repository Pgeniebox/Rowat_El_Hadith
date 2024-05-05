let windmove = null;
let initialX = 0;
let initialY = 0;
let initialWidth = 0;
let initialHeight = 0;
let offsetX = 0;
let offsetY = 0;
 $('*').tooltip({
    
    hide: { effect: "", duration: 1 },
   tooltipClass: "defaultTooltip"
   
});
$(document).on('mousedown mouseup mousemove', '*', function(e) {
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
               
            }
            break;
        case 'mousedown':
            switch (this.role) {
                case 'min':
                    const wind = this.parentElement.parentElement;
                    wind.hidden = true;
                    const newT = document.createElement('p');
                    newT.style.border = '1px solid rgb(97, 97, 97)';
                    newT.style.borderRadius = '5px';
                    newT.style.padding = '5px';
                    newT.classList = 'newT';
                    newT.style.pointerEvents = 'all';
                    newT.style.cursor = 'pointer';
                    newT.role = 'open';
                    newT.style.zIndex = '99999999';
                    newT.style.fontWeight = '600';
                    newT.style.position = 'relative';
                    newT.textContent = wind.attributes.name.nodeValue;
                    document.getElementById('taskBar').appendChild(newT);
                    break;
                case 'open':
                    document.querySelector('[name="' + this.textContent + '"]').hidden = false;
                    this.remove();
                    break;
                case 'move':
                            windmove = this.parentElement;
                            windmove.state = 'move';
                            offsetX = e.clientX - windmove.offsetLeft;
                    offsetY = e.clientY - windmove.offsetTop;
                            break;
                case 'resize':
                    windmove = this.parentElement;
                    windmove.state = 'resize';
                    initialX = e.clientX;
                    initialY = e.clientY;
                    initialWidth = windmove.offsetWidth;
                    initialHeight = windmove.offsetHeight;
                    break;
                    case 'down':
                        console.log(this);
                        downloadFile( this.download_url, this.path);
                        break;
                    break;
            }
            break;
            case 'mouseup':
            windmove=null;    
            break;
    }
});