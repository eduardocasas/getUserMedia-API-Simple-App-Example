$(document).ready
(
    function()
    {

        var canvas = $('#canvas'),
            cxt = canvas[0].getContext('2d'),
            video = $('#video'),
            video = video[0];

        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                { 'video': true },
                function(stream)
                {
                    video.src = stream;
                    video.play();
                }
            );
        } else if (navigator.webkitGetUserMedia) {
            navigator.webkitGetUserMedia
            (
                { 'video': true },
                function(stream)
                {
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                }
            );
        } else if (navigator.mozGetUserMedia) {
            navigator.mozGetUserMedia
            (
                { 'video': true },
                function(stream)
                {
                    video.mozSrcObject = stream;
                    video.play();
                },
                function(err)
                {
                    alert('An error occured! '+err);
                }
            );
        }
        $('#photo').click
        (
            function()
            {
                cxt.drawImage(video, 0, 0, 450, 368);
            }
        );
    }
);
