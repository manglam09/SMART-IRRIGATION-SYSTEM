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

const apiKey = "478deacc796f28cd015062d7486b98ad"; 

function getWeather() {
    let pincode = document.getElementById("pincode").value;
    
    if (!pincode) {
        alert("Please enter a pincode!");
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${pincode},IN&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                document.getElementById("weatherResult").innerHTML = `<p class="text-danger">Error: ${data.message}</p>`;
                return;
            }

            let weather = `
                <p>📍 Location: ${data.name}</p>
                <p>🌡️ Temperature: ${data.main.temp}°C</p>
                <p>🌥️ Weather: ${data.weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
            `;
            document.getElementById("weatherResult").innerHTML = weather;
        })
        .catch(error => {
            document.getElementById("weatherResult").innerHTML = `<p class="text-danger">Failed to fetch data.</p>`;
        });
}
let sms = document.querySelector("#sms");
let section = document.querySelector(".hero");
let text = null; 

sms.addEventListener("click", () => {
    if (!text) { 
       
        text = document.createElement('p');
        text.innerText = "A Smart Irrigation System is an advanced technology-driven system that optimizes water usage for agricultural or landscape irrigation based on real-time data. It uses sensors, IoT (Internet of Things), AI, and automation to determine when and how much water is needed.\n\n" +
            "How It Works:\n" +
            "• Uses image analysis (like your application) to detect soil moisture, crop health, and dryness.\n" +
            "• Soil moisture sensors measure water content in the soil.\n" +
            "• AI/ML models analyze the data and determine if irrigation is necessary.\n" +
            "• The system automatically controls sprinklers or drip irrigation if needed.\n" +
            "• Farmers can monitor and control irrigation via a mobile app or dashboard.\n\n" +
            "✅ Water Conservation – Prevents over-irrigation and saves water.\n" +
            "✅ Improved Crop Yield – Ensures crops get the right amount of water, boosting productivity.\n" +
            "✅ Cost Efficiency – Reduces electricity and labor costs.\n" +
            "✅ Environmental Sustainability – Helps in responsible water management and prevents soil degradation.";
        
        section.appendChild(text);
        sms.innerText = "Less"; 
    } else { 
       
        section.removeChild(text);
        text = null;
        sms.innerText = " Learn More"; 
    }
});

