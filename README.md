# Litebox - a lightweight lightbox library

Litebox aims to provide a simple, lightweight, and accessible lightbox solution for displaying images and galleries on the web.

## Examples

Example HTML structure for a gallery:

```html
<ul class="some-gallery">
  <li><img src="/images/0.jpg" alt="Image 0" /></li>
  <li><img src="/images/1.jpg" alt="Image 1" /></li>
  <li><img src="/images/2.jpg" alt="Image 2" /></li>
</ul>
```

Sample initialization code:
```ts
import { litebox } from "litebox";
const lb = litebox(".some-gallery");
```

This is all that's necessary to get started with Litebox!

Another example with a lower res thumbnail that is linked to a higher res image:

```html
<ul class="some-gallery">
  <li><a href="/images/high-res/0.jpg"><img src="/images/thumbs/0.jpg" alt="Image 0" /></a></li>
  <li><a href="/images/high-res/1.jpg"><img src="/images/thumbs/1.jpg" alt="Image 1" /></a></li>
  <li><a href="/images/high-res/2.jpg"><img src="/images/thumbs/2.jpg" alt="Image 2" /></a></li>
</ul>
```
Sample initialization code specifying the image source:

```ts
import { litebox } from "litebox";
const lb = litebox(".some-gallery", { imageSource: "a" });
```

## Options

| Option          | Type            | Default   | Description                                      |
|-----------------|-----------------|-----------|--------------------------------------------------|
| imageSource     | `"img"` \| `"a"` | `"img"`   | Specifies whether to use the `src` of `<img>` elements or the `href` of `<a>` elements as the image source. |
| descriptionAttr | `string`   | `"alt"`   | Specifies which attribute to use for image descriptions. |
| cleanupOnClose | `boolean`       | `true`    | Whether to remove the lightbox elements from the DOM when closed. |
| lazyRender     | `boolean`       | `true`    | Whether to only render the lightbox elements when the lightbox is opened for the first time. |
