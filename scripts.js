const modal = document.getElementById('intro-modal');
modal.show();

const startPresentationButton = document.getElementById('start-presentation-btn');
startPresentationButton.addEventListener('click', async () => {
    const container = document.getElementById('container');
    container.style.display = 'block';

    modal.style.display = 'none';
    startAudio();

    const sliderWrapper = document.getElementsByClassName('slider-wrapper')[0];
    const sliderWrapperImagesCount = Array.from(sliderWrapper.children).filter((children) => children.nodeName === 'IMG').length;
    sliderWrapper.style.left = `0%`;
    const delayPerImage = 3000;

    await delay(delayPerImage);
    transitionImages(sliderWrapper, sliderWrapperImagesCount, delayPerImage);
});

async function transitionImages(sliderWrapper, sliderWrapperImagesCount, delayInMs, currentChildIndexInView = 0) {
    currentChildIndexInView++;
    const sliderWrapperStyle = sliderWrapper.style;
    
    if (currentChildIndexInView === sliderWrapperImagesCount) {
        sliderWrapper.setAttribute('no-transition', '');
        sliderWrapperStyle.left = '0%';

        await delay(sliderWrapper, sliderWrapperImagesCount, delayInMs / 2);
        transitionImages(sliderWrapper, sliderWrapperImagesCount, delayInMs, 0);

        return;
    }

    sliderWrapper.removeAttribute('no-transition');
    const lefStyleWithoutPercent = getPercentageValue(sliderWrapperStyle.left);
    sliderWrapperStyle.left = `${lefStyleWithoutPercent - 100}%`;
    
    await delay(currentChildIndexInView + 1 === sliderWrapperImagesCount ? delayInMs / 2 : delayInMs);
    transitionImages(sliderWrapper, sliderWrapperImagesCount, delayInMs, currentChildIndexInView);
}

function delay(delayInMs) {
    return new Promise((resolve) => setTimeout(resolve, delayInMs));
}

function getPercentageValue(percentage) {
    return percentage.substring(0, percentage.length - 1);
}

function startAudio() {
    const audio = document.getElementById('playAudio');
    audio
        .play()
        ?.then(() => {})
        ?.catch(() => {
            audio.muted = true;
            audio.play();
        });
}
