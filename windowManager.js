const $toolTip = $('.option');
$toolTip.hide();
let isFullscreen = false;
let activeWindow = null;
let offsetX, offsetY, initialX, initialY, initialWidth, initialHeight;

$(document)
  .on('mousemove', handleMouseMove)
  .on('mouseup', handleMouseUp)
  .on('mouseout', handleMouseOut)
  .on('mousedown', handleMouseDown);

$('svg').on('click', handleSvgClick);
$('.head').on('dblclick', handleHeadDoubleClick);

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

function handleMouseUp() {
  if (activeWindow) {
    activeWindow.style.boxShadow = '';
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
      border: '1px solid var(--border-color)',
      borderRadius: '5px',
      padding: '5px',
      pointerEvents: 'all',
      cursor: 'pointer',
      zIndex: '1',
      fontWeight: '600',
      position: 'relative'
    },
    slot: 'open',
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

function handleHeadDoubleClick() {
  if (!isFullscreen) {
    isFullscreen = true;
    $(this).parent()[0].requestFullscreen();
  } else {
    isFullscreen = false;
    document.exitFullscreen();
  }
}
function handleMouseOut() {
    if ($toolTip.is(':visible')) {
      $toolTip.css('opacity', '0');
    }
  }
  