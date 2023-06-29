const sliderWrapper = document.getElementsByClassName('slider-wrapper')[0];
const sliderWrapperImagesCount = Array.from(sliderWrapper.children).filter((children) => children.nodeName === 'IMG').length;
const sliderWrapperStyle = sliderWrapper.style;
sliderWrapperStyle.left = `0%`;

const modal = document.getElementById('intro-modal');
modal.show();

const startPresentationButton = document.getElementById('start-presentation-btn');
startPresentationButton.addEventListener('click', async () => {
    const container = document.getElementById('container');
    container.style.display = 'block';
    
    modal.close();
    const delayPerImage = 3000;
    startAudio();
    await delay(delayPerImage);
    transitionImages(delayPerImage);
});

async function transitionImages(delayInMs, currentChildIndexInView = 0) {
    currentChildIndexInView++;
    if (currentChildIndexInView === sliderWrapperImagesCount) {
        sliderWrapper.setAttribute('no-transition', '');
        sliderWrapperStyle.left = '0%';
        await delay(delayInMs / 2);
        currentChildIndexInView = 1;
        transitionImages(delayInMs, 0);
        return;
    }

    sliderWrapper.removeAttribute('no-transition');
    const lefStyleWithoutPercent = getPercentageValue(sliderWrapperStyle.left);
    sliderWrapperStyle.left = `${lefStyleWithoutPercent - 100}%`;
    await delay(currentChildIndexInView + 1 === sliderWrapperImagesCount ? delayInMs / 2 : delayInMs);
    transitionImages(delayInMs, currentChildIndexInView);
}

function delay(delayInMs) {
    console.log(delayInMs)
    return new Promise((resolve) => setTimeout(resolve, delayInMs));
}

function getPercentageValue(percentage) {
    return percentage.substring(0, percentage.length - 1);
}

function startAudio() {
    const audio = document.getElementById('playAudio');
    const promise = audio.play();
    promise
        ?.then(() => {})
        ?.catch(() => {
            audio.muted = true;
            audio.play();
        });
}
