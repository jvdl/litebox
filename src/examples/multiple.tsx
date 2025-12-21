import { useEffect } from "react";
import { litebox } from "../litebox";

const Multiple = () => {

  useEffect(() => {
    console.log("Initializing multiple-gallery");
    const lb1 = litebox(".multiple-gallery.gallery-1", { imageSource: "a" });
    const lb2 = litebox(".multiple-gallery.gallery-2", { imageSource: "a" });
    return () => {
      lb1.destroy();
      lb2.destroy();
    }
  });

  return (
    <>
      <div className="example-gallery multiple-gallery gallery-1">
        <h3>An example gallery using link href for large images</h3>
        <ul>
          <li><a href="https://picsum.photos/id/1020/1500/1000"><img src="https://picsum.photos/id/1020/150/100" alt="Image 1" /></a></li>
          <li><a href="https://picsum.photos/id/1011/1500/1000"><img src="https://picsum.photos/id/1011/150/100" alt="Image 2" /></a></li>
          <li><a href="https://picsum.photos/id/1012/1500/1000"><img src="https://picsum.photos/id/1012/150/100" alt="Image 3" /></a></li>
          <li><a href="https://picsum.photos/id/1023/1500/1000"><img src="https://picsum.photos/id/1023/150/100" alt="Image 4" /></a></li>
        </ul>
      </div>

      <div className="example-gallery multiple-gallery gallery-2">
        <h3>An example gallery using link href for large images</h3>
        <ul>
          <li><a href="https://picsum.photos/id/1015/1500/1000"><img src="https://picsum.photos/id/1015/150/100" alt="Image 5" /></a></li>
          <li><a href="https://picsum.photos/id/1016/1000/1500"><img src="https://picsum.photos/id/1016/100/150" alt="Image 6" /></a></li>
          <li><a href="https://picsum.photos/id/1037/1000/1500"><img src="https://picsum.photos/id/1037/100/150" alt="Image 7" /></a></li>
          <li><a href="https://picsum.photos/id/1028/1500/1000"><img src="https://picsum.photos/id/1028/150/100" alt="Image 8" /></a></li>
        </ul>
      </div>
    </>
  );
}

export default Multiple;
