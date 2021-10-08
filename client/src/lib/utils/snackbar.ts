const alert = (message: string, ms?: number) => {
  const alertModalDOM = document.querySelector("#portal > .alert-modal") as any;
  alertModalDOM.classList.add("show");
  alertModalDOM.querySelector("span").innerText = message;

  setTimeout(() => {
    alertModalDOM.classList.remove("show");
  }, ms ?? 2000);
};
