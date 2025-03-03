document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    
   
    let navbar = document.querySelector(".navbar");
    let footer = document.querySelector(".footer");

    if (document.body.classList.contains("dark-mode")) {
        navbar.style.backgroundColor = "#388e3c"; 
        footer.style.backgroundColor = "#388e3c";
    } else {
        navbar.style.backgroundColor = ""; 
        footer.style.backgroundColor = "";
    }
});