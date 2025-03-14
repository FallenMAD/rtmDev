// Constants
export const BASE_URL = 'https://bytegrad.com/course-assets/js/2/api';
export const timeout = 3500;
export const RESULTS_PER_PAGE = 7;

// State
export const state = {
    searchJobItems: [],
    bookmarksJobItems: JSON.parse(localStorage.getItem("bookmarks")) || [],
    currentPage: 1,
    activeJobItem: {},
}

// Selectors
export const bookmarksBtnEl = document.querySelector('.bookmarks-btn');
export const errorEl = document.querySelector('.error');
export const errorTextEl = document.querySelector('.error__text');
export const jobDetailsEl = document.querySelector('.job-details');
export const jobDetailsContentEl = document.querySelector(".job-details__content");
export const jobListBookmarksEl = document.querySelector('.job-list--bookmarks');
export const jobListSearchEl = document.querySelector(".job-list--search");
export const numberEl = document.querySelector(".count__number");
export const paginationEl = document.querySelector(".pagination");
export const paginationBtnNextEl = document.querySelector(".pagination__button--next");
export const paginationBtnBackEl = document.querySelector(".pagination__button--back");
export const paginationNumberNextEl = document.querySelector(".pagination__number--next");
export const paginationNumberBackEl = document.querySelector(".pagination__number--back");
export const searchFormEl = document.querySelector(".search");
export const searchInputEl = document.querySelector(".search__input");
export const sortingEl = document.querySelector(".sorting");
export const sortingBtnRelevantEl = document.querySelector(".sorting__button--relevant");
export const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
export const spinnerSearchEl = document.querySelector(".spinner--search");
export const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");

// Utility Fn
export const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch search results.');
    }

    return data;
}