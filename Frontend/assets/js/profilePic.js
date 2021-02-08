$image_crop = $('#upload-image').croppie({
    enableExif: true,
    viewport: {
        width: 200,
        height: 200,
        type: 'circle'
    },
    boundary: {
        width: 250,
        height: 250
    }

});
$('#images').on('change', function() {
    var reader = new FileReader();
    reader.onload = function(e) {
        $image_crop.croppie('bind', {
            url: e.target.result
        }).then(function() {
            console.log('jQuery bind complete');
        });
    }
    reader.readAsDataURL(this.files[0]);
});