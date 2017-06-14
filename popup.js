// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */

$(function () {
    var source = [{ title: "", FileName: "" }]; 

    var audio = $('<audio><source src="" type="audio/mpeg"></audio>')[0];
    var boton = $('<button class="btn btn-primary btn-lg play"></button>');
    var grp = $('<div class="btn-group">');
    var sonidos = $('<div class="" id="sonidos"></div>');

    var cSources = source.length;
    var nCol = 4;

    var wCol = 12 / nCol;
    $.getJSON("conf.json", function (data) {
        source = data.sounds;

        source.forEach(function (element, index, object) {
            var b = boton.clone();
            b[0].innerText = element.title;
            b.attr('data-source', element.FileName);
            if (element.Time !== undefined) {
                b.attr('data-tiempo', element.Time);
            }
            //b.addClass("col-sm-" + wCol);
            if (b.data('source') === "") {
                b.attr("disabled", "")
            }
            grp.append(b);

            if (((index + 1) % nCol) === 0 || (index + 1) === object.length) {
                sonidos.append(grp.clone());
                grp.html("");
            }
        });

        sonidos.insertBefore('#reproductor')

        var rep = $('#reproductor')[0];

        $('.play:enabled').on('click', function () {
            rep.src = "sources/" + $(this).data('source');
            rep.currentTime = $(this).data('tiempo');
            rep.load();
        });

        $('.play:disabled').on('click', function () {
            alert("no esta configurado.");
        });

    });
});
