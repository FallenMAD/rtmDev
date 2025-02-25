import {
    paginationEl,
    paginationBtnNextEl,
    paginationNumberNextEl,
    paginationNumberBackEl,
    paginationBtnBackEl,
    state,
    RESULTS_PER_PAGE
} from '../common.js';
import { renderList } from "./JobList.js";

export const renderPaginationButtons = () => {
    if (state.currentPage >= 2) {
        paginationBtnBackEl.classList.remove("pagination__button--hidden");
    } else {
        paginationBtnBackEl.classList.add("pagination__button--hidden");
    }

    paginationNumberNextEl.textContent = state.currentPage + 1;
    paginationNumberBackEl.textContent = state.currentPage - 1;

    if ((state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE) <= 0) {
        paginationBtnNextEl.classList.add("pagination__button--hidden");
    } else {
        paginationBtnNextEl.classList.remove("pagination__button--hidden");
    }
}

paginationEl.addEventListener("click", (e) => {
    const target = e.target.closest(".pagination__button");

    if (!target) return;

    const nextPage = target.classList.contains("pagination__button--next");

    nextPage ? state.currentPage++ : state.currentPage--;

    renderPaginationButtons();

    renderList();
})