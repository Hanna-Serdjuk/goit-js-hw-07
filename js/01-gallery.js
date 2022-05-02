// Задание 1 - галерея изображений
// Создай галерею с возможностью клика по её элементам и просмотра 
// полноразмерного изображения в модальном окне. 
// Посмотри демо видео работы галереи.

// Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

// 1. Создание и рендер разметки по массиву данных galleryItems и предоставленному 
// шаблону элемента галереи.
// 2. Реализация делегирования на div.gallery и получение url большого изображения.
// 3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. 
// 4. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// 5. Открытие модального окна по клику на элементе галереи. 
// Для этого ознакомься с документацией и примерами.
// Замена значения атрибута src элемента <img> в модальном окне перед открытием. 
// Используй готовую разметку модального окна с изображением из примеров 
// библиотеки basicLightbox.


import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const gallery = document.querySelector(".gallery");

const renderCard = crateGalleryCard(galleryItems);


function crateGalleryCard(galleryItems) {

    return galleryItems.map(({preview, original, description}) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>`
    }).join("");

}

function onImageClick(event) {
    event.preventDefault(); 
    const galleryCard = event.target.classList.contains('gallery__image');
    
    if (!galleryCard) {
        return;
    }

    const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">`,
    {onShow: (instance) => {document.addEventListener('keydown', closeInstance)}}, 
    {onClose: (instance) => {document.removeEventListener('keydown', closeInstance)}}
    );

    instance.show();

    function closeInstance(event) {
    if(event.key === "Escape"){
        instance.close();
    }
}
}

gallery.insertAdjacentHTML('beforeend',renderCard);

gallery.addEventListener('click', onImageClick);