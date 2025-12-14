// a lightbox image gallery that shows images in an overlay

// configure which element to use for the large image source - an `src` on the image or a `href` on a surrounding link.

// We first find all image inside a given gallery container

type ImageSourceSelector = 'img' | 'a';
type ImageDescriptionSelector = 'alt' | 'title' | string;
export type LiteboxOptions = {
  /**
   * The image source selector - either 'img' to use the img src attribute, or 'a' to use the href of a surrounding link
   * When you choose 'a', the img must be inside an <a> element, and the "closest" ancestor <a> will be used to get the large image URL.
   *
   * @default 'img'
   */
  imageSource: ImageSourceSelector,
  /**
   * The image description selector
   * - 'alt' to use the img alt attribute
   * - 'title' to use the img title attribute
   * - a custom selector string to find an element with the description text
   *
   * @default 'alt'
   */
  description?: ImageDescriptionSelector;
  /**
   * Whether to destroy the litebox instance when it is closed. This will remove the litebox from the DOM and free up memory.
   * If a litebox will be opened multiple times, either with the same gallery or a different one, it is better to keep it in the DOM.
   *
   * @default false
   */
  destroyOnClose?: boolean;
  /**
   * Whether to lazy render the litebox container itself only when the litebox is opened for the first time.
   * This can help with initial page load performance if the litebox is not used immediately, or you have multiple galleries on the page.
   *
   * @default true
   */
  lazyRender?: boolean;
};

type LiteboxImage = {
  src: string,
  description?: string | null
}

const defaultOptions: LiteboxOptions = {
  imageSource: 'img',
  description: 'alt',
  destroyOnClose: false,
  lazyRender: true,
};

let idCounter = 0;
const uniqueId = (() => {
  return ++idCounter;
});


function isImageElement(el: unknown): el is HTMLImageElement {
  return el instanceof HTMLImageElement;
}

class Litebox {
  container?: HTMLElement;
  activeIndex: number = 0;
  private images: LiteboxImage[] | null = null;
  private contentEl: HTMLElement | null = null;
  private indexDisplay: HTMLElement | null = null;

  constructor(public el: HTMLElement, public options: LiteboxOptions = defaultOptions) {
    this.init();
  }

  private init() {
    this.images = this.getImagesFromDOM();
    if (this.images && this.images.length > 0) {
      console.log('Litebox images found:', this.images);
      // Render immediately if the user wants the gallery to be prerendered.
      if (this.options.lazyRender === false) {
        this.render();
      }

      // listen for clicks on the gallery element to open the litebox
      this.el.addEventListener('click', (event) => {
        const targetEl = event.target;
        if (!isImageElement(targetEl)) {
          return;
        }
        event.preventDefault();
        // find the index of the clicked image
        const clickedItemIndex = this.images?.findIndex((image, index) => {
          return imageSource(targetEl, this.options.imageSource) === image.src
        });
console.log("clicked item index", clickedItemIndex);
        // if the container isn't not yet rendered, do so now.
        if (!this.container || !document.body.contains(this.container!)) {
          this.render(clickedItemIndex);
        }
        // if we are reusing an existing litebox, check if it's present and render the images in it for the current gallery.
        if (this.options.destroyOnClose === false && this.container && document.body.contains(this.container)) {
          this.renderImages(clickedItemIndex);
        }
        this.goto(clickedItemIndex ?? 0);
        this.openLitebox();
      });
    }
  }

  private render(initialActiveIndex?: number) {
    console.log('Rendering litebox with images:', this.images);
    if (!this.images || !this.images.length) {
      return;
    }
    this.container = buildLitebox(this.images);
    this.contentEl = this.container.querySelector('.litebox-content');
    this.indexDisplay = this.container.querySelector('.litebox-index-display');

    this.setupControlEventListeners();
    this.activeIndex = initialActiveIndex ?? 0;
    this.contentEl?.replaceChildren(buildImagesMarkup(this.images, this.activeIndex));

    document.body.appendChild(this.container);
    this.updateIndexDisplay();
  }

  private getImagesFromDOM() {
    return getImages(this.el, this.options.imageSource, this.options.description);
  }

  private openLitebox() {
    if (!this.container) {
      throw new Error("Litebox container not initialized");
    };
    this.container.classList.add('litebox-open');
  }

  private closeLitebox() {
    if (!this.container) {
      throw new Error("Litebox container not initialized");
    };
    this.container.classList.remove('litebox-open');
  }

  private renderImages(initialActiveIndex?: number) {
    console.log("Rendering images for litebox at index", initialActiveIndex);
    if (!this.container) {
      throw new Error("Litebox container not initialized");
    };
    this.images = this.getImagesFromDOM();
    if (!this.images || this.images.length === 0) {
      throw new Error("No images found for litebox");
    }
    this.activeIndex = initialActiveIndex ?? 0;
    const imagesMarkup = buildImagesMarkup(this.images, this.activeIndex);
    console.log(imagesMarkup);
    this.contentEl?.replaceChildren(imagesMarkup);
    this.updateIndexDisplay();
  }


  private setupControlEventListeners() {
    if (!this.container) {
      throw new Error("Litebox container not initialized");
    };
    // Set up event listeners for controls
    const closeBtn = this.container.querySelector('.litebox-close');
    const nextBtn = this.container.querySelector('.litebox-next');
    const prevBtn = this.container.querySelector('.litebox-prev');

    closeBtn?.addEventListener('click', () => {
      this.closeLitebox();
      if (this.options.destroyOnClose === true) {
        setTimeout(() => {
          this.destroy();
        });
      }
    });
    nextBtn?.addEventListener('click', () => this.next());
    prevBtn?.addEventListener('click', () => this.prev());
  }

  private destroy() {
    // Remove the container. This will free up DOM memory and event listeners
    if (this.container) {
      this.container.remove();
      this.container = undefined;
    }
  }

  public next() {
    console.log('Next image');
    this.activeIndex = Math.min(this.activeIndex + 1, (this.images?.length ?? 1) - 1);
    this.goto(this.activeIndex);
  }
  public prev() {
    console.log('Next image');
    this.activeIndex = Math.max(this.activeIndex - 1, 0);
    this.goto(this.activeIndex);
  }
  public goto(index: number) {
    console.log('Go to image', index);
    if (!this.container) {
      throw new Error("Litebox container not initialized");
    };
    // make the current active image inactive
    const currentActiveItem = this.container.querySelector('.litebox-item.active');
    currentActiveItem?.classList.remove('active');
    // make the new active image active
    const newActiveItem = this.container.querySelector(`.litebox-item:nth-child(${this.activeIndex + 1})`); // nth-child is 1-based

    newActiveItem?.classList.add('active');
    // update index display
    this.updateIndexDisplay();
  }

  private updateIndexDisplay() {
    if (this.indexDisplay && this.images) {
      this.indexDisplay.textContent = `${this.activeIndex + 1} / ${this.images.length}`;
    }
  }
}


const litebox = (elementOrSelector: HTMLElement | string, options: LiteboxOptions = defaultOptions) => {
  let el: HTMLElement | null;
  console.log('Setting up litebox', elementOrSelector, options);
  if (typeof elementOrSelector === 'string') {
    el = document.querySelector<HTMLElement>(elementOrSelector);
    if (el === null) {
      throw new Error(`Litebox: No element found for selector ${elementOrSelector}`);
    }
  } else {
    el = elementOrSelector;
  }

  return new Litebox(el, options);
}

const imageSource = (el: HTMLImageElement, srcSelector: ImageSourceSelector): string | null => {
  const largeSourceEl = el.closest(srcSelector);
  let src = el.getAttribute('src');
  if (!largeSourceEl) return null;
  if (largeSourceEl.matches("a")) {
    src = largeSourceEl.getAttribute('href');
  }
  if (!src) return null;
  return src;
}

const getImages = (el: HTMLElement, srcSelector: ImageSourceSelector, descriptionSelector?: ImageDescriptionSelector): LiteboxImage[] | null => {
  const images = el.querySelectorAll('img');
  if (images.length === 0) {
    return null;
  }
  return validLiteboxImages(Array.from(images).map((img) => {
    const src = imageSource(img, srcSelector);
    if (!src) return null;
    let description: string | undefined;
    if (descriptionSelector === "alt" || descriptionSelector === "title") {
      description = img.getAttribute(descriptionSelector) ?? undefined;
    }
    // if (img.getAttribute(descriptionSelector) || undefined : undefined;
    return {
      src,
      description
    }
  }));

}

const validLiteboxImages = (lbImages: (LiteboxImage | null)[]): LiteboxImage[] => {
  return lbImages.filter(img => !!img);
}



/*
<div class="litebox" id="litebox-1">
  <div class="litebox-content">
    <img class="litebox-image" src="https://picsum.photos/id/1010/1500/1000" alt="">
    <div class="litebox-description">Foo bar baz</div>
  </div>
  <div class="litebox-controls">
    <button class="litebox-prev">&#10094;</button>
    <button class="litebox-next">&#10095;</button>
    <button class="litebox-close">&times;</button>
  </div>
</div>
 */
const loader = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#FFFFFF"></stop><stop offset=".3" stop-color="#FFFFFF" stop-opacity=".9"></stop><stop offset=".6" stop-color="#FFFFFF" stop-opacity=".6"></stop><stop offset=".8" stop-color="#FFFFFF" stop-opacity=".3"></stop><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a11)" stroke-width="14" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>`;

const buildLitebox = (images: LiteboxImage[]) => {
  const container = createEl("div", "litebox", { id: `litebox-${uniqueId()}` });
  const content = createEl("div", "litebox-content");
  const loaderEl = createEl("div", "litebox-loader");
  loaderEl.innerHTML = loader;
  container.appendChild(loaderEl);
  container.appendChild(content);
  container.appendChild(buildControls());
  return container;
}

const closeIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" /></svg>`;
const leftArrowIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12H3M3 12L10 19M3 12L10 5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const buildControls = () => {
  const controls = createEl("div", "litebox-controls");
  const prevBtn = createEl("button", "litebox-prev");
  prevBtn.innerHTML = leftArrowIcon;
  const nextBtn = createEl("button", "litebox-next");
  nextBtn.innerHTML = leftArrowIcon;
  const closeBtn = createEl("button", "litebox-close");
  closeBtn.innerHTML = closeIcon;
  const indexDisplay = createEl("div", "litebox-index-display");

  controls.appendChild(indexDisplay);
  controls.appendChild(prevBtn);
  controls.appendChild(nextBtn);
  controls.appendChild(closeBtn);

  return controls;
}

const buildImagesMarkup = (images: LiteboxImage[], initialIndex = 0) => {
  const ulEl = createEl("ul");
  images.forEach((image, index) => {
    const liEl = createEl("li", `litebox-item${index === initialIndex ? ' active' : ''}`);
    const imgEl = createEl("img", "litebox-image", { src: image.src, loading: "lazy" });
    liEl.appendChild(imgEl);
    if (image.description) {
      const descEl = createEl("div", "litebox-description");
      descEl.textContent = image.description;
      liEl.appendChild(descEl);
    }
    ulEl.appendChild(liEl);
  });
  return ulEl;
}

const createEl = (tag: string, classNames?: string, attributes?: { [key: string]: string }) => {
  const el = document.createElement(tag);
  if (classNames) {
    el.classList.add(...(classNames.split(" ")));
  }
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      el.setAttribute(key, value);
    }
  }
  return el;
}
export { litebox };
