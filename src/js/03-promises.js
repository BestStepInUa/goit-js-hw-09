import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Refs = {
  form: document.querySelector('.form'),
  amount: document.getElementsByName('amount'),
  delay: document.getElementsByName('delay'),
  step: document.getElementsByName('step'),
  submitBtn: document.getElementsByTagName('button')
}

Refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const formData = {
    delay: Number(Refs.delay.value),
    step: Number(Refs.step.value),
    amount: Number(Refs.amount.vaslue)    
  }

  let counter = formData.delay;

  for (let i = 1; i <= formData.amount; i++) {
    createPromise(i, counter)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    counter += formData.step;
    Refs.form.reset();
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
