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
    $('#imageCounter').show();
    $('#gallery_wrapper').show();
    $('#moreInfo').hide();
});

// Display moreInfo_wrapper and hide the gallery
$('#grid_btn_Info').click(function () {
    // Show moreInfo_wrapper and hide the gallery
    $('#moreInfo').show();
    $('#imageCounter').hide();
    $('#gallery_wrapper').hide();
});

$(document).ready(function () {
    $('.tab_links').click(function () {
        // Hide all articles
        $('.article_collection section').addClass('hidden');

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