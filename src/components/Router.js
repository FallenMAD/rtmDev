import {
    BASE_URL,
    getData,
    state,
    jobDetailsContentEl, spinnerJobDetailsEl,
} from '../common.js'
import { renderJobDetails } from "./JobDetails.js";
import { renderError } from "./Error.js";
import { renderSpinner } from "./Spinner.js";
import { renderList } from "./JobList.js";

 const loadHandler = async () => {
     const id = window.location.hash.substring(1);

     if (id) {
         document.querySelectorAll('.job-item--active').forEach(item => item.classList.remove('job-item--active'));

         jobDetailsContentEl.innerHTML = '';

         renderSpinner(spinnerJobDetailsEl)

         try {
             const { jobItem } = await getData(`${BASE_URL}/jobs/${id}`);

             state.activeJobItem = jobItem;

             renderJobDetails(jobItem);
             renderList();
         } catch (err) {
             renderError(err.message)
         } finally {
             renderSpinner(spinnerJobDetailsEl);
         }
     }
 }

window.addEventListener('DOMContentLoaded', loadHandler);
window.addEventListener('hashchange', loadHandler);