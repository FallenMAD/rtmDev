export const renderSpinner = (htmlSelector) => {
    if (!htmlSelector) {
        console.log('Element not found');
        return;
    }

    htmlSelector.classList.toggle('spinner--visible');
}

// Також ми можемо створити ось таку фн
// import {
//     spinnerJobDetailsEl,
//     spinnerSearchEl,
// } from '../common.js'
// export const renderSpinner = (spinner) => {
//     const spinnerEl = spinner === 'search' ? spinnerSearchEl : spinnerSearchEl;
//     spinnerEl.classList.toggle('spinner--visible');
// }