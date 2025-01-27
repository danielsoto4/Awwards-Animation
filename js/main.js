document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("image-track");
    const backButton = document.getElementById("back-button");

    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

    const handleOnUp = () => {
        track.dataset.mouseDownAt = "0";  
        track.dataset.prevPercentage = track.dataset.percentage;
    };

    const handleOnMove = e => {
        if (track.dataset.mouseDownAt === "0") return;
    
        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
              maxDelta = window.innerWidth / 2;
    
        
        const dragSpeedFactor = track.classList.contains("shrink") ? 0.50 : 1; 
        const percentage = (mouseDelta / maxDelta) * -100 * dragSpeedFactor; 
        const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    
        track.dataset.percentage = nextPercentage;
    
        const transformValue = track.classList.contains("shrink") 
            ? `translate(${nextPercentage}%, -50%%) scale(0.5)` 
            : `translate(${nextPercentage}%, -50%)`; 
    
        track.style.transform = transformValue;
    
        for (const image of track.getElementsByClassName("image")) {
            image.style.objectPosition = `${100 + nextPercentage}% center`;
        }
    };
    
     const handleImageClick = (image) => {
        document.body.style.backgroundImage = `url(${image.src})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";

        track.classList.add("shrink");
        track.style.transform = `translate(-50%, 0%) scale(0.5)`;

        backButton.style.display = "block";
    };


    const resetBackground = () => {
        document.body.style.backgroundImage = ""; 
        track.classList.remove("shrink"); 
        track.style.transform = ""; 
        backButton.style.display = "none"; 
    };

    backButton.addEventListener("click", resetBackground);

    for (const image of track.getElementsByClassName("image")) {
        image.addEventListener("click", () => handleImageClick(image));
    }

    window.onmousedown = e => handleOnDown(e);
    window.ontouchstart = e => handleOnDown(e.touches[0]);
    window.onmouseup = e => handleOnUp(e);
    window.ontouchend = e => handleOnUp(e.touches[0]);
    window.onmousemove = e => handleOnMove(e);
    window.ontouchmove = e => handleOnMove(e.touches[0]);
});
