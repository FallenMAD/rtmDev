import {
    sortingEl,
    sortingBtnRelevantEl,
    sortingBtnRecentEl,
    state,
} from "../common.js";
import { renderList } from "./JobList.js";
import { renderPaginationButtons } from "./Pagination.js";

sortingEl.addEventListener('click', (e) => {
    const clickedButton = e.target.closest(".sorting__button");

    if (!clickedButton) return;

    state.currentPage = 1;

    const recent = clickedButton.classList.contains("sorting__button--recent");

    // Підказка від Chap.gpt
    // sortingBtnRelevantEl.classList.toggle("sorting__button--active", !recent);
    // sortingBtnRecentEl.classList.toggle("sorting__button--active", recent);

    if (recent) {
        sortingBtnRelevantEl.classList.remove("sorting__button--active");
        sortingBtnRecentEl.classList.add("sorting__button--active");
    } else {
        sortingBtnRecentEl.classList.remove("sorting__button--active");
        sortingBtnRelevantEl.classList.add("sorting__button--active");
    }

    if (recent) {
        state.searchJobItems.sort((a, b) => {
            return a.daysAgo - b.daysAgo;
        });
    } else {
        state.searchJobItems.sort((a, b) => {
            return b.relevanceScore - a.relevanceScore;
        })
    }

    renderPaginationButtons();

    renderList();
})