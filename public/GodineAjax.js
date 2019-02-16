var GodineAjax = (function () {
    var konstruktor = function (divSadrzaj) {

        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var html = "";
                var odgovor = ajax.responseText;
                var jsoni = JSON.parse(odgovor);

                for (var i = 0; i < jsoni.length; i++) {

                    html = html + "<div class=godina> Naziv godine:" + jsoni[i].nazivGod + "<br>Naziv repozitorija vježbi:" + jsoni[i].nazivRepVje + "<br>Naziv repozitorija spirale: " + jsoni[i].nazivRepSpi + "</div>";
                }
                divSadrzaj.innerHTML = html;
            }
        }
        ajax.open("GET", "http://localhost:8080/godine", true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();

        return {
            osvjezi: function () {
                ajax.onreadystatechange = function () {
                    divSadrzaj.innerHTML = "";
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        var html = "";
                        var odgovor = ajax.responseText;
                        var jsoni = JSON.parse(odgovor);

                        for (var i = 0; i < jsoni.length; i++) {

                            html = html + "<div class=godina> Naziv godine:" + jsoni[i].nazivGod + "<br>Naziv repozitorija vježbi:" + jsoni[i].nazivRepVje + "<br>Naziv repozitorija spirale: " + jsoni[i].nazivRepSpi + "</div>";
                        }
                    }
                    divSadrzaj.innerHTML = html;
                }
                ajax.open("GET", "http://localhost:8080/godine", true);
                ajax.setRequestHeader('Content-Type', 'application/json');
                ajax.send();
            }

        }
    }

    return konstruktor;
}());