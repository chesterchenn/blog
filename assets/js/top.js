var topElement = document.getElementsByClassName('top')[0];

function handleTop() {
  document.getElementsByClassName('site-header')[0].scrollIntoView({
    behavior: 'smooth',
  });
}

topElement.addEventListener('click', handleTop);
