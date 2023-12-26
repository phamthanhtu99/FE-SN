const listComponent =[
    {
        id : "menu",
        url: "./component/menu.html"  
    },
    {
        id : "header",
        url: "./component/header.html"  
    }
]


// Hàm để load file HTML và thực thi JavaScript bên trong
function renderUi(url,id) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;

            // Tìm và thực thi các đoạn mã script từ file HTML
            const scripts = tempElement.getElementsByTagName('script');

            for (let i = 0; i < scripts.length; i++) {
                const script = document.createElement('script');

                if(scripts[i].src){
                   script.src = scripts[i].src
                }
               
                script.textContent = scripts[i].textContent;
                document.body.appendChild(script);
            }

            // Thêm nội dung của file HTML vào trang web
            document.getElementById(id).innerHTML = tempElement.innerHTML;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

const loadUi = () => {
    listComponent.forEach(item=>{
        renderUi(item.url,item.id);
    })
}
loadUi();