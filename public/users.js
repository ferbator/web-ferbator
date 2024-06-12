window.addEventListener('load', async function loadUrl() {
  const container = document.getElementById('users');
  let users = [];

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    users = await response.json();
    users = users.filter(function (item, index, array) {
      return item.id % getRandomInRange(1, 10) === 0;
    });
  } catch (e) {
    const message = document.createElement('p');
    message.innerHTML = '⚠ Что-то пошло не так';
    message.classList.add('error_message');
    container.appendChild(message);
    return;
  } finally {
    document.getElementsByClassName('preloader')[0].style.display = 'none';
  }
  users.forEach(function (us, i, users) {
    const person = document.createElement('div');
    const username = document.createElement('p');
    const name = document.createElement('p');
    const email = document.createElement('a');
    const address = document.createElement('div');
    const street = document.createElement('p');
    const suite = document.createElement('p');

    const phone = document.createElement('p');
    const company = document.createElement('div');
    const companyName = document.createElement('p');
    const companyPhrase = document.createElement('p');

    const website = document.createElement('a');

    username.innerHTML = us.username;
    name.innerHTML = us.name;
    phone.innerHTML = us.phone;

    email.href = 'mailto: ' + us.email;
    email.innerHTML = us.email;

    website.href = 'ftp://' + us.website;
    website.innerHTML = us.website;

    company.innerHTML = 'Компания';
    companyName.innerHTML = us.company.name;
    companyPhrase.innerHTML = us.company.catchPhrase;

    address.innerHTML = 'Адрес';
    street.innerHTML = us.address.street;
    suite.innerHTML = us.address.suite;

    person.classList.add('person');
    name.classList.add('name__of__person');
    username.classList.add('username__of__person');
    email.classList.add('email__of__person');
    address.classList.add('address__of__person');
    street.classList.add('address__street__of__person');
    suite.classList.add('address__suit__of__person');
    phone.classList.add('phone__of__person');
    company.classList.add('company__of__person');
    companyName.classList.add('company__name__of__person');
    companyPhrase.classList.add('company__phrase__of__person');
    website.classList.add('website__of__person');

    address.appendChild(street);
    address.appendChild(suite);

    company.appendChild(companyName);
    company.appendChild(companyPhrase);

    person.appendChild(name);
    person.appendChild(username);
    person.appendChild(phone);
    person.appendChild(email);
    person.appendChild(website);
    person.appendChild(company);
    person.appendChild(address);

    container.appendChild(person);
  });
});
