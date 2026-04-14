1.	How you loaded and separated featured vs non featured products
Answer: I created two separate collections using smart conditions instead of manually sorting products. This allowed me to automatically separate featured and non-featured products.

Next, I created a custom collection template. In this template, I added a section for featured products and assigned the featured collection to it, so only featured products are displayed there.

For non-featured products, I assigned the same template to the non-featured collection and used the standard product grid section to display them.

This approach ensures a clean separation of featured and non-featured products while keeping the setup dynamic and easy to manage.

2.	How infinite scroll was implemented
Answer: Infinite scroll was implemented using JavaScript by detecting when the user reaches the bottom of the product grid.

Initially, the first set of products is loaded using Shopify’s default pagination (20 products per page). Then, an Intersection Observer is used to monitor a loader element placed at the bottom of the page. When this loader becomes visible in the viewport, the script automatically triggers a request to load the next page of products.

The next set of products is fetched dynamically using the collection URL with the page parameter. The response contains the full HTML of the page, from which only the product grid section is extracted using JavaScript. These new products are then appended to the existing grid without reloading the page.

This process continues until no more products are available, providing a seamless infinite scrolling experience for the user.

3.	How duplicate products were prevented
Answer: Duplicate products were prevented by ensuring that featured and non-featured products were managed through separate collections using smart conditions. Since each product belongs to only one of these collections based on the defined criteria, there is no overlap between the two sets.

Additionally, during infinite scroll, products are loaded page by page using Shopify’s pagination system. Each page contains a unique set of products, so when new products are fetched and appended to the grid, duplicates are naturally avoided.

This combination of collection-level separation and paginated loading ensures that no product is displayed more than once.

4.	How solution scales for large collections
Answer: The solution scales well for large collections because it uses Shopify’s built-in pagination and loads products in smaller batches instead of loading all products at once. Only 20 products are loaded initially, and additional products are fetched dynamically as the user scrolls. This reduces the initial page load time and improves overall performance.

The use of infinite scroll ensures that data is loaded only when required, which minimizes memory usage and avoids unnecessary network requests. Additionally, since Shopify handles pagination efficiently on the backend, it can manage large product catalogs without impacting performance.

Separating featured and non-featured products using smart collections also helps maintain scalability, as the logic is handled automatically by Shopify without requiring manual updates or complex frontend processing.

Overall, this approach ensures a smooth and efficient user experience even for stores with a large number of products.

5.	How filtering & sorting were handled while maintaining proper logic
Answer: Filtering and sorting were handled using Shopify’s built-in functionality to ensure accuracy and consistency. When a user applies filters or sorting options, the page reloads with the updated query parameters (such as `sort_by` or filter values), and Shopify returns the correctly filtered product set from the backend.

To maintain proper logic, infinite scroll is conditionally disabled when filtering or sorting is active. This ensures that only the correct, server-rendered product results are displayed, avoiding any mismatch or duplication that could occur with dynamic loading.

By relying on Shopify’s native filtering and sorting system and limiting custom JavaScript behavior during these operations, the solution remains reliable, scalable, and consistent with expected eCommerce behavior.

6.	Any limitations of Liquid and how you solved them
Answer: One key limitation of Liquid is that it is a server-side templating language, which means it cannot dynamically update content on the page without a full page reload. It also has limited capability for handling complex logic, real-time interactions, or asynchronous data fetching.

To overcome this, JavaScript was used to implement infinite scroll. Instead of relying solely on Liquid, additional products are fetched dynamically from the next paginated pages and appended to the existing product grid without reloading the page.

Another limitation is that Liquid does not easily support advanced data manipulation, such as merging or deduplicating large datasets on the frontend. This was solved by using Shopify’s smart collections to separate featured and non-featured products at the backend level, ensuring clean data before rendering.

By combining Liquid for initial rendering and structure with JavaScript for dynamic behavior, the solution achieves better performance, flexibility, and a smoother user experience.
