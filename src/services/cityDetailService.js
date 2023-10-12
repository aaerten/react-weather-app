import defaultImage from "../assets/images/defaultImage.png";

const getCityDetail = async (cityName) => {
  const url = new URL(
    "https://api.teleport.org/api/urban_areas/slug:" +
      cityName.toLowerCase() +
      "/images/"
  );
  return fetch(url)
    .then((res) => res.json())
    .catch((e) => {
      return { photos: [{ image: { mobile: defaultImage } }] };
    });
};

export default getCityDetail;
