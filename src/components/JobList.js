import {
    jobDetailsContentEl,
    spinnerJobDetailsEl,
    jobListSearchEl,
    BASE_URL,
    getData,
    state,
    RESULTS_PER_PAGE, jobListBookmarksEl,
} from '../common.js';
import { renderSpinner } from "./Spinner.js";
import { renderJobDetails } from './JobDetails.js';
import { renderError } from "./Error.js";

// function renderItem (item) {
//     const render = `
//         <li class="job-item ${state.activeJobItem.id === item.id && 'job-item--active'}">
//             <a class="job-item__link" href="${item.id}">
//                 <div class="job-item__badge">${item.badgeLetters}</div>
//                 <div class="job-item__middle">
//                     <h3 class="third-heading">${item.title}</h3>
//                     <p class="job-item__company">${item.company}</p>
//                     <div class="job-item__extras">
//                         <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${item.duration}</p>
//                         <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${item.salary}</p>
//                         <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${item.location}</p>
//                     </div>
//                 </div>
//                 <div class="job-item__right">
//                     <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
//                     <time class="job-item__time">${item.daysAgo}d</time>
//                 </div>
//             </a>
//         </li>
//     `
//
//     jobListSearchEl.insertAdjacentHTML('beforeend', render);
// }

export function renderList (whichJobList = 'search') {
    const jobList = whichJobList === 'search' ? jobListSearchEl : jobListBookmarksEl;
    const items = whichJobList === 'search'
        ? state.searchJobItems.slice(state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE , state.currentPage * RESULTS_PER_PAGE)
        : state.bookmarksJobItems;
    // ми прибираємо елементи коли дані обновилися і ми починаємо рендерити новий список
    jobList.innerHTML = '';

    items.forEach(item => {
        const render = `
        <li class="job-item ${state.activeJobItem.id === item.id && 'job-item--active'}">
            <a class="job-item__link" href="${item.id}">
                <div class="job-item__badge">${item.badgeLetters}</div>
                <div class="job-item__middle">
                    <h3 class="third-heading">${item.title}</h3>
                    <p class="job-item__company">${item.company}</p>
                    <div class="job-item__extras">
                        <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${item.duration}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${item.salary}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${item.location}</p>
                    </div>
                </div>
                <div class="job-item__right">
                    <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarksJobItems.some(bookItem => bookItem.id === item.id) && 'job-item__bookmark-icon--bookmarked'}"></i>
                    <time class="job-item__time">${item.daysAgo}d</time>
                </div>
            </a>
        </li>
    `
        jobList.insertAdjacentHTML('beforeend', render);
    })
}

const openJobDetails = async (event) => {
    event.preventDefault();

    const target = event.target.closest('.job-item');

    // тут в нас йде  перевірка якщо ітем існує то він видалить клас, якщо ні то нічого не станеться
    //також це можна зробити через if
    // document.querySelector('.job-item--active') && document.querySelector('.job-item--active').classList.remove('job-item--active');
    // тут йде те саме
    // document.querySelector('.job-item--active')?.classList.remove('job-item--active');
    document.querySelectorAll('.job-item--active').forEach(item => item.classList.remove('job-item--active'));

    jobDetailsContentEl.innerHTML = '';
    // spinnerJobDetailsEl.classList.add('spinner--visible');
    renderSpinner(spinnerJobDetailsEl);

    const id = target.querySelector('.job-item__link').getAttribute('href');

    const allJobItems = [...state.searchJobItems, ...state.bookmarksJobItems]
    state.activeJobItem = allJobItems.find(item => item.id === +id);

    renderList();

    // add id to url
    history.pushState(null, '', `/#${id}`);

    try {
       const { jobItem } = await getData(`${BASE_URL}/jobs/${id}`);

       renderJobDetails(jobItem);
    } catch (err) {
        renderError(err.message)
    } finally {
        renderSpinner(spinnerJobDetailsEl)
    }

    // fetch(`${BASE_URL}/jobs/${id}`)
    //     .then(res => {
    //         if (!res.ok) {
    //             throw new Error('Failed to fetch search results.');
    //         }
    //
    //         return res.json();
    //     })
    //     .then(data => renderJobDetails(data.jobItem))
    //     .catch(err => renderError(err.message))
    //     .finally(() => renderSpinner(spinnerJobDetailsEl));

}

jobListSearchEl.addEventListener('click', openJobDetails);
jobListBookmarksEl.addEventListener('click', openJobDetails);