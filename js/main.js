$(document).ready
(
    function()
    {

        var is_playing = true,
            canvas_1 = $('#canvas_1'),
            canvas_2 = $('#canvas_2'),
            canvas_3 = $('#canvas_3'),
            canvas_4 = $('#canvas_4'),
            cxt_1 = canvas_1[0].getContext('2d'),
            cxt_2 = canvas_2[0].getContext('2d'),
            cxt_3 = canvas_3[0].getContext('2d'),
            cxt_4 = canvas_4[0].getContext('2d'),
            video = $('#video'),
            video = video[0],
            red   = 1,
            green = 2,
            blue  = 3;

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
                is_playing = !is_playing;
            }
        );
        function setTone(context, canvas, color_unchange)
        {
            var imgData = context.getImageData(0, 0, canvas.width, canvas.height),
                pixels  = imgData.data,
                i = 0,
                grayscale;
            for (i, n = pixels.length; i < n; i += 4) {
                grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
                switch (color_unchange) {
                    case red:
                        pixels[i+1] = grayscale;
                        pixels[i+2] = grayscale;
                        break;
                    case green:
                        pixels[i  ] = grayscale;
                        pixels[i+2] = grayscale;
                        break;
                    case blue:
                        pixels[i  ] = grayscale;
                        pixels[i+1] = grayscale;
                        break;
                    default:
                        pixels[i  ] = grayscale;
                        pixels[i+1] = grayscale;
                        pixels[i+2] = grayscale;
                        break;
                
                }
            }
            context.putImageData(imgData, 0, 0);
        }
        window.setInterval
        (
            function()
            {
                if (is_playing) {
                    cxt_1.drawImage(video, 0, 0, 450, 368);
                    cxt_2.drawImage(video, 0, 0, 450, 368);
                    cxt_3.drawImage(video, 0, 0, 450, 368);
                    cxt_4.drawImage(video, 0, 0, 450, 368);
                    setTone(cxt_1, canvas_1[0]);
                    setTone(cxt_2, canvas_2[0], red);
                    setTone(cxt_3, canvas_3[0], green);
                    setTone(cxt_4, canvas_4[0], blue);
                }
            },
            100
        );

    }
);
