$(document).ready(function () {
    // Image modal
    var modalbg = document.getElementById('modal-Bg');
    var modal = document.getElementById('modal-content-container');
    var modalImg = document.getElementById('modalImg');
    var fullscreenBtn = document.querySelector('.fullscreenBtn');
    var nextBtn = document.getElementById('next');
    var prevBtn = document.getElementById('prev');
    var gallery = $('#gallery');
    var currentIndex = 0;

    // Open modal when clicking on a gallery image
    gallery.on('click', '.gallery_img', function () {
        modalbg.style.display = 'flex';
        modal.style.display = 'flex';
        currentIndex = $(this).parent().index(); // Adjusted to get the index of the parent div
        updateModalImage();
    });

    // Close modal when clicking on the close button
    $('.close').click(function () {
        modalbg.style.display = 'none';
    });

    // Next and Previous buttons
    $('#next').click(function () {
        currentIndex = (currentIndex + 1) % gallery.children().length;
        updateModalImage();
    });

    $('#prev').click(function () {
        currentIndex = (currentIndex - 1 + gallery.children().length) % gallery.children().length;
        updateModalImage();
    });

    // Fullscreen button
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function () {
            modal.classList.toggle('fullscreen-mode');
            if (modal.classList.contains('fullscreen-mode')) {
                showCloseMessage();
            }
        });
    }

    // Function to update the modal image
    function updateModalImage() {
        var modalImgSrc = gallery.children().eq(currentIndex).find('.gallery_img').attr('src');
        modalImg.src = modalImgSrc;

        // Check if the modal image is offscreen and scroll the gallery to it
        var modalImgOffsetTop = gallery.children().eq(currentIndex).offset().top;
        var modalImgHeight = gallery.children().eq(currentIndex).height();
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();

        if (modalImgOffsetTop < scrollTop || modalImgOffsetTop + modalImgHeight > scrollTop + windowHeight) {
            // Scroll the gallery to the modal image
            $('html, body').animate({
                scrollTop: modalImgOffsetTop - (windowHeight - modalImgHeight) / 2
            }, 300);
        }

        // Check if the current image is the last one
        if (currentIndex === gallery.children().length - 1) {
            // Trigger the loading of more images
            $('#show-more-images-btn').trigger('click');
        }
    }

    // Function to show close message
    function showCloseMessage() {
        var closeMessage = document.createElement('div');
        closeMessage.classList.add('close-message');
        closeMessage.innerHTML = 'Click anywhere to close';

        modal.appendChild(closeMessage);

        setTimeout(function () {
            closeMessage.style.opacity = '0';
            setTimeout(function () {
                modal.removeChild(closeMessage);
            }, 500);
        }, 3000);
    }

    // Close modal and exit fullscreen mode when clicking anywhere
    $(document).click(function (event) {
        // Check if the click target is not within the modal and not within its fullscreen mode
        if (modal.contains(event.target) && !modal.classList.contains('fullscreen-mode') && !fullscreenBtn.contains(event.target)) {
            modalbg.style.display = 'none'; // Close the modal
        } else if (event.target === modal || event.target === modalImg) {
            modal.classList.remove('fullscreen-mode'); // Exit fullscreen mode if clicking inside the modal
        }
    });
});