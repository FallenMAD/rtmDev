import {jobDetailsContentEl, state} from "../common.js";

export function renderJobDetails(data) {
    const render = `
        <img 
            src="${data.coverImgURL}" 
            alt="#" 
            class="job-details__cover-img"
        >

        <a 
            class="apply-btn" 
            href="${data.companyURL}" 
            target="_blank">
                Apply 
                <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i>
         </a>

        <section class="job-info">
            <div class="job-info__left">
                <div class="job-info__badge">${data.badgeLetters}</div>
                <div class="job-info__below-badge">
                    <time class="job-info__time">${data.daysAgo}</time>
                    <button class="job-info__bookmark-btn">
                        <i class="fa-solid fa-bookmark job-info__bookmark-icon ${state.bookmarksJobItems.some(bookItem => bookItem.id === data.id) && 'job-info__bookmark-icon--bookmarked'}"></i>
                    </button>
                </div>
            </div>
            <div class="job-info__right">
                <h2 class="second-heading">${data.title}</h2>
                <p class="job-info__company">${data.company}d</p>
                <p class="job-info__description">${data.description}</p>
                <div class="job-info__extras">
                    <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i> ${data.duration}</p>
                    <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i> ${data.salary}</p>
                    <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i> ${data.location}</p>
                </div>
            </div>
        </section>

        <div class="job-details__other">
            <section class="qualifications">
                <div class="qualifications__left">
                    <h4 class="fourth-heading">Qualifications</h4>
                    <p class="qualifications__sub-text">Other qualifications may apply</p>
                </div>
                <ul class="qualifications__list">
                    ${data.qualifications.map(item => `<li class="qualifications__item">${item}</li>`).join('')}
                </ul>
            </section>

            <section class="reviews">
                <div class="reviews__left">
                    <h4 class="fourth-heading">Company reviews</h4>
                    <p class="reviews__sub-text">Recent things people are saying</p>
                </div>
                <ul class="reviews__list">
                    ${data.reviews.map(item => `<li class="reviews__item">${item}</li>`).join('')}
                </ul>
            </section>
        </div>

        <footer class="job-details__footer">
            <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
        </footer>
    `

    jobDetailsContentEl.innerHTML = render;
}