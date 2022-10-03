const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "14467768-9171c4f16b15a9d8391496270";

export const getRandomImages = async () => {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=all&page=1&per_page=3&safesearch=true&orientation=horizontal&image_type=photo`
  );
  const { hits } = await response.json();
  return hits;
};
