import React, { useCallback, useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss"


// const images = [
//     {
//       original: "https://picsum.photos/id/1018/1000/600/",
//       thumbnail: "https://picsum.photos/id/1018/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1015/1000/600/",
//       thumbnail: "https://picsum.photos/id/1015/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1019/1000/600/",
//       thumbnail: "https://picsum.photos/id/1019/250/150/",
//     },
//   ];
 function VideoItem({video}){
 
  return (
   <video src={video} width="100%" height="100%" controls autoPlay></video>
 
 
  )
}
export default function Carousel({images, video, poster}) {

    const [imgs, setImgs] = useState([])

    useEffect(()=> {
       
        const imgObj = images.map((obj)=>{
                return {
                    original: obj.src,
                    thumbnail: obj.src 
                } 
            })
          

            // eslint-disable-next-line no-lone-blocks
            {video ? (setImgs([...imgObj, {
              original: "",
              thumbnail: poster ,
              //renderItem: () => {<video src={video} width="100%" height="100%" controls autoPlay></video>},
              renderItem: () => <VideoItem video={video} />,
             // renderThumbInner: () => <VideoItem />,
             }])) : (setImgs(imgObj)) }

            

    }, [video, images])
  return (
    <>
    <ImageGallery 
    showBullets={true}
    infinite={false}
    disableThumbnailSwipe={false}
    disableSwipe={false}
    useBrowserFullscreen={false}
    thumbnailPosition="left" 
    showPlayButton={false}
    slideOnThumbnailOver={false}
    items={imgs} />
    </>
  )
}