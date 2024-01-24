// Функция для форматирования числа в сокращенной форме (тысячи, миллионы и т. д.)
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}

function submitTheme() {
    var selectedTheme = document.getElementById('theme-selector').value;
    console.log('Selected theme:', selectedTheme);

    fetch('/apply_theme', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: selectedTheme })
    }).then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(function(data) {
        console.log('Theme updated:', data);
        // Reload the page to apply the new theme

    }).catch(function(error) {
        console.error('Error updating theme:', error);
    });
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

let theme = getCookie('theme');
let link = document.createElement('link');
link.rel = 'stylesheet';
link.href = `/static/${theme}.css`;
document.head.appendChild(link);

// Example using fetch API
fetch('/login', {
    method: 'POST',
    // Other request options
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));


function fetchData() {
    fetch('/api/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Обновите элементы DOM здесь, используя полученные данные
            // Например:
            document.querySelector('.deposit-amount').innerText = formatNumber(data.deposit_amount) + '₽';
            document.querySelector('.edited-created').innerText = data.edited + '/' + data.created;
            document.querySelector('.total-received').innerText = formatNumber(data.total_received) + '₽';
            // А также обновить список слотов в случае его изменения
            // ...
        })
        .catch(error => console.error('Error fetching data:', error));
}

window.addEventListener('load', function () {
fetchData();
setInterval(fetchData, 6000);


var listContainer = document.getElementById('listContainer');
var scrollingList = document.getElementById('scrollingList');

function checkOverflow() {
var isOverflowing = scrollingList.offsetHeight > listContainer.offsetHeight;

if (isOverflowing) {
    var newItem = document.createElement("li");
    newItem.textContent = "Новый элемент";
    document.getElementById("scrollingList").appendChild(newItem);
} else {
    scrollingList.style.animation = 'none';
}
}

window.addEventListener('resize', checkOverflow);
checkOverflow(); // Вызываем при загрузке страницы
});
