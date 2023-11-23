//getting elements by DOM
const row = document.querySelector('.row');
const page = document.querySelector('.pagination');

//url for fetch data
const url = 'https://api.coincap.io/v2/assets';

let current_page = 1;
let no_of_items = 12;

//function for fetch data
async function fetchData() {
    let response = await fetch(url);
    let data = await response.json()
        .catch((error) => console.log('Error Message : ' + error));

    //calling function for display fetch data
    display_data(data.data, row, no_of_items, current_page);
    //calling function for creating pagination button
    setupPagination(data.data, page, no_of_items, current_page);
}

//function for display data
function display_data(data, element, no_of_items, current_page) {
    element.inneHTML = '';
    current_page--;

    let start = no_of_items * current_page;
    let end = start + no_of_items;

    let current_page_items = data.slice(start, end);

    //creating elements in DOM
    element.innerHTML = current_page_items.map((item) =>
        ` <div class='col-12 col-lg-3 col-md-4 col-xl-3 col-xxl-3'>
            <div class='card m-2'>
                <div class='card-title'>${item.name}</div>
                <div class='card-body'>
                    <div class='card-text'>
                        <div>Rank : ${item.rank}</div>
                        <div>Symbol : ${item.symbol}</div>
                        <div>USD Value : ${Math.round(item.priceUsd * 100) / 100}$</div>
                        <div><a href='${item.explorer}' target='_blank'>Click to Explore</a></div>
                    </div>
                </div>
            </div>
            </div>`
    ).join('');
}

//creating pagination buttons
function setupPagination(items, element, no_of_items, page) {

    let no_of_pages = Math.ceil(items.length / no_of_items);

    for (let i = 1; i <= no_of_pages; i++) {
        let btn = pagenationButton(items, i);
        element.appendChild(btn);
    }
}

//function for pagination buttons
function pagenationButton(items, page) {
    let button = document.createElement('button');
    button.innerText = page;
    button.classList.add('btn');
    button.classList.add('m-1');

    if (page == current_page) button.classList.add('active');

    button.addEventListener('click', () => {
        display_data(items, row, no_of_items, page);

        document.querySelector('button.active').classList.remove('active');
        button.classList.add('active')
    })
    return button;
}

fetchData();