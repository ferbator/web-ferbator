async function signUpClicked() {
  const email = document.getElementById('signUpEmail').value;
  const name = document.getElementById('signUpLogin').value;
  const password = document.getElementById('signUpPassword').value;

  try {
    checkEmail(email);
    let response = await supertokensEmailPassword.signUp({
      formFields: [
        {
          id: 'email',
          value: email,
        },
        {
          id: 'password',
          value: password,
        },
      ],
    });
    console.log(response);

    if (response.status === 'FIELD_ERROR') {
      // one of the input formFields failed validaiton
      response.formFields.forEach((formField) => {
        if (formField.id === 'email') {
          // Email validation failed (for example incorrect email syntax),
          // or the email is not unique.
          window.alert(formField.error);
        } else if (formField.id === 'password') {
          // Password validation failed.
          // Maybe it didn't match the password strength
          window.alert(formField.error);
        }
      });
    } else {
      // sign up successful. The session tokens are automatically handled by
      // the frontend SDK.
      window.alert('success');
      const resp = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalId: String(response.user.id),
          email: email,
          name: name,
        }),
      });
      window.location = '/';
    }
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert('Oops! Something went wrong.');
    }
  }
}

async function checkEmail(email) {
  try {
    let response = await supertokensEmailPassword.doesEmailExist({
      email,
    });

    if (response.doesExist) {
      window.alert('Email already exists. Please sign in instead');
    }
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert('Oops! Something went wrong.');
    }
  }
}

async function logout() {
  await supertokensSession.signOut();
  window.location.href = '/';
}

async function signInClicked() {
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;
  try {
    let response = await supertokensEmailPassword.signIn({
      formFields: [
        {
          id: 'email',
          value: email,
        },
        {
          id: 'password',
          value: password,
        },
      ],
    });

    if (response.status === 'FIELD_ERROR') {
      // one of the input formFields failed validaiton
      response.formFields.forEach((formField) => {
        if (formField.id === 'email') {
          // Email validation failed (for example incorrect email syntax).
          window.alert(formField.error);
        }
      });
    } else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
      window.alert('Email password combination is incorrect.');
    } else {
      // sign in successful. The session tokens are automatically handled by
      // the frontend SDK.
      window.location.href = '/';
    }
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert('Oops! Something went wrong.');
      window.alert(err.message);
    }
  }
}
