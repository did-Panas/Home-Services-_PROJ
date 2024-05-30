// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


// ===== Прив'язка блоку BLOG до бази даних (файл JSON) ==============

const blogItems = document.querySelector('.blog__items');
let data;
let startItem = 0;
let endItem = 3;

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
		data = responseResult;
		initBlog(data, startItem, endItem);
	} else {
		alert("Error!");
	}
}

// selecting 3 items (cards/blog-items)
function initBlog(data, startItem, endItem) {
	const dataPart = data.items.slice(startItem, endItem);

	dataPart.forEach(item => {
		buildBlogItem(item);
	});

	viewMore();
}

// template building
function buildBlogItem(item) {

	let blogItemTemplate = ``;

	blogItemTemplate += `<article data-id="${item.id}" class="blog__item item-blog">`;

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

// view-more btn functional
document.addEventListener("click", documentActions);

function viewMore() {
	const dataItemsLength = data.items.length;
	const currentItems = document.querySelectorAll('.item-blog').length;
	const viewMoreBtn = document.querySelector('.blog__view-more');

	currentItems < dataItemsLength ? viewMoreBtn.hidden = false : viewMoreBtn.hidden = true;
	console.log(currentItems);
}

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.blog__view-more')) {
		startItem = document.querySelectorAll('.item-blog').length;
		endItem = startItem + 3;

		initBlog(data, startItem, endItem);
		e.preventDefault();

	}
}