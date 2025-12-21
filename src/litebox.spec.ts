import { expect, test } from '@playwright/test';

const basicFixture = `
    <div class="gallery-1">
      <h3>An example gallery using link href for large images</h3>
      <ul>
        <li><a href="https://picsum.photos/id/1010/1500/1000"><img src="https://picsum.photos/id/1010/150/100" alt="Image 1"></a></li>
        <li><a href="https://picsum.photos/id/1011/1500/1000"><img src="https://picsum.photos/id/1011/150/100" alt="Image 2"></a></li>
        <li><a href="https://picsum.photos/id/1012/1500/1000"><img src="https://picsum.photos/id/1012/150/100" alt="Image 3"></a></li>
      </ul>
    </div>
`;

test.describe('Litebox rendered', async () => {

  test('should render the popover when an image is clicked', async ({ page }) => {

    // litebox(".gallery-1");

    // check that .gallery-1 is there
    const img = page.getByRole("img", { name: "Image 1" });
    // await userEvent.click(img.element());
    await img.click();
    const lbElement = page.getByTestId("litebox");
    // const el = document.querySelector(".litebox");
    // if (!el) {
      //   throw new Error("Litebox element not found");
      // }
      await expect(lbElement).toBeVisible()

  })

})
