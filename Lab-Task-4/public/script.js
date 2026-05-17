const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// ⭐ BONUS: close menu when link clicked
const links = document.querySelectorAll(".menu a");

links.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});


function toggleDropdown(){

    document
        .getElementById("userDropdown")
        .classList.toggle("show-dropdown");

}


// CLOSE WHEN CLICK OUTSIDE

window.onclick = function(event){

    if(

        !event.target.matches(".user-icon")

    ){

        const dropdown =
            document.getElementById(
                "userDropdown"
            );

        if(
            dropdown.classList.contains(
                "show-dropdown"
            )
        ){

            dropdown.classList.remove(
                "show-dropdown"
            );

        }

    }

}

