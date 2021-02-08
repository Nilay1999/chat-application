$image_crop = $('#upload-image').croppie({
    enableExif: true,
    viewport: {
        width: 150,
        height: 150,
        type: 'circle'
    },
    boundary: {
        width: 200,
        height: 200
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