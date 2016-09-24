$(document).ready(function() {
    $("#buttonViewScan").click(function() {
        var url = "https://www.jasondavies.com/voynich/#" + $('#folio-select option:selected').text();
        window.open(url, '_blank');
    });

    $("#buttonVoynich").click(function() {
        $("#voynich-text").css("font-family", "Voynich");
        $("#buttonVoynich").attr('class', 'btn btn-primary');
        $("#buttonTranscription").attr('class', 'btn btn-default');
    });

    $("#buttonTranscription").click(function() {
        $("#voynich-text").css("font-family", "Lucida Console, Monaco, monospace");
        $("#buttonVoynich").attr('class', 'btn btn-default');
        $("#buttonTranscription").attr('class', 'btn btn-primary');
    });

    $(".word").mouseenter(function() {
        $(this).toggleClass('transcription-font');
    }).mouseleave(function() {
        $(this).toggleClass('transcription-font');
    });

    $('#folio-select').on('change', function() {
        $('#voynich-text').html('<p style="font-family: Lucida Console">Loading...</p>');
        var folio = "http://127.0.0.1:4000/voynich/folios/" + this.value + ".html";
        $.ajax({
            url: folio,
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                $('#voynich-text').html(data);
            }
        });
    });
});
``
