const animalGrid = document.getElementById('animal-grid');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.getElementById('modal-close');

function goToProfile() {
  window.location.href = 'profile';
}

function goToHome() {
  window.location.href = '/';
}

const animals = [
  {
    name: 'Кот',
    image: 'https://placekitten.com/300/200',
    description: 'Любит спать на солнышке',
  },
  {
    name: 'Собака',
    image: 'https://placedog.net/300/200',
    description: 'Верный друг человека',
  },
  {
    name: 'Попугай',
    image: 'https://placeparrot.com/300/200',
    description: 'Умеет повторять слова и фразы',
  },
  {
    name: 'Хомяк',
    image: 'https://placehamster.com/300/200',
    description: 'Любит крутиться в колесе',
  },
];

animals.forEach((animal) => {
  const animalCard = document.createElement('div');
  animalCard.classList.add('animal-card');
  animalCard.innerHTML = `
    <img src="${animal.image}" alt="${animal.name}">
    <div class="overlay"></div>
  `;
  animalCard.addEventListener('click', () => {
    modalTitle.innerText = animal.name;
    modalImage.src = animal.image;
    modalDescription.innerText = animal.description;
    modal.style.display = 'flex';
  });
  animalGrid.appendChild(animalCard);
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
