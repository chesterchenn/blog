var top = document.getElementsByClassName('top')[0];

function handleTop() {
  document.getElementsByClassName('site-header')[0].scrollIntoView({
    behavior: 'smooth',
  });
}

top.addEventListener('click', () => handleTop());
