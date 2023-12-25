const popup = document.querySelector(".popup");
const fontIcon = document.querySelector(".icon i");
const paragragh = document.querySelector(".details p");
const h2El = document.querySelector(".details h2");
const btn = document.querySelector(".btn");

let isOnline = true, intervalid, timer = 10;

const checkConnection = async () => {
    try{ //Fetch data from random API. if the status code is between 200 and 300 the network is considered online
        const response =  await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;

        console.log(response);
    }
    catch(error) { //Considers network offline if there is an error 
        isOnline = false;
    }
    timer = 10;
    clearInterval(intervalid);
    popupHandler(isOnline);
}
const popupHandler = (status) => {
    if (status) { //if the status is true
        fontIcon.classList = "ri-wifi-line";
        h2El.innerText = "Restored Connection";
        paragragh.innerHTML = `Your internet is now successfully connected`;
        popup.classList.add("online");
        return setTimeout(() =>  popup.classList.remove("show"), 2000);
    } 
    //If the status is offline
    fontIcon.classList = "ri-wifi-off-line";
    h2El.innerText = "Lost Internet Connection";
    paragragh.innerHTML = `Your network is unavailable. Try checking your network connection in <b>10</b> Seconds`;
    popup.className = "popup show";

    intervalid = setInterval(() => {
        timer--;
        if (timer === 0) checkConnection();

        popup.querySelector("p b").innerText = timer;
    }, 1000);
}
// Only if online status is true, check the connection status every 2 seconds
setInterval(() => isOnline && checkConnection(), 3000);
btn.addEventListener("click", checkConnection)