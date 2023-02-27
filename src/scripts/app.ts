///////////////////////////////////////////////////////////// GLOBAL VARIABLES /////////////////////////////////////////////////////////////
const header = document.getElementById('header') as HTMLDivElement;
const footer = document.getElementById('footer') as HTMLDivElement;
const mainMenuSection = document.getElementById('main-menu-section') as HTMLDivElement;
const displayCardsSection = document.getElementById('display-cards-section') as HTMLDivElement;
const addCardSection = document.getElementById('add-card-section') as HTMLDivElement;
const deleteCardsSection = document.getElementById('delete-cards-section') as HTMLDivElement;
const modifyCardsSection = document.getElementById('modify-cards-section') as HTMLDivElement;
const modifyCardsSection2 = document.getElementById('modify-card-section') as HTMLDivElement;
const navAddCardBtn = document.getElementById('nav-add-card-btn') as HTMLElement;
const navStartPracticingBtn = document.getElementById('nav-start-practicing-btn') as HTMLElement;
const navDeleteCardsBtn = document.getElementById('nav-delete-card-btn') as HTMLElement;
const navModifyCardsBtn = document.getElementById('nav-modify-card-btn') as HTMLElement;
const backMainPageBtn = document.getElementById('back-main-page-btn') as HTMLElement;

const addCardForm = document.getElementById('add-card-form') as HTMLFormElement;
const addCardQuestionInput = document.getElementById('add-card-question-input') as HTMLInputElement;
const addCardAnswerInput = document.getElementById('add-card-answer-input') as HTMLTextAreaElement;
const chooseCategorySelect = document.getElementById('choose-category-select') as HTMLSelectElement;
const addNewCategoryInput = document.getElementById('add-new-category-input') as HTMLInputElement;
const addNewCategoryBtn = document.getElementById('add-new-category-btn') as HTMLButtonElement;
const confirmAddCardBtn = document.getElementById('confirm-add-card-btn') as HTMLButtonElement;

const modifyCardsList = document.getElementById('modify-cards-list') as HTMLDivElement;
const modifyCardQuestionInput = document.getElementById('modify-card-question-input') as HTMLInputElement;
const modifyCardAnswerInput = document.getElementById('modify-card-answer-input') as HTMLTextAreaElement;
const modifyCardCategorySelect = document.getElementById('modify-choose-category-select') as HTMLSelectElement;
const modifyCardNewCategoryInput = document.getElementById('modify-new-category-input') as HTMLInputElement;
const modifyCardNewCategoryBtn = document.getElementById('modify-new-category-btn') as HTMLButtonElement;
const modifyCardConfirmBtn = document.getElementById('confirm-modify-card-btn') as HTMLButtonElement;

const deleteCardsList = document.getElementById('delete-cards-list') as HTMLDivElement;
const deleteCardConfirmationModal = document.getElementById('delete-card-confirmation') as HTMLDivElement;
const deleteCardModalQuestion = document.getElementById('delete-card-question') as HTMLParagraphElement;
const deleteCardModalYesBtn = document.getElementById('delete-card-confirmation__yes-btn') as HTMLButtonElement;
const deleteCardModalNoBtn = document.getElementById('delete-card-confirmation__no-btn') as HTMLButtonElement;
const overlay = document.getElementById('overlay') as HTMLDivElement;

const displayCardsContainer = document.getElementById('display-cards-container') as HTMLDivElement;
const prevCardBtn = document.getElementById('prev-card') as HTMLButtonElement;
const nextCardBtn = document.getElementById('next-card') as HTMLButtonElement;
const currentCardIndexSpan = document.getElementById('current-card') as HTMLSpanElement;
const totalCardsNumber = document.getElementById('total-cards') as HTMLSpanElement;

const errorModal = document.getElementById('modal-with-errors') as HTMLDivElement;
const errorModalMessage = document.getElementById('modal-with-errors-text') as HTMLDivElement;
const errorModalBtn = document.getElementById('modal-with-errors-btn') as HTMLButtonElement;

///////////////////////////////////////////////////////////// CARD CLASS /////////////////////////////////////////////////////////////
class Card {
    question: string;
    answer: string;
    category: string;

    constructor(question: string, answer: string, category: string) {
        this.question = question;
        this.answer = answer;
        this.category = category;
    }

    setQuestion(question: string) {
        this.question = question;
    }

    setAnswer(answer: string) {
        this.answer = answer;
    }

    setCategory(category: string) {
        this.category = category;
    }

    createCardHTMLElement() {
        return `<div class="card">
                    <div class="card__wrapper">
                        <div class="card__front is-active">
                            <p class="card__front-text">${this.question}</p>
                            <i class="fa-solid fa-rotate card__icon"></i>
                        </div>
                        <div class="card__back">
                            <p class="card__back-text">${this.answer}</p>
                            <i class="fa-solid fa-rotate card__icon"></i>
                        </div>
                    </div> 
                </div>`
    }

    createCardRightHTMLElement() {
        return `<div class="card card--right">
                    <div class="card__wrapper">
                        <div class="card__front is-active">
                            <p class="card__front-text">${this.question}</p>
                            <i class="fa-solid fa-rotate card__icon"></i>
                        </div>
                        <div class="card__back">
                            <p class="card__back-text">${this.answer}</p>
                            <i class="fa-solid fa-rotate card__icon"></i>
                        </div>
                    </div>
                </div>`
    }
}

///////////////////////////////////////////////////////////// INITIALIZE /////////////////////////////////////////////////////////////
let allCards: Card[] = getAllCardsFromLocalStorage();
let allCardsElement: string[] = createCardsHTMLElementsArray(allCards, '');
let categories: string[] = getCategoriesFromLocalStorage();
let currentCardIndex = 0;
let cardQuestionToModify = ''; 
let cardQuestionToDelete: string = '';
addCategoriesToSelectElement(chooseCategorySelect);
updateView();

function updateView() {
    updateCounter();
    addCardsToDOM(createCardsHTMLElementsArray(allCards, ''));
    addEventListenerToAllCards();
    displayCardsToModify(allCards);
    displayCardsToDelete(allCards);
    clearForm();
}

////////////////////////////////////////////////////////// NAVIGATION ////////////////////////////////////////////////////////////////

function moveSectionToRight(section: HTMLDivElement) {
    section.classList.add('hidden-section-right');
}

function moveSectionToCenter(section: HTMLDivElement) {
    section.classList.remove('hidden-section-right');
    section.classList.remove('hidden-section-left');
}

function moveSectionToLeft(section: HTMLDivElement) {
    section.classList.add('hidden-section-left');
}

function displayMainMenu() {
    moveSectionToCenter(mainMenuSection);
    moveSectionToRight(addCardSection);
    moveSectionToRight(displayCardsSection);
    moveSectionToRight(deleteCardsSection);
    moveSectionToRight(modifyCardsSection);
    backMainPageBtn.classList.add('hidden');
}

function displaySection(section: HTMLDivElement) {
    if (section.classList.contains('display-cards-section')) {

    }
    moveSectionToLeft(mainMenuSection);
    moveSectionToCenter(section);
    backMainPageBtn.classList.remove('hidden');
}

navAddCardBtn.addEventListener('click', () => displaySection(addCardSection));

navStartPracticingBtn.addEventListener('click', () => displaySection(displayCardsSection));

navDeleteCardsBtn.addEventListener('click', () => displaySection(deleteCardsSection));

navModifyCardsBtn.addEventListener('click', () => displaySection(modifyCardsSection));

backMainPageBtn.addEventListener('click', ()=> {
    if (!modifyCardsSection2.classList.contains('hidden-section-right')) {
        moveSectionToRight(modifyCardsSection2);
        moveSectionToCenter(modifyCardsSection);
    }
    else {
        displayMainMenu();
    }
});

///////////////////////////////////////////////////////////// ADD NEW CARD /////////////////////////////////////////////////////////////
function validateCardData(question: string, answer: string): boolean {
    if (question === '' || answer === '') {
        return false;
    };
    return true;
}

function checkIfQuestionExists(question: string): boolean {
    let questionExists = false;
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].question.toLowerCase() === question.toLowerCase()) {
            questionExists = true;
            break;
        }
    }
    return questionExists;
}

function addNewCategoryToLocalStorage(newCategory: string) {
    if (newCategory !== '' && !categories.includes(newCategory)) {
        categories.push(newCategory);
        localStorage.setItem('Memory-Cards-Categories', JSON.stringify(categories));
    }
}

function getCategoriesFromLocalStorage() {
    const allCategories = localStorage.getItem('Memory-Cards-Categories') ? JSON.parse(localStorage.getItem('Memory-Cards-Categories') as string) : [];
    return allCategories;
}

function addCategoriesToSelectElement(select: HTMLSelectElement) {
    select.innerHTML = '<option value="">Choose category</option>';
    categories.forEach(category => {
        select.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

function clearInput(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
    input.value = '';
}

addNewCategoryBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let newCategory = addNewCategoryInput.value;
    addNewCategoryToLocalStorage(newCategory);
    categories = getCategoriesFromLocalStorage();
    addCategoriesToSelectElement(chooseCategorySelect);
    clearInput(addNewCategoryInput);
    chooseCategorySelect.value = newCategory;
});

function getAllCardsFromLocalStorage() {
    let dataFromLocalStorage = localStorage.getItem('Memory-Cards-Cards') ? JSON.parse(localStorage.getItem('Memory-Cards-Cards') as string) : [];
    let cards: Card[] = [];
    dataFromLocalStorage.forEach((card: Card) => {
        cards.push(new Card(card.question, card.answer, card.category));
    });
    return cards;
}

function addCardToLocalStorage(question: string, answer: string, category: string) {    
    let newCard = new Card(question, answer, category);
    allCards.push(newCard);
    localStorage.setItem('Memory-Cards-Cards', JSON.stringify(allCards));
}

function clearForm() {
    clearInput(addCardQuestionInput);
    clearInput(addCardAnswerInput);
    clearInput(chooseCategorySelect); 
}

confirmAddCardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let question = addCardQuestionInput.value;
    let answer = addCardAnswerInput.value;
    let category = chooseCategorySelect.value;
    if (checkIfQuestionExists(question)) {
        openErrorModal('This question already exists');
    } 
    else if (!validateCardData(question, answer)) {
        openErrorModal('Please fill in all fields');
    }
    else {
        addCardToLocalStorage(question, answer, category);
        updateView();
        openErrorModal('Card added successfully');
    }
});

///////////////////////////////////////////////////////////// MODIFY CARDS /////////////////////////////////////////////////////////////
function displayCardsToModify(cards: Card[]) {
    modifyCardsList.innerHTML = '';
    if (cards.length === 0) {
        modifyCardsList.innerHTML = '<p class="section__paragraph">No cards to modify</p>'
    }
    else {
        cards.forEach(card => {
            modifyCardsList.innerHTML += `<div class="modify-card-section__card">
                        <p class="modify-card-section__card-question">${card.question}</p>
                        <button class="modify-card-section__card-button"><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>`
        });
    }
}

function getCardAnswerByQuestion(question: string) : string{
    let answer = '';
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].question === question) {
            answer = allCards[i].answer;
            break;
        }
    }
    return answer;
}

function getCardCategoryByQuestion(question: string) : string {
    let category = '';
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].question === question) {
            category = allCards[i].category;
            break;
        }
    }
    return category;
}

function changeCardData(question: string, answer: string, category: string) {
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].question === cardQuestionToModify) {
            allCards[i].question = question;
            allCards[i].answer = answer;
            allCards[i].category = category;
            break;
        }
    }
    localStorage.setItem('Memory-Cards-Cards', JSON.stringify(allCards));
}

function displayModifyCardForm(question: string, answer: string, category: string) {
    modifyCardCategorySelect.innerHTML = '<option value="">Choose category</option>';
    categories.forEach(category => {
        modifyCardCategorySelect.innerHTML += `<option value="${category}">${category}</option>`;
    });

    modifyCardQuestionInput.value = question;
    modifyCardAnswerInput.value = answer;
    modifyCardCategorySelect.value = category;
    moveSectionToCenter(modifyCardsSection2);
    moveSectionToLeft(modifyCardsSection);
}

modifyCardsList.addEventListener('click', (e) => {
    if (e.target !== null) {
        if (e.target !== modifyCardsList) {
            let clickedElement = e.target as HTMLElement;
            let cardToModify = clickedElement.closest('.modify-card-section__card') as HTMLDivElement;
            let question = cardToModify.querySelector('.modify-card-section__card-question')?.textContent!;
            let answer = getCardAnswerByQuestion(question);
            let category = getCardCategoryByQuestion(question);
            cardQuestionToModify = question;
            displayModifyCardForm(question, answer, category);
        }
    }
});

modifyCardConfirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let question = modifyCardQuestionInput.value;
    let answer = modifyCardAnswerInput.value;
    let category = modifyCardCategorySelect.value === 'Choose category' ? '' : modifyCardCategorySelect.value;

    if (!validateCardData(question, answer)) {
        openErrorModal('Please fill in all fields');
    }
    else {
        changeCardData(question, answer, category);
        updateView();
        openErrorModal('Card modified successfully');
        moveSectionToCenter(modifyCardsSection);
        moveSectionToCenter(modifyCardsSection2);
    }
});

modifyCardNewCategoryBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let newCategory = modifyCardNewCategoryInput.value;
    addNewCategoryToLocalStorage(newCategory);
    categories = getCategoriesFromLocalStorage();
    addCategoriesToSelectElement(modifyCardCategorySelect);
    addCategoriesToSelectElement(chooseCategorySelect);
    clearInput(modifyCardNewCategoryInput);
    modifyCardCategorySelect.value = newCategory;
});


///////////////////////////////////////////////////////////// DELETE CARDS /////////////////////////////////////////////////////////////
function displayCardsToDelete(cards: Card[]) {
    if (cards.length === 0) {
        deleteCardsList.innerHTML = '<p class="section__paragraph">No cards to delete</p>'
    }
    else {
        deleteCardsList.innerHTML = '';
        cards.forEach(card => {
            deleteCardsList.innerHTML +=   `<div class="delete-card-section__card">
                                                <p class="delete-card-section__card-question">${card.question}</p>
                                                <button class="delete-card-section__card-button"><i class="fa-solid fa-trash"></i></button>
                                            </div>`
        });
    }
}

deleteCardsList.addEventListener('click', (e) => {
    if (e.target !== null) {
        if (e.target !== deleteCardsList) {
            let clickedElement = e.target as HTMLElement;
            let parent = clickedElement.closest('.delete-card-section__card') as HTMLElement;
            let title = parent.querySelector('.delete-card-section__card-question')?.textContent;
            if (title !== null && title !== undefined) {
                cardQuestionToDelete = title;
                showDeleteCardConfirmationModal(cardQuestionToDelete);
            }
       }
    }
});

function addBlurToElement(element: HTMLElement) {
    element.classList.add('blurred');
}

function removeBlurFromElement(element: HTMLElement) {
    element.classList.remove('blurred');
}

function showDeleteCardConfirmationModal(question: string) {
    deleteCardModalQuestion.textContent = question;
    deleteCardConfirmationModal.classList.remove('delete-card-confirmation__hidden');
    overlay.classList.remove('overlay-hidden');
    addBlurToElement(deleteCardsSection);
    addBlurToElement(header);
    addBlurToElement(footer);
}

function closeDeleteCardConfirmationModal() {
    deleteCardConfirmationModal.classList.add('delete-card-confirmation__hidden');
    overlay.classList.add('overlay-hidden');
    removeBlurFromElement(deleteCardsSection);
    removeBlurFromElement(header);
    removeBlurFromElement(footer);
}

function deleteCardFromLocalStorage(question: string) {
    allCards = allCards.filter(card => card.question !== question);
    localStorage.setItem('Memory-Cards-Cards', JSON.stringify(allCards));
}

deleteCardModalYesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deleteCardFromLocalStorage(cardQuestionToDelete);
    closeDeleteCardConfirmationModal();
    displayCardsToDelete(allCards);
    displayCardsToModify(allCards);
    addCardsToDOM(createCardsHTMLElementsArray(allCards, ''));
    addEventListenerToAllCards();   
    updateCounter();
});

deleteCardModalNoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeDeleteCardConfirmationModal();
});


///////////////////////////////////////////////////////////// ERROR MODAL /////////////////////////////////////////////////////////////
function openErrorModal(message: string) {
    errorModalMessage.textContent = message;
    errorModal.classList.remove('error-modal-hidden');
    overlay.classList.remove('overlay-hidden');
}

function closeErrorModal() {
    errorModalMessage.textContent = ""
    errorModal.classList.add('error-modal-hidden');
    overlay.classList.add('overlay-hidden');
}

errorModalBtn.addEventListener('click', () => {
    closeErrorModal();
}) ;


///////////////////////////////////////////////////////////// DISPLAY CARDS /////////////////////////////////////////////////////////////
function createCardsHTMLElementsArray(cards: Card[], category: string) {
    let cardsMarkupArray: string[] = [];
    let cardsCopy = [...cards];
    if (category !== '') {
        cardsCopy = cards.filter(card => card.category === category);
    }
    
    cardsCopy.forEach((card, index) => {
        if (index === 0) {
            cardsMarkupArray.push(card.createCardHTMLElement());
        }
        else {
             cardsMarkupArray.push(card.createCardRightHTMLElement());
        }
    });
    return cardsMarkupArray;
}

function addCardsToDOM(cards: string[]) {
    if (cards.length === 0) {
        displayCardsContainer.innerHTML = '<p class="section__paragraph">No cards to display</p>';
        currentCardIndexSpan.textContent = '0';
    }
    else {
        currentCardIndex = 0;
        displayCardsContainer.innerHTML = '';
        cards.forEach(card => {
            displayCardsContainer.innerHTML += card;        
        });
    }

}

function addEventListenerToAllCards() {
    let cards = displayCardsContainer.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            let clickedElement = e.target as HTMLElement;
            let parent = clickedElement.closest('.card') as HTMLElement;
            parent.classList.toggle('is-flipped');
        });
    });
}

function displayNextCard() {
    if (currentCardIndex !== allCards.length - 1) {
        let Cards = displayCardsContainer.querySelectorAll('.card');
        Cards[currentCardIndex].classList.add('card--left');
        Cards[currentCardIndex+1].classList.remove('card--right');
        currentCardIndex++;
    }
}

function displayPrevCard() {
    if (currentCardIndex !== 0) {
        let Cards = displayCardsContainer.querySelectorAll('.card');
        Cards[currentCardIndex].classList.add('card--right');
        Cards[currentCardIndex-1].classList.remove('card--left');
        currentCardIndex--;
    }
}

function updateCounter() {
    currentCardIndexSpan.textContent = (currentCardIndex + 1).toString();
    totalCardsNumber.textContent = allCards.length.toString();
}


nextCardBtn.addEventListener('click', () => {
    displayNextCard();
    updateCounter();
});

prevCardBtn.addEventListener('click', () => {
    displayPrevCard();
    updateCounter();
});