import {
    jobListSearchEl,
    searchInputEl,
    spinnerSearchEl,
    numberEl,
    searchFormEl,
    BASE_URL,
    jobDetailsContentEl,
    getData,
    state,
    sortingBtnRelevantEl,
    sortingBtnRecentEl
} from '../common.js';
import { renderError } from "./Error.js";
import { renderSpinner } from "./Spinner.js";
import { renderList } from "./JobList.js";
import {renderPaginationButtons} from "./Pagination.js";

const handleSubmit = async event => {
    event.preventDefault();

    const searchInput = searchInputEl.value;
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchInput);

    if (patternMatch) {
        renderError('Your search results do not match');
        return;
    }

    searchInputEl.blur();

    //тут ми прибираємо елементи перед викликом на сервер
    jobListSearchEl.innerHTML = '';
    jobDetailsContentEl.innerHTML = '';
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
    // state.searchJobItems = [];

    renderSpinner(spinnerSearchEl);

    try {
        const { jobItems } = await getData(`${BASE_URL}/jobs?search=${searchInput}`);

        numberEl.textContent = jobItems.length;

        state.searchJobItems = jobItems;
        state.currentPage = 1;
        renderPaginationButtons();

        return renderList();
    } catch (err) {
        renderError(err);
    } finally {
        renderSpinner(spinnerSearchEl);
    }
    // fetch(`${BASE_URL}/jobs?search=${searchInput}`)
    //     .then(res => {
    //         if (!res.ok) { // 4xx or 5xx всі помилки які стануться тут
    //             throw new Error('Failed to fetch search results.');
    //         }
    //
    //         return res.json();
    //     })
    //     .then(data => {
    //         const items = data.jobItems
    //
    //         numberEl.textContent = items.length
    //
    //         renderList(items);
    //     })
    //     .catch(err => renderError(err.message)) // автоматично переходять сюда
    //     .finally(() => renderSpinner(spinnerSearchEl));
}

searchFormEl.addEventListener('submit', handleSubmit);