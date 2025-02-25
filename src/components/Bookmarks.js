import {bookmarksBtnEl, state, jobDetailsEl, jobListBookmarksEl} from "../common.js";
import {renderList} from "./JobList.js";

jobDetailsEl.addEventListener("click", (e) => {
    if(!e.target.closest('.job-info__bookmark-btn')) {
        return;
    }

    if (state.bookmarksJobItems.some(job => job.id === state.activeJobItem.id)) {
        state.bookmarksJobItems = state.bookmarksJobItems.filter(job => job.id !== state.activeJobItem.id);
    } else {
        state.bookmarksJobItems.push(state.activeJobItem);
    }

    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarksJobItems));

    document.querySelector('.job-info__bookmark-icon').classList.toggle('job-info__bookmark-icon--bookmarked');

    renderList();
})

bookmarksBtnEl.addEventListener("mouseenter", (e) => {
    bookmarksBtnEl.classList.add('bookmarks-btn--active');
    jobListBookmarksEl.classList.add('job-list--visible');
    console.log('clicked')
    renderList('bookmarks');
});

jobListBookmarksEl.addEventListener("mouseleave", () => {
    bookmarksBtnEl.classList.remove('bookmarks-btn--active');
    jobListBookmarksEl.classList.remove('job-list--visible');
});