import { getRandomImages } from "./api.js";

const markup = async () => {
  const images = await getRandomImages();
  const template = images
    .map(({ webformatURL, likes, views, tags, downloads }) => {
      return `
      <li class="gallery-item">
          <div class="item-thumb">
            <img src="${webformatURL}" alt="${tags}" />
          </div>
          <div class="item-data">
            <p class="item-tags">${tags}</p>
            <div class="item-stats">
              <div class="item">
                <div class="icon-thumb">
                  <img class="icon" src="" alt="" />
                </div>
                <p class="stats">${likes}</p>
              </div>
              <div class="item">
                <div class="icon-thumb">
                  <img class="icon" src="" alt="" />
                </div>
                <p class="stats">${views}</p>
              </div>
              <div class="item">
                <div class="icon-thumb">
                  <img class="icon" src="" alt="" />
                </div>
                <p class="stats">${downloads}</p>
              </div>
            </div>
          </div>
        </li>
    `;
    })
    .join("");
  return template;
};

const gallery = document.querySelector(".gallery");
let galleryItems;

try {
  galleryItems = await markup();
} catch (error) {
  console.log(error);
}

gallery.insertAdjacentHTML("beforeend", galleryItems);
