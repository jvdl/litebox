import { useEffect } from "react";
import { litebox } from "../litebox";

const Basic = () => {

  useEffect(() => {
    console.log("Initializing gallery-1");
    const lb = litebox(".gallery-1", { imageSource: "a" });
    return () => {
      lb.destroy();
    }
  });

  return (
    <div className="example-gallery gallery-1">
      <h3>An example gallery using link href for large images</h3>
      <ul>
        <li><a href="https://picsum.photos/id/1010/1500/1000"><img src="https://picsum.photos/id/1010/150/100" alt="Image 1" /></a></li>
        <li><a href="https://picsum.photos/id/1011/1500/1000"><img src="https://picsum.photos/id/1011/150/100" alt="Image 2" /></a></li>
        <li><a href="https://picsum.photos/id/1012/1500/1000"><img src="https://picsum.photos/id/1012/150/100" alt="Image 3" /></a></li>
        <li><a href="https://picsum.photos/id/1023/1500/1000"><img src="https://picsum.photos/id/1023/150/100" alt="Image 4" /></a></li>
      </ul>
    </div>
  );
}

export default Basic;
