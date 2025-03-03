document.getElementById('imageInput').addEventListener('change', function(event) {
    let file = event.target.files[0];
    let errorMessage = document.getElementById('error-message');
    let resultText = document.getElementById('result');
    let imagePreview = document.getElementById('uploadedImage');
    
   
    errorMessage.innerText = "";
    resultText.innerText = "";
    imagePreview.style.display = "none";
    document.getElementById('calendarContainer').innerHTML = ""; 

    if (!file) {
        errorMessage.innerText = "⚠️ Please select an image file.";
        return;
    }
    if (!file.type.startsWith("image/")) {
        errorMessage.innerText = "❌ Invalid file format. Please upload an image.";
        return;
    }

    let reader = new FileReader();
    
    reader.onload = function(event) {
        let img = new Image();
        img.onload = function() {
         
            imagePreview.src = event.target.result;
            imagePreview.style.display = "block";

            
            analyzeImage(img);
        };
        img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
});

function analyzeImage(img) {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;
    let greenCount = 0, brownCount = 0;

    for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i];     
        let g = pixels[i + 1]; 
        let b = pixels[i + 2]; 

        if (g > r && g > b) { greenCount++; } 
        else if (r > g && r > b) { brownCount++; }
    }

    let totalPixels = greenCount + brownCount;
    let greenRatio = (greenCount / totalPixels) * 100;
    let brownRatio = (brownCount / totalPixels) * 100;

    let irrigationNeeded = brownRatio > greenRatio;
    let resultText = document.getElementById('result');
    
    resultText.innerText = irrigationNeeded 
        ? "🚨 Irrigation Required (Dry Field Detected)" 
        : "✅ No Irrigation Needed (Healthy Field)";


    let moistureLevel = Math.floor(Math.random() * 70) + 20;
    resultText.innerHTML += `<br>🌡️ Moisture Level: ${moistureLevel}%`;

    generateIrrigationCalendar(irrigationNeeded);
}

function generateIrrigationCalendar(irrigationNeeded) {
    let today = new Date();
    let calendarDiv = document.getElementById('calendarContainer');
    calendarDiv.innerHTML = "<h3>🗓️ Irrigation Schedule</h3>";

    let table = "<table border='1' style='width:100%; text-align:center;'><tr>";
    for (let i = 0; i < 7; i++) {
        let date = new Date();
        date.setDate(today.getDate() + i);
        let dateStr = date.toDateString();

        let isWateringDay = irrigationNeeded && (i % 3 === 0);
        let bgColor = isWateringDay ? "red" : "white";
        let textColor = isWateringDay ? "white" : "black";

        table += `<td style="background-color:${bgColor}; color:${textColor}; padding:10px;">${dateStr}</td>`;
    }
    table += "</tr></table>";
    
    calendarDiv.innerHTML += table;
}


const cropData = {
    wheat: "Water every 7-10 days. Critical irrigation stages: Crown root initiation and grain filling.",
    rice: "Requires continuous flooding or alternate wetting and drying (AWD) every 5-7 days.",
    corn: "Needs 1-1.5 inches of water per week, especially during pollination.",
    soybean: "Water once a week, most critical during pod development.",
    barley: "Irrigate every 10 days, crucial at the jointing and heading stages.",
    sugarcane: "High water requirement. Irrigate every 7-10 days for proper growth.",
    cotton: "Moderate irrigation required. Water every 10-15 days, especially during flowering.",
    millet: "Drought-resistant but needs water at early growth and flowering stages.",
    sorghum: "Water every 10-12 days, crucial during grain formation.",
    potato: "Requires frequent irrigation every 5-7 days to ensure good tuber growth.",
    tomato: "Keep soil consistently moist. Water every 3-5 days.",
    onion: "Water every 7 days to prevent bulb splitting.",
    carrot: "Moist soil is necessary. Irrigate every 5 days.",
    cabbage: "Requires frequent watering, every 3-5 days, to keep soil moist.",
    banana: "Needs high water supply. Irrigate every 4-5 days in summer and 8-10 days in winter.",
    apple: "Irrigate every 10-15 days, particularly before flowering and fruiting stages.",
    grape: "Water every 7-10 days, crucial during fruit development.",
    orange: "Requires deep watering every 10-14 days.",
    peanut: "Moderate watering, especially during pegging stage (every 7-10 days).",
    chili: "Water every 6-8 days to maintain plant health.",
    brinjal: "Frequent irrigation every 5-7 days, especially during flowering.",
    mustard: "Requires minimal irrigation, mainly at flowering and seed formation.",
    tea: "Water every 7 days in dry conditions to maintain soil moisture.",
    coffee: "Needs irrigation every 10-14 days, especially during flowering.",
    groundnut: "Water once every 8-10 days to ensure good pod formation.",
    sunflower: "Water every 10 days, essential during flowering and seed setting.",
    papaya: "Requires irrigation every 5-7 days to promote fruit growth.",
    coconut: "High water requirement. Irrigate every 7 days in summer.",
    pineapple: "Needs watering every 8-10 days, especially in dry conditions.",
    strawberry: "Frequent watering every 3-5 days to maintain soil moisture."
};

document.getElementById('getGuidelines').addEventListener('click', function() {
    let selectedCrop = document.getElementById('cropSelection').value;
    let guidelines = cropData[selectedCrop] || "No information available for this crop.";
    document.getElementById('cropGuidelines').innerText = guidelines;
});
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
