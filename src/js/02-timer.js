import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMinutes = document.querySelector('.value[data-minutes]');
const timerSeconds = document.querySelector('.value[data-seconds]');

startBtn.disabled = true;
let targetTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);      
      if (selectedDates[0] <= new Date()) {
          startBtn.disabled = true;
          Notify.failure("Please choose a date in the future");          
      } else {
          startBtn.disabled = false;
          targetTime = selectedDates[0];          
      }
  },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    startBtn.disabled = true;
    const intervalId = setInterval(() => {
        const currentTime = new Date();
        const deltaTime = targetTime - currentTime;
        // console.log(deltaTime);
        if (deltaTime <= 0) {
            clearInterval(intervalId);
            return;
        }
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        // console.log(`${days}: ${hours}: ${minutes}: ${seconds}`);

        const formatTimeDays = addLeadingZero(days);
        const formatTimeHours = addLeadingZero(hours);
        const formatTimeMinutes = addLeadingZero(minutes);
        const formatTimeSeconds = addLeadingZero(seconds);

        timerDays.textContent = formatTimeDays;
        timerHours.textContent = formatTimeHours;
        timerMinutes.textContent = formatTimeMinutes;
        timerSeconds.textContent = formatTimeSeconds;
    }, 1000);    
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}