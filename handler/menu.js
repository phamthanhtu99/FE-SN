var listMenu = document.querySelectorAll(".iq-menu li");
var contentPage = document.getElementById("content-page");

const setPage =(e)=>{

    //get url page
    var url = e.target.getAttribute("data-url");

    //remove active when unclicking
    removeActiveUIClick();

    //set the page to content
    setcontentPage(url);

    //set active whe click
    e.target.parentNode.className = "active";
}


listMenu.forEach(element => {
    element.addEventListener("click", setPage);
});


 // unclicking
const removeActiveUIClick =()=>{
    listMenu.forEach(element => {

        if(element.className == "active"){
            element.classList.remove("active");
        }

    });
}


function setcontentPage(url) {
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
            contentPage.innerHTML = tempElement.innerHTML;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
