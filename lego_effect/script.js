const img = document.querySelector("img");
const container = img.parentElement;

img.onload = () => {
    const imgWidth = img.clientWidth;
    const imgHeight = img.clientHeight;

    const blockWidth = parseInt(getComputedStyle(document.body).getPropertyValue("--sq-dim"));
    
    for(let h = 0; h < imgHeight; h += blockWidth) {
        for(let w = 0; w < imgWidth; w += blockWidth) {
            const element = document.createElement("div");
            element.className = "lego";
            element.style.top = h + "px";
            element.style.left = w + "px";
            container.appendChild(element);
        }
    }
}