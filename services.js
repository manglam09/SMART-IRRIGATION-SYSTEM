const diseaseData = {
    "wheat": {
        "Rust": "Step 1: Use resistant wheat varieties like HD-2967.\nStep 2: Apply fungicides such as propiconazole at early infection stages.\nStep 3: Practice crop rotation to minimize disease recurrence.\nStep 4: Remove infected plants promptly to prevent spread.",
        "Blight": "Step 1: Destroy infected plant debris.\nStep 2: Use copper-based fungicides.\nStep 3: Improve field drainage and airflow."
    },
    "rice": {
        "Blast": "Step 1: Plant resistant varieties like IR64.\nStep 2: Apply tricyclazole at the first sign of infection.\nStep 3: Maintain proper spacing to reduce humidity.\nStep 4: Avoid excess nitrogen fertilizers.\nStep 5: Conduct regular field inspections.",
        "Brown Spot": "Step 1: Improve soil fertility by adding balanced fertilizers.\nStep 2: Remove infected leaves.\nStep 3: Use seed treatment with fungicides like carbendazim."
    },
    "corn": {
        "Leaf Blight": "Step 1: Use resistant hybrids like P3394.\nStep 2: Rotate crops with legumes.\nStep 3: Avoid overhead irrigation.\nStep 4: Apply fungicides such as mancozeb.",
        "Root Rot": "Step 1: Improve drainage.\nStep 2: Treat seeds with fungicides.\nStep 3: Avoid overwatering."
    }
};

function loadCrops() {
    const cropSelect = document.getElementById("crop");
    Object.keys(diseaseData).forEach(crop => {
        let option = document.createElement("option");
        option.value = crop;
        option.textContent = crop.charAt(0).toUpperCase() + crop.slice(1);
        cropSelect.appendChild(option);
    });
}

function loadDiseases() {
    const crop = document.getElementById("crop").value;
    const diseaseSelect = document.getElementById("disease");
    diseaseSelect.innerHTML = '<option value="">-- Choose a Disease --</option>';

    if (diseaseData[crop]) {
        Object.keys(diseaseData[crop]).forEach(disease => {
            let option = document.createElement("option");
            option.value = disease;
            option.textContent = disease;
            diseaseSelect.appendChild(option);
        });
    }
}

function diagnoseDisease() {
    const crop = document.getElementById("crop").value;
    const disease = document.getElementById("disease").value;
    const output = document.getElementById("output");

    if (crop && disease && diseaseData[crop] && diseaseData[crop][disease]) {
        output.textContent = `Solution for ${disease} in ${crop}:\n${diseaseData[crop][disease]}`;
    } else {
        output.textContent = "Sorry, I can't help with this disease.";
    }
}

loadCrops();

const schemes = [
    { 
        name: "PM-Kisan Samman Nidhi", 
        description: "Provides direct income support to farmers.",
        steps: "1. Visit PM-Kisan portal.\n2. Register with Aadhaar.\n3. Submit bank details.\n4. Wait for verification and fund transfer."
    },
    { 
        name: "Kisan Credit Card (KCC)", 
        description: "Offers short-term loans for farmers at low interest.",
        steps: "1. Visit the nearest bank.\n2. Fill out the KCC application.\n3. Provide land records & ID proof.\n4. Await approval and receive the card."
    },
    { 
        name: "PM Fasal Bima Yojana", 
        description: "Provides crop insurance against natural disasters.",
        steps: "1. Visit insurance portal or CSC.\n2. Submit farm details & Aadhaar.\n3. Pay the premium.\n4. Receive insurance coverage."
    },
    { 
        name: "Soil Health Card Scheme", 
        description: "Provides farmers with soil nutrient status for better productivity.",
        steps: "1. Visit the nearest soil testing lab.\n2. Submit soil sample.\n3. Receive soil health report.\n4. Follow recommended practices."
    },
    
];


const schemesList = document.getElementById("schemesList");
schemes.forEach((scheme, index) => {
    const schemeDiv = document.createElement("div");
    schemeDiv.classList.add("scheme");

    schemeDiv.innerHTML = `
        <h3>${scheme.name}</h3>
        <p>${scheme.description}</p>
        <button class="learn-more" onclick="toggleDetails(${index})">Learn More</button>
        <div class="details" id="details-${index}">${scheme.steps}</div>
    `;

    schemesList.appendChild(schemeDiv);
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
