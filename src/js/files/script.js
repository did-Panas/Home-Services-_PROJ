// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


// ===== Прив'язка блоку BLOG до бази даних (файл JSON) ==============

const blogItems = document.querySelector('.blog__items');

// checking if blog-section is exist
if (blogItems) {
	loadBlogIItems();
}

// sending request and receiving our data (json file)
async function loadBlogIItems() {
	const response = await fetch("files/blog.json", {
		method: "GET"
	});
	if (response.ok) {
		const responseResult = await response.json();
		initBlog(responseResult);
	} else {
		alert("Error!");
	}
}

// selecting 3 items (cards/blogs)
function initBlog(data) {
	for (let index = 0; index < 3; index++) {
		const item = data.items[index];
		buildBlogItem(item);
	}
}

// template building
function buildBlogItem(item) {

	let blogItemTemplate = ``;

	blogItemTemplate += `<article class="blog__item item-blog">`;

	item.image1x ? blogItemTemplate +=
		`<a href="${item.url}" class="item-blog__image item-blog__image-ibg">
			<img src="${item.image1x}" srcset="${item.image2x} 2x" alt="Image">
		</a>`
		: null;

	blogItemTemplate += `<div class="item-blog__date">${item.date}</div>`;

	blogItemTemplate +=
		`<h4 class="item-blog__title">
			<a href="${item.url}" class="item-blog__link-title">${item.title}</a>
		</h4>`;

	item.text ? blogItemTemplate +=
		`<div class="item-blog__text">
			${item.text}
		</div>`
		: null;

	if (item.tags) {
		blogItemTemplate += `<div class="item-blog__tags">`;

		for (const tag in item.tags) {
			blogItemTemplate += `<a href="${item.tags[tag]}" class="item-blog__tag">${tag}</a>`;
		}

		blogItemTemplate += `</div>`;
	}

	blogItemTemplate += `</article>`;


	blogItems.insertAdjacentHTML('beforeend', blogItemTemplate);

}