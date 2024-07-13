const menu = document.querySelector('.menu');
const hamburgerMenu = document.querySelector('.hamburger-menu');

hamburgerMenu.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  const iconBars = document.querySelector('.fa-bars');
  const iconClose = document.querySelector('.fa-xmark');
  iconBars.classList.toggle('hidden');
  iconClose.classList.toggle('hidden');

  if (!menu.classList.contains('hidden')) {
    menu.classList.add('absolute', 'top-16', 'w-full', 'left-0', 'bg-white', 'divide-y', 'divide-gray-200', 'shadow-lg');
  } else {
    menu.classList.remove('absolute', 'top-16', 'w-full', 'left-0', 'bg-white', 'divide-y', 'divide-gray-200', 'shadow-lg');
  }
});
