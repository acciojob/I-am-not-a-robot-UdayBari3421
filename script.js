document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('img');
  const resetButton = document.querySelector('button[type="reset"]');
  const submitButton = document.querySelector('button[type="submit"]');
  const h3 = document.querySelector('h3');
  const p = document.querySelector('p');
  let selectedImages = [];

  function shuffleImages() {
    const imageSources = ["https://picsum.photos/id/237/200/300", "https://picsum.photos/seed/picsum/200/300", "https://picsum.photos/200/300?grayscale", "https://picsum.photos/200/300/", "https://picsum.photos/200/300.jpg"];
    imageSources.push(imageSources[Math.floor(Math.random() * 5)]); // Add a copy
    imageSources.sort(() => Math.random() - 0.5); // Shuffle the array

    images.forEach((img, index) => {
      img.src = imageSources[index];
    });
  }

  function resetGame() {
    selectedImages = [];
    submitButton.style.display = 'none';
    resetButton.style.display = 'none';
    h3.innerText = 'Please click on the identical tiles to verify that you are not a robot.';
    images.forEach(img => img.classList.remove('selected'));
	p.style.display = "none";
  }

  function handleImageClick(index) {
    if (selectedImages.length < 2 && !selectedImages.includes(index)) {
      selectedImages.push(index);
      images[index].classList.add('selected');

      if (selectedImages.length === 2) {
        submitButton.style.display = 'inline-block';
      }
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (selectedImages.length === 2) {
      if (images[selectedImages[0]].src === images[selectedImages[1]].src) {
		p.style.display = "block";
        p.innerText = 'You are a human. Congratulations!';
      } else {
        p.innerText = 'We can\'t verify you as a human. You selected the non-identical tiles.';
		p.style.display = "block";
      }
      submitButton.style.display = 'none';
      resetButton.style.display = 'inline-block';
    }
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      handleImageClick(index);
    });
  });

  resetButton.addEventListener('click', resetGame);
  submitButton.addEventListener('click', handleFormSubmit);

  shuffleImages();
});
