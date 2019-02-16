var ZadaciAjax = (function () {
    var konstruktor = function (callbackFn) {
        var poslan = 0;
        var greska = JSON.stringify({ greska: "Već ste uputili zahtjev" });
        return {
            dajXML: function () {
                var ajax = new XMLHttpRequest();
                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        callbackFn(ajax.responseText);
                        poslan = 0;
                    }

                }
                ajax.ontimeout = function () {
                    ajax.abort();
                    poslan = 0;
                }
                if (poslan == 1) {
                    callbackFn(greska);
                }
                else {
                    poslan = 1;
                    ajax.open("GET", "http://localhost:8080/zadaci", true);
                    ajax.setRequestHeader("Accept", "application/xml");
                    ajax.timeout = 2000;
                    ajax.send();
                }
            },

            dajCSV: function () {
                var ajax = new XMLHttpRequest();

                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        callbackFn(ajax.responseText);
                        poslan = 0;
                    }

                }
                ajax.ontimeout = function () {
                    ajax.abort();
                    poslan = 0;
                }
                if (poslan == 1) {
                    callbackFn(greska);
                }
                else {
                    poslan = 1;
                    ajax.open("GET", "http://localhost:8080/zadaci", true);
                    ajax.timeout = 2000;
                    ajax.setRequestHeader("Accept", "text/csv");
                    ajax.send();
                }
            },

            dajJSON: function () {
                var ajax = new XMLHttpRequest();

                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        callbackFn(ajax.responseText);
                        poslan = 0;
                    }

                }
                ajax.ontimeout = function () {
                    ajax.abort();
                    poslan = 0;
                }
                if (poslan == 1) {
                    callbackFn(greska);
                }
                else {
                    poslan = 1;
                    ajax.open("GET", "http://localhost:8080/zadaci", true);
                    ajax.timeout = 2000;
                    ajax.setRequestHeader("Accept", "application/json");
                    ajax.send();
                }
            }
        }
    }
    return konstruktor;
}());
