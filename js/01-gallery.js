import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

// Рендер галереї
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onGalleryPictureClick);

// Створення розмітки галереї
function createGalleryMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
    
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>

`;
    })
    .join("");
}

// Створення розмітки модального вікна при кліку на превью
function onGalleryPictureClick(event) {
  if (event.target === event.currentTarget) {
    return;
  }
  event.preventDefault();

  const originalPictureLink = event.target.dataset.source;
  const pictureDescription = event.target.getAttribute("alt");
  const pictureModalWindow = basicLightbox.create(`
  <div class="modal">
        <img src="${originalPictureLink}" alt="${pictureDescription}" width="1280" height="720"></img>
    </div>
  `);

  pictureModalWindow.show();

  //Закриття модалки по натисканню на Esc
  const onEscapePress = (event) => {
    if (event.code === "Escape") {
      pictureModalWindow.close();
      window.removeEventListener("keydown", onEscapePress);
    }
  };
  if (pictureModalWindow) {
    window.addEventListener("keydown", onEscapePress);
  }
}
