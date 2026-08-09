// scripts.js


// =========================================
// UNIVERSAL VIDEO PLAY FUNCTION
// Used by Showreel:
// onclick="playVideo(1)"
// =========================================

function playVideo(number) {

    const video = document.getElementById(`video${number}`);

    if (!video) {
        console.error(`Video video${number} nav atrasts.`);
        return;
    }


    // Ja šis video jau spēlē, apturam
    if (!video.paused) {

        video.pause();

        return;
    }


    // Apturam visus pārējos video
    document.querySelectorAll('video').forEach(otherVideo => {

        if (otherVideo !== video && !otherVideo.paused) {

            otherVideo.pause();

        }

    });


    // Palaižam izvēlēto video
    video.play().catch(error => {

        console.error(
            `Neizdevās palaist ${video.id}:`,
            error
        );

    });

}



// =========================================
// PAGE LOADED
// =========================================

document.addEventListener("DOMContentLoaded", () => {


    // =========================================
    // ALL VIDEOS ON CURRENT PAGE
    // =========================================

    const allVideos = document.querySelectorAll('video');


    console.log(`Atrasti ${allVideos.length} video.`);



    // =========================================
    // SHOWREEL VIDEO ITEMS
    // =========================================

    const videoItems = document.querySelectorAll('.video-item');


    videoItems.forEach(item => {

        const video = item.querySelector('video');
        const coverPhoto = item.querySelector('.cover-photo');


        // Ja nav video vai cover,
        // šo elementu neapstrādājam
        if (!video || !coverPhoto) {
            return;
        }


        const playButton = coverPhoto.querySelector('.play-button');
        const img = coverPhoto.querySelector('img');



        // =========================================
        // IMPORTANT:
        // NO CLICK LISTENER HERE
        //
        // Showreel HTML already has:
        // onclick="playVideo(number)"
        //
        // Therefore we must NOT add another
        // click event here.
        // =========================================



        // =========================================
        // HOVER EFFECTS
        // =========================================

        item.addEventListener('mouseenter', () => {

            if (video.paused && img) {

                img.style.filter = 'grayscale(0)';
                img.style.transform = 'scale(1.05)';

            }

        });


        item.addEventListener('mouseleave', () => {

            if (video.paused && img) {

                img.style.filter = 'grayscale(100%)';
                img.style.transform = 'scale(1)';

            }

        });



        // =========================================
        // VIDEO STARTS PLAYING
        // =========================================

        video.addEventListener('play', () => {

            coverPhoto.classList.add('hidden');


            if (playButton) {

                playButton.style.display = 'none';

            }


            if (img) {

                img.style.filter = 'grayscale(0)';

            }

        });



        // =========================================
        // VIDEO PAUSES
        // =========================================

        video.addEventListener('pause', () => {

            coverPhoto.classList.remove('hidden');


            if (playButton) {

                playButton.style.display = 'block';

            }


            if (img) {

                img.style.filter = 'grayscale(100%)';
                img.style.transform = 'scale(1)';

            }

        });



        // =========================================
        // VIDEO ENDS
        // =========================================

        video.addEventListener('ended', () => {

            coverPhoto.classList.remove('hidden');


            if (playButton) {

                playButton.style.display = 'block';

            }


            if (img) {

                img.style.filter = 'grayscale(100%)';
                img.style.transform = 'scale(1)';

            }

        });

    });



    // =========================================
    // ONLY ONE VIDEO PLAYS AT A TIME
    // =========================================

    allVideos.forEach(video => {

        video.addEventListener('play', () => {

            allVideos.forEach(otherVideo => {

                if (
                    otherVideo !== video &&
                    !otherVideo.paused
                ) {

                    otherVideo.pause();

                }

            });

        });

    });



    // =========================================
    // MOBILE CENTER EFFECT
    // =========================================

    if (window.matchMedia('(max-width: 820px)').matches) {

        const centerBlocks = document.querySelectorAll(
            '.video-container .block, .video-item, .about-grid article'
        );


        if (centerBlocks.length) {

            const centerObserver = new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add('center-active');

                        } else {

                            entry.target.classList.remove('center-active');

                        }

                    });

                },
                {
                    root: null,
                    rootMargin: '-20% 0px -30% 0px',
                    threshold: 0
                }
            );


            centerBlocks.forEach(block => {

                centerObserver.observe(block);

            });

        }

    }

});