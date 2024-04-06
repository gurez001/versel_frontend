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

  const imagess = [
    {
      original: `/Bubble-wrap-Tape-and-bar-code-la (1).webp?w=1000?h=1000`, // Use the path property as the 'original' image URL
      thumbnail: `/Bubble-wrap-Tape-and-bar-code-la (1).webp`, // You can also use the same URL for thumbnails
    },
    {
      original: `/Beauty-Care.webp?w=1000?h=1000`, // Use the path property as the 'original' image URL
      thumbnail: `/Beauty-Care.webp`, // You can also use the same URL for thumbnails
    },
    {
      original: `/courrgated-box-2.webp?w=1000?h=1000`, // Use the path property as the 'original' image URL
      thumbnail: `/courrgated-box-2.webp`, // You can also use the same URL for thumbnails
    },
    {
      original: `/dogs-care.webp?w=1000?h=1000`, // Use the path property as the 'original' image URL
      thumbnail: `/dogs-care.webp`, // You can also use the same URL for thumbnails
    },
  ];

  return <>{ <ImageGallery items={images.length > 0?images:imagess} />}</>;
};

export default ImageLightbox;
