export const alert = (message: string, ms?: number) => {
  const alertModalDOM = document.querySelector(
    "#portal > .alert-modal"
  ) as HTMLDivElement;
  alertModalDOM.classList.add("show");
  const ad = alertModalDOM.querySelector("span") as HTMLDivElement;
  ad.innerText = message;
  setTimeout(() => {
    alertModalDOM.classList.remove("show");
  }, ms ?? 2000);
};
