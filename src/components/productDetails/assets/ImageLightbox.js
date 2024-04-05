import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import the default styles

const ImageLightbox = ({ product_images }) => {
  if (!Array.isArray(product_images)) {
    return null; // Or display a message indicating no images available
  }

  const images =
    product_images &&
    product_images.map((image) => ({
      original: `http://localhost:8000/${image.path}?w=1000?h=1000`, // Use the path property as the 'original' image URL
      thumbnail: `http://localhost:8000/${image.path}`, // You can also use the same URL for thumbnails
      // description: image.originalname, // Use originalname as description
    }));
  return <>{images.length > 0 && <ImageGallery items={images} />}</>;
};

export default ImageLightbox;
