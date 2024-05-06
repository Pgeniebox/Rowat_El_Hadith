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
            switch (this.slot) {
                case 'show':
    
                    fetch(this.download_url)           
                    .then(response => response.text())
                    .then(text=> {  
                        const newwind = document.createElement('div');
                        document.body.appendChild(newwind);
                        
                        // Replace all occurrences of 'القاعدة' with 'this.path'
                        windmodel = windmodel.replaceAll('القاعدة', this.path);
                        
                        // Replace <ul></ul> with a new <ul> tag with inline styles
                        windmodel = windmodel.replace(
                            "<ul></ul>",
                            "<ul style=' padding: 22px; word-wrap: break-word; overflow-wrap: break-word;background-color: #070816;height: 100%'>"+ text +"</ul>"
                        );
                        
                        // Set the outer HTML of newwind to the modified windmodel
                        newwind.outerHTML = windmodel;
                        
                        })
                    .catch(error => console.error('Error downloading file:', error));  
                break;
                case 'min':
                    const wind = this.parentElement.parentElement;
                    wind.hidden = true;
                    const newT = document.createElement('p');
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
                    break;
            }
            break;
            case 'mouseup':
                switch(window.getSelection().getRangeAt(0).commonAncestorContainer.parentElement.slot){
                    case 'seltext':
                  const seltext = document.createElement('p');
                  const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
                  
                  window.getSelection().toString();
                    break;
                       }
                       if(null!=windmove){windmove.state='fixe';windmove=null;}
            break;
    }
});