import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Refs = {
  form: document.querySelector('.form'),
  submitBtn: document.getElementsByTagName('button')
}

Refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const formElems = evt.currentTarget.elements;

  let delay = Number(formElems.delay.value);
  const step = Number(formElems.step.value);
  const amount = Number(formElems.amount.value);  
  
    for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;    
  }
}

function createPromise(position, delay) {
  
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
        };
      }, delay);
    });
};
