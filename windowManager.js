'use strict';
const $toolTip = $('.option');
$toolTip.hide();
let isFullscreen = false;
let activeWindow = null;
let offsetX, offsetY, initialX, initialY, initialWidth, initialHeight;

$(document)
  .on('mousemove',':not(body,html,#taskBar)', handleMouseMove)
  .on('mouseup',':not(body,html,#taskBar)', handleMouseUp)
  .on('mouseout',':not(body,html,#taskBar)', handleMouseOut)
  .on('mousedown',':not(body,html,#taskBar)', handleMouseDown);
$('svg').on('click', handleSvgClick);
$('.head.wd').on('dblclick', requestFullscreen);
function handleMouseMove(e) {
  if (activeWindow) {
    if (activeWindow.state === 'move') {
      moveWindow(e);
    } else if (activeWindow.state === 'resize') {
      resizeWindow(e);
    }
  } else {
    const $target = $(e.target);
    if ($target.attr('title')) {
      showToolTip(e, $target);
    }
  }
}
function moveWindow(e) {
  activeWindow.style.boxShadow = 'var(--shadow)';
  activeWindow.style.left = e.clientX - offsetX + 'px';
  activeWindow.style.top = e.clientY - offsetY + 'px';
}

function resizeWindow(e) {
    const newX = e.clientX;
    const newY = e.clientY;
    const newWidth = initialWidth + (newX - initialX);
    const newHeight = initialHeight + (newY - initialY);
    activeWindow.style.width = newWidth + 'px';
    activeWindow.style.height = newHeight + 'px';
    // Update initial position and size for next resizing
    initialX = newX;
    initialY = newY;
    initialWidth = newWidth;
    initialHeight = newHeight;
  }
  

function showToolTip(e, $target) {
  $toolTip.text($target.attr('title')).css({
    opacity: '0.9',
    left: Math.min(e.clientX + 20, window.innerWidth - $toolTip.outerWidth() - 10),
    top: Math.min(e.clientY + 20, window.innerHeight - $toolTip.outerHeight() - 10)
  }).show();
}

function handleMouseDown(e) {
  e.target.style.filter = 'contrast(90%)';
  const $target = $(e.target);
  activeWindow = $target.parent()[0];
  activeWindow.state = $target.attr('slot');
  if ($target.attr('slot') === 'move') {
    offsetX = e.clientX - activeWindow.offsetLeft;
    offsetY = e.clientY - activeWindow.offsetTop; 
  }else{
                    initialX = e.clientX;
                    initialY = e.clientY;
                    initialWidth = activeWindow.offsetWidth;
                    initialHeight = activeWindow.offsetHeight;
  }
}

function handleMouseUp(e) {
  e.target.style.filter = 'none';
  if (activeWindow) {
   $('#container')[0].style.boxShadow = '';
    activeWindow = null;
  }
}

function handleMouseOut() {
  if (!$toolTip.isHidden()) {
    $toolTip.css('opacity', '0');
  }
}

function handleSvgClick() {
  const slot = $(this).attr('slot');
  if (isFullscreen && slot === 'min') {
    document.exitFullscreen();
  } else {
    switch (slot) {
      case 'min':
        minimizeWindow(this);
        break;
      case 'close':
        closeWindow(this);
        break;
        case 'fs':
          requestFullscreen();
        break;
    }
  }
}

function minimizeWindow(svgElement) {
  const $windowElement = $(svgElement).parent().parent();
  $windowElement.hide();
  const taskName = $windowElement.attr('name');
  createTaskBarElement(taskName);
}


function createTaskBarElement(taskName) {
  const $newTask = $('<p>', {
    css: {
      border: 'none',
      boxShadow: 'var(--shadow)',
      borderRadius: '5px',
      padding: '5px',
      pointerEvents: 'all',
      cursor: 'pointer',
      zIndex: '1',
      fontWeight: '600',
      position: 'relative',
      backgroundColor: 'var(--pointer)'
    },
    slot: 'open',
    class: 'newT',
    text: taskName
  }).click(function() {
    $(`[name="${taskName}"]`).show();
    $(this).remove();
  });
  $('#taskBar').append($newTask);
}

function closeWindow(svgElement) {
  $toolTip.hide().css('opacity', '0');
  $(svgElement).parent().parent().remove();
}

function requestFullscreen() {
  if (!isFullscreen) {
    $('[slot="fs"]')[0].style.rotate = '180deg';
    $('[slot="fs"]')[0].title = "تصغير النافذة";
    $('[slot="fs"]')[0].parentElement.parentElement.requestFullscreen();
    isFullscreen = true;
  } else {
    $('[slot="fs"]')[0].style.rotate = '0deg';
    $('[slot="fs"]')[0].title = "تكبير النافذة";
    isFullscreen = false;
    document.exitFullscreen();
  }
  return $('[slot="fs"]')[0] = null;
}
function handleMouseOut() {
    if ($toolTip.is(':visible')) {
      $toolTip.css('opacity', '0');
    }
  }
  