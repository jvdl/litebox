import { useEffect } from "react";
import { litebox } from "../litebox";

const Basic = () => {

  useEffect(() => {
    const lb = litebox(".gallery-1", { imageSource: "a" });
    return () => {
      lb.destroy();
    }
  });

  return (
    <div className="example-gallery gallery-1">

      <h3>Basic gallery</h3>
      <p>This gallery uses local images with larger sources via a containing link.</p>

      <ul>
        <li><a href="/images/0.jpg"><img src="images/0-small.jpg" alt="Image 0" /></a></li>
        <li><a href="/images/1.jpg"><img src="images/1-small.jpg" alt="Image 1" /></a></li>
        <li><a href="/images/2.jpg"><img src="images/2-small.jpg" alt="Image 2" /></a></li>
        <li><a href="/images/3.jpg"><img src="images/3-small.jpg" alt="Image 3" /></a></li>
        <li><a href="/images/4.jpg"><img src="images/4-small.jpg" alt="Image 4" /></a></li>
      </ul>
    </div>
  );
}

export default Basic;
