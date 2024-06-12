let time_transition_to_page = new Date().getTime();

window.onload = function() {
  fetch("/")
    .then((response) => {
      const serverTime = response.headers.get("X-Response-Time");
      document.getElementById("timeOfLoading").innerHTML =
        "Page load time is <b>" +
        (new Date().getTime() - time_transition_to_page) +
        "</b> ms on client and </b>" +
        serverTime +
        "</b> on server";
    })
    .catch((error) => console.error(error));
};