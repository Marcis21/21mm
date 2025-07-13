//scripts.js

function playVideo(index) {
    var video = document.getElementById('video' + index);
    var cover = document.getElementsByClassName('cover-photo')[index];
    var playButton = cover.getElementsByClassName('play-button')[0];

    // Atrodam attiecīgo video un cover-photo elementus
    var currentVideo = document.getElementById('video' + index);

    // Ja video tiek atskaņots
    if (currentVideo.paused) {
        currentVideo.play();
        cover.classList.add('hidden');  // Paslēpt cover-photo
        playButton.style.display = 'none';  // Paslēpt play pogu
    } else {
        currentVideo.pause();
        playButton.style.display = 'block';  // Parāda play pogu
    }
}

// Pievieno peles kustības klausītāju
var videos = document.querySelectorAll('.video-item');
videos.forEach(function(video, index) {
    video.addEventListener('mouseenter', function() {
        var cover = video.querySelector('.cover-photo');
        var img = cover.querySelector('img');
        if (video.querySelector('video').paused) {
            cover.classList.add('hover'); // Uz hover atgriež sākotnējo stāvokli
            img.style.filter = 'grayscale(0)'; // Attēls kļūst krāsains
            img.style.transform = 'scale(1.05)'; // Neliels zoom efekts
        }
    });

    video.addEventListener('mouseleave', function() {
        var cover = video.querySelector('.cover-photo');
        var img = cover.querySelector('img');
        if (video.querySelector('video').paused) {
            cover.classList.remove('hover'); // Noņem hover efektu, kad pele iznāk
            img.style.filter = 'grayscale(100%)'; // Atgriež melnbaltu attēlu
            img.style.transform = 'scale(1)'; // Atgriež sākotnējo izmēru
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        const coverPhoto = item.querySelector('.cover-photo');
        const playButton = coverPhoto.querySelector('.play-button');
        const img = coverPhoto.querySelector('img');
        
        // Funkcija, kas atjauno cover-photo krāsu atbilstoši video stāvoklim
        const updateCoverPhotoState = () => {
            if (video.paused || video.ended) {
                img.style.filter = 'grayscale(100%)'; // Atgriež melnbaltu attēlu, kad video ir apturēts
            } else {
                img.style.filter = 'grayscale(0)'; // Krāsains attēls, kad video tiek atskaņots
            }
        };

        // Ja video sāk atskaņošanu
        video.addEventListener('play', () => {
            coverPhoto.classList.add('hidden'); // Slēpj cover-photo, kad video sākas
            updateCoverPhotoState();
        });

        // Ja video tiek apturēts
        video.addEventListener('pause', () => {
            if (pauseTriggeredByHover) {
                coverPhoto.classList.remove('hidden'); // Tikai ja hover notikums izraisīja pauzi
            }
            updateCoverPhotoState();
        });

        // Ja video beidzas
        video.addEventListener('ended', () => {
            coverPhoto.classList.remove('hidden'); // Atgriež cover-photo, kad video beidzas
            updateCoverPhotoState();
        });

        // Kad peli pārvietojas prom no video un tas ir apturēts
        coverPhoto.addEventListener('mouseleave', () => {
            if (video.paused) {
                pauseTriggeredByHover = true;
                coverPhoto.classList.remove('hidden'); // Parāda cover-photo, kad kursors aiziet
                updateCoverPhotoState(); // Atjauno cover-photo krāsu (melnbalta)
            }
        });
    });

    // Ja tiek uzklikšķināts uz cita video, pārtrauc iepriekšējo video un atjauno cover-photo
    videoItems.forEach((videoItem, index) => {
        videoItem.addEventListener("click", function () {
            const video = videoItem.querySelector("video");
            pauseTriggeredByHover = false;
            videoItems.forEach((otherItem, i) => {
                const otherVideo = otherItem.querySelector("video");
                const otherCoverPhoto = otherItem.querySelector(".cover-photo");
                if (i !== index && !otherVideo.paused) {
                    otherVideo.pause();
                    otherCoverPhoto.classList.remove("hidden");
                    const otherImg = otherCoverPhoto.querySelector("img");
                    otherImg.style.filter = "grayscale(100%)";
                    otherImg.style.transform = "scale(1)";
                }
            });
        });
    });
});
