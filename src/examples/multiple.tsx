import { useEffect } from "react";
import { litebox } from "../litebox";

const Multiple = () => {

  useEffect(() => {
    const lb1 = litebox(".multiple-gallery.gallery-1", { imageSource: "a" });
    const lb2 = litebox(".multiple-gallery.gallery-2");
    return () => {
      lb1.destroy();
      lb2.destroy();
    }
  });

  return (
    <>
      <h3>Multiple galleries</h3>
      <p>Separate galleries can co-exist on the same page.</p>

      <div className="example-gallery multiple-gallery gallery-1">
        <h4>Linked images</h4>
        <p>This gallery is composed of remote images. With large sources linked in a surrounding link.</p>
        <ul>
          <li><a href="https://picsum.photos/id/1020/1500/1000"><img src="https://picsum.photos/id/1020/150/100" alt="Image 1020" /></a></li>
          <li><a href="https://picsum.photos/id/1011/1500/1000"><img src="https://picsum.photos/id/1011/150/100" alt="Image 1011" /></a></li>
          <li><a href="https://picsum.photos/id/1012/1500/1000"><img src="https://picsum.photos/id/1012/150/100" alt="Image 1012" /></a></li>
          <li><a href="https://picsum.photos/id/1023/1500/1000"><img src="https://picsum.photos/id/1023/150/100" alt="Image 1023" /></a></li>
        </ul>
      </div>

      <div className="example-gallery multiple-gallery gallery-2">
        <h4>Plain images</h4>
        <p>This gallery uses local images with the large source used as the <code>src</code> for the image.</p>
        <p>The downside of this approach is that the images must be loaded upfront, however when the lightbox is shown there is no additional loading cost.</p>
        <ul>
          <li><img src="/images/0.jpg" alt="Image 0 - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident inventore delectus minus iure quia, error omnis iste porro voluptate saepe recusandae accusantium nisi commodi facere ipsum adipisci debitis? Fugit, magnam." /></li>
          <li><img src="/images/1.jpg" alt="Image 1 - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident inventore delectus minus iure quia, error omnis iste porro voluptate saepe recusandae accusantium nisi commodi facere ipsum adipisci debitis? Fugit, magnam." /></li>
          <li><img src="/images/2.jpg" alt="Image 2" /></li>
          <li><img src="/images/3.jpg" alt="Image 3" /></li>
          <li><img src="/images/4.jpg" alt="Image 4" /></li>
          <li><img src="/images/5.jpg" alt="Image 5" /></li>
          <li><img src="/images/6.jpg" alt="Image 6" /></li>
          <li><img src="/images/7.jpg" alt="Image 7" /></li>
        </ul>
      </div>
    </>
  );
}

export default Multiple;
