// Date
$(document).ready(function () {
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = today.toLocaleDateString('en-US', options);
    $('#details_banner_date').text(formattedDate);
});

// Change the visual of the gallery for left buttons
$('.gridButton').click(function () {
    // Reset active class for all buttons
    $('.gridButton').removeClass('active');

    // Add active class to the clicked button
    $(this).addClass('active');

    // Update the gallery based on the clicked button
    if ($(this).attr('id') === 'grid_btn_three') {
        // Code to show gallery with three columns
        $('#gallery').removeClass('grid-one').addClass('grid-three');
    } else if ($(this).attr('id') === 'grid_btn_one') {
        // Code to show gallery with one column
        $('#gallery').removeClass('grid-three').addClass('grid-one');
    }

    // Show the gallery and hide moreInfo_wrapper
    $('#gallery_wrapper').show();
    $('#moreInfo_wrapper').hide();
});

// Display moreInfo_wrapper and hide the gallery
$('#grid_btn_Info').click(function () {
    // Show moreInfo_wrapper and hide the gallery
    $('#moreInfo_wrapper').show();
    $('#gallery_wrapper').hide();
});

$(document).ready(function () {
    $('.tab_links').click(function () {
        // Hide all articles
        $('.article_collection article').addClass('hidden');

        // Remove 'active' class from all tab links
        $('.tab_links').removeClass('active');

        // Add 'active' class to the clicked tab link
        $(this).addClass('active');

        // Get the corresponding article id
        var articleId = $(this).attr('id').replace('-btn', '');

        // Show the corresponding article
        $('#' + articleId).removeClass('hidden');
    });
});

// Smooth Scrolling
$(document).ready(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

// Modal
$(document).ready(function () {
    // Image modal
    var modalbg = document.getElementById('modal-Bg');
    var modal = document.getElementById('imageModal');
    var modalImg = document.getElementById('modalImg');
    var galleryItems = $('.gallery_item');
    var currentIndex = 0;

    // Open modal when clicking on a gallery image
    $('.gallery_img').click(function () {
        modalbg.style.display = 'flex';
        modal.style.display = 'flex';
        currentIndex = $(this).index();
        updateModalImage();
    });

    // Close modal when clicking on the close button
    $('.close').click(function () {
        modalbg.style.display = 'none';
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal
    window.onclick = function (event) {
        if (event.target === modalbg) {
            modalbg.style.display = 'none';
        }
    };

    // Next and Previous buttons
    $('#next').click(function () {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateModalImage();
    });

    $('#prev').click(function () {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateModalImage();
    });

    // Function to update the modal image
    function updateModalImage() {
        modalImg.src = galleryItems.eq(currentIndex).find('.gallery_img').attr('src');
    }
});


// More images button
$(document).ready(function () {
    // Show more images in the gallery
    var numVisibleImages = 6; // Set the initial number of visible images
    var $galleryItems = $('.gallery_item');

    // Hide images beyond the initial visible set
    $galleryItems.slice(numVisibleImages).hide();

    // Show more images when the "Show more" button is clicked
    $('#show-more-images-btn').click(function () {
        numVisibleImages += 3; // Increase the number of visible images
        $galleryItems.slice(0, numVisibleImages).show();

        // Hide the "Show more" button if all images are visible
        if (numVisibleImages >= $galleryItems.length) {
            $(this).hide();
        }
    });

    // Hide the "Show more" button initially if there are no more images to show
    if ($galleryItems.length <= numVisibleImages) {
        $('#show-more-images-btn').hide();
    }
});