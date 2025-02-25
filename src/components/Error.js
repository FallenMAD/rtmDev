import {
    errorEl,
    errorTextEl,
    timeout
} from "../common.js";

export const renderError = (message = 'Something went wrong') => {
     console.log('message from Error', message)
     errorTextEl.textContent = message;
     errorEl.classList.add('error--visible');
     setTimeout(() => {
         errorEl.classList.remove('error--visible');
     }, timeout);
 }