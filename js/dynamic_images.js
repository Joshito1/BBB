$(document).ready(function () {
    // Define folders
    var folders = ['cakes', 'cupcakes'];
    var imagesPerPage = 15; // Set the number of images to load per page
    var currentPage = 1; // Initial page
    var popupTriggered = false;
    var allImageFiles = []; // Initialize the array to store image files

    // Function to load images from all folders
    function loadImages(page) {
        var gallery = $('#gallery');
        var imageCounter = $('#imageCounter');
        var loadMoreButton = $('#show-more-images-btn');

        // Iterate through each folder
        folders.forEach(function (folder) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://github.com/Joshito1/BBB/sources/products/' + folder + '/', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) { // When request is complete
                    if (xhr.status === 200) { // If request is successful
                        var data = xhr.responseText;
                        var imageFiles = data.match(/href="(.*?\.(jpg|jpeg|png|gif|bmp|heic))"/gi);

                        if (imageFiles) {
                            // Check for non-Apple devices and remove HEIC images
                            if (!isAppleBrowser()) {
                                imageFiles = imageFiles.filter(function (file) {
                                    return !file.toLowerCase().includes('.heic');
                                });
                            }

                            allImageFiles.push.apply(allImageFiles, imageFiles);
                        }

                        // Proceed with processing the received data
                        // Update the DOM here if needed
                        updateGallery(gallery, imageCounter, loadMoreButton, page);
                        console.log('!Dynamically a Success!')
                    } else {
                        console.log('ERROR Dynamic Images Javascript ISSUE');
                    }
                }
            };
            xhr.send();
        });
    }

    // Function to update the gallery with loaded images
    function updateGallery(gallery, imageCounter, loadMoreButton, page) {
        // Calculate start and end indexes based on the current page
        var startIndex = (page - 1) * imagesPerPage;
        var endIndex = startIndex + imagesPerPage;

        // Loop through each image file in the specified range and add it to the gallery
        for (var i = startIndex; i < endIndex && i < allImageFiles.length; i++) {
            var imageName = allImageFiles[i].match(/href="(.*?\.(jpg|jpeg|png|gif|bmp|heic))"/i)[1];
            var imagePath = imageName.replace('.preview', '');
            gallery.append('<div class="gallery_item"><img class="gallery_img" loading="lazy" src="' + imagePath + '" alt="' + imageName + '"></div>');
        }

        // Update the image counter
        imageCounter.text('Mostrando ' + (startIndex + 1) + '-' + Math.min(endIndex, allImageFiles.length) + ' de ' + allImageFiles.length + ' imágenes.');

        // Update the amount of remaining images
        var remainingImages = allImageFiles.length - endIndex;
        $('#amount_images_remaining').text(remainingImages > 0 ? ' (' + remainingImages + ' more)' : '');

        // Check if there are remaining images
        if (remainingImages <= 0) {
            // Hide the "Load more" button if there are no remaining images
            loadMoreButton.hide();
        } else {
            // Show the "Load more" button if there are remaining images
            loadMoreButton.show();
        }

        // Check if the popup should be triggered
        if (!popupTriggered && !isAppleBrowser() && shouldTriggerPopup()) {
            popupTriggered = true;
            showCustomPopup(getBrowser());
        }
    }

    // Load images on page load
    loadImages(currentPage);

    // Load more button functionality
    $('#show-more-images-btn').on('click', function () {
        currentPage++;

        // Load more images when the "Load more" button is clicked
        loadImages(currentPage);
    });

    // Scroll event listener to check if the popup should be triggered
    $(window).on('scroll', function () {
        if (!popupTriggered && !isAppleBrowser() && shouldTriggerPopup()) {
            popupTriggered = true;
            showCustomPopup(getBrowser());
        }
    });

    // Check if the current browser is Safari
    function isAppleBrowser() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    // Get the current browser
    function getBrowser() {
        var userAgent = navigator.userAgent;

        if (/firefox/i.test(userAgent)) {
            return 'Firefox';
        }

        if (/edge/i.test(userAgent)) {
            return 'Edge';
        }

        if (/chrome/i.test(userAgent)) {
            return 'Chrome';
        }

        if (/safari/i.test(userAgent)) {
            return 'Safari';
        }

        if (/opera/i.test(userAgent)) {
            return 'Opera';
        }

        return 'Unknown';
    }

    // Check if the popup should be triggered based on the scroll position
    function shouldTriggerPopup() {
        var galleryElement = $('#gallery');
        var scrollPosition = $(window).scrollTop();
        var galleryHeight = galleryElement.height();
        var windowHeight = $(window).height();

        return scrollPosition > 1 * (galleryHeight - windowHeight);
    }

    // Show the custom popup based on the browser
    function showCustomPopup(browser) {
        // Check if "Do not show again" preference is set in local storage
        if (localStorage.getItem('doNotShowPopupAgain')) {
            return;
        }

        var popupHTML = '<div class="notifyBg" id="notify-Popup">' +
            '<div class="notify-Popup">' +
            '<p>Por favor, lea. <br> Parece que está usando el navegador <strong>' + browser + '. </strong> Y algunas imágenes pueden no mostrarse. Pero no se preocupe, podrá seguir viendo las que son soportadas. <br> - ¡Gracias por su comprensión! :) - </p>' +
            '<div><label><input type="checkbox" id="doNotShowAgainCheckbox"> No mostrar de nuevo</label>' +
            '<button id="popupOKBtn">OK</button></div>' +
            '</div>' +
            '</div>';

        $('body').append(popupHTML);

        // Add click event handler to close the popup when the "OK" button is clicked
        $('#popupOKBtn').on('click', function () {
            // Check if the "Do not show again" checkbox is checked
            if ($('#doNotShowAgainCheckbox').prop('checked')) {
                // Set the preference in local storage
                localStorage.setItem('doNotShowPopupAgain', true);
            }
            // Remove the popup
            $('#notify-Popup').remove();
        });
    }
});