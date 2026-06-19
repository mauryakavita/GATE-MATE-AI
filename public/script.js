let innerUploadImage = document.querySelector(".inner-upload-image");
let input = innerUploadImage.querySelector("input");
let image = document.querySelector('#image');
let btn = document.querySelector('button');
let loading = document.querySelector("#loading");
let output = document.querySelector(".output");

let fileDetails = {
    "mime_type": null,
    "data": null
};

async function generateResponse() {
    // Backend ko call kar rahe, Groq ko direct nahi
    const RequestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            imageBase64: fileDetails.data,
            mimeType: fileDetails.mime_type
        })
    };

    try {
        // /.netlify/functions/solve pe bhej rahe
        let response = await fetch('/.netlify/functions/solve', RequestOption);
        let data = await response.json();
        
        if (!response.ok) throw new Error(data.error || "Server error");
        
        // Groq ka response nikaal
        let apiResponse = data.choices[0].message.content.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        output.innerHTML = apiResponse;
        output.style.display = "block";
    } catch (e) {
        console.log(e);
        output.innerHTML = "Error: " + e.message;
        output.style.display = "block";
    } finally {
        loading.style.display = "none";
        btn.disabled = false;
    }
}

input.addEventListener("change", (e) => {
    const file = input.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = (e) => {
        let base64data = e.target.result.split(",")[1];
        fileDetails.mime_type = file.type;
        fileDetails.data = base64data;

        innerUploadImage.querySelector("span").style.display = "none";
        innerUploadImage.querySelector("#icon").style.display = "none";
        image.style.display = "block";
        image.src = `data:${fileDetails.mime_type};base64,${fileDetails.data}`;
        output.style.display = "none";
    };

    reader.readAsDataURL(file);
});

btn.addEventListener("click", () => {
    if (!fileDetails.data) {
        alert("Pehle image upload karo");
        return;
    }
    loading.style.display = "block";
    btn.disabled = true;
    generateResponse();
});

innerUploadImage.addEventListener("click", () => {
    input.click();
});