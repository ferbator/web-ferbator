function showLoginFormFirst() {
  document.getElementById('wrapper-login').style.display = 'block';
}

function noShowLoginForm() {
  document.getElementById('wrapper-login').style.display = 'none';
}

function showLoginFormSecond() {
  document.getElementById('wrapper-register').style.display = 'none';
  document.getElementById('wrapper-login').style.display = 'block';
}

function showRegisterForm() {
  document.getElementById('wrapper-login').style.display = 'none';
  document.getElementById('wrapper-register').style.display = 'block';
}

function noShowRegisterForm() {
  document.getElementById('wrapper-register').style.display = 'none';
}

function showCreatePetForm() {
  document.getElementById('create-pet-form').style.display = 'block';
}

function deletePet(id) {
  if (confirm('Are you sure you want to delete this pet?')) {
    fetch('/pet/delete/' + id, { method: 'DELETE' }).then(() =>
      window.location.reload(),
    );
  }
}
