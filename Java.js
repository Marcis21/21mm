//scripts.js

document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // VIDEO ITEMS
    // =========================================

    // Globālais mainīgais hover pauzes kontrolei
    let pauseTriggeredByHover = false;

    const videoItems = document.querySelectorAll('.video-item');

    videoItems.forEach((item, index) => {

        const video = item.querySelector('video');
        const coverPhoto = item.querySelector('.cover-photo');
        const playButton = coverPhoto.querySelector('.play-button');
        const img = coverPhoto.querySelector('img');

        // Klikšķis uz cover-photo - atskaņo video
        coverPhoto.addEventListener('click', () => {

            if (video.paused) {

                video.play();

                coverPhoto.classList.add('hidden');

                playButton.style.display = 'none';

            } else {

                video.pause();

                playButton.style.display = 'block';

            }

        });

        // Hover efekti tikai vizuāli
        item.addEventListener('mouseenter', () => {

            if (video.paused) {

                img.style.filter = 'grayscale(0)';

                img.style.transform = 'scale(1.05)';

            }

        });

        item.addEventListener('mouseleave', () => {

            if (video.paused) {

                img.style.filter = 'grayscale(100%)';

                img.style.transform = 'scale(1)';

            }

        });

        // Atjauno cover-photo stāvokli pēc video play/pause/end
        video.addEventListener('play', () => {

            coverPhoto.classList.add('hidden');

            playButton.style.display = 'none';

            img.style.filter = 'grayscale(0)';

        });

        video.addEventListener('pause', () => {

            coverPhoto.classList.remove('hidden');

            playButton.style.display = 'block';

            img.style.filter = 'grayscale(100%)';

            img.style.transform = 'scale(1)';

        });

        video.addEventListener('ended', () => {

            coverPhoto.classList.remove('hidden');

            playButton.style.display = 'block';

            img.style.filter = 'grayscale(100%)';

            img.style.transform = 'scale(1)';

        });

    });


    // =========================================
    // ONLY ONE VIDEO PLAYS AT A TIME
    // =========================================

    videoItems.forEach((item, index) => {

        const video = item.querySelector('video');

        video.addEventListener('play', () => {

            videoItems.forEach((otherItem, otherIndex) => {

                if (otherIndex !== index) {

                    const otherVideo = otherItem.querySelector('video');
                    const otherCover = otherItem.querySelector('.cover-photo');
                    const otherPlay = otherCover.querySelector('.play-button');
                    const otherImg = otherCover.querySelector('img');

                    if (!otherVideo.paused) {

                        otherVideo.pause();

                        otherCover.classList.remove('hidden');

                        otherPlay.style.display = 'block';

                        otherImg.style.filter = 'grayscale(100%)';

                        otherImg.style.transform = 'scale(1)';

                    }

                }

            });

        });

    });

});