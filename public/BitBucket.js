function zamijeni(string, index, zamjena) {
    return string.substr(0, index) + zamjena + string.substr(index + zamjena.length);
}

function vratiUpit(naziv) {
    var kraj = 0;
    naziv = naziv.toLowerCase();
    var tmp = naziv;
    for (var i = naziv.length - 1; i >= 0; i--) {
        if (naziv[i] == 'z') {
            naziv = zamijeni(naziv, i, '0');
        }
        else {
            if (naziv[i] == '9') {
                naziv = zamijeni(naziv, i, 'a');
            }
            else {
                naziv = zamijeni(naziv, i, String.fromCharCode(naziv.charCodeAt(i) + 1));
            }
            kraj = 1;
            break;
        }
    }
    var string = "";
    if (kraj == 1) {
        string = '%28name+%3E%3D+%22' + tmp + '%22+AND+name+%3C+%22' + naziv + '%22%29';
    }
    else {
        string = '%28name%3E%3D+%22' + tmp + '%22%29';
    }
    return string;
}

var BitBucket = (function () {
    var konstruktor = function (key, secret) {

        var ajax = new XMLHttpRequest();
        var token = new Promise(function (resolve, reject) {
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    resolve(JSON.parse(ajax.responseText).access_token);
                }
                else if (ajax.readyState == 4) {
                    reject("Ne može se dobiti token");
                }
            }
            ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.setRequestHeader("Authorization", 'Basic ' + btoa(key + ':' + secret));
            ajax.send("grant_type=" + encodeURIComponent("client_credentials"));
        });

        return {
            ucitaj: function (nazivRepSpi, nazivRepVje, callbackFja) {
                token.then(function (rez) {
                    var ajax = new XMLHttpRequest();
                    var niz = [];
                    ajax.onreadystatechange = function () {
                        if (ajax.readyState == 4 && ajax.status == 200) {
                            var podaci = JSON.parse(ajax.responseText);
                            for (var i = 0; i < podaci.values.length; i++) {
                                var ima = 0;
                                var indeks = podaci.values[i].name.substr(podaci.values[i].name.length - 5);
                                for (var j = 0; j < niz.length; j++) {
                                    if (niz[j].index == indeks) {
                                        ima = 1;
                                    }
                                }
                                if (ima == 0) {
                                    niz.push({ imePrezime: podaci.values[i].owner.username, index: indeks });
                                }
                            }
                            if (!podaci.next) {
                                callbackFja(null, niz);
                            }
                            else {
                                ajax.open('GET', podaci.next);
                                ajax.setRequestHeader("Authorization", 'Bearer ' + rez);
                                ajax.send();
                            }

                        }
                    }

                    var q = vratiUpit(nazivRepSpi) + '+OR+' + vratiUpit(nazivRepVje);
                    ajax.open("GET", "https://api.bitbucket.org/2.0/repositories?role=member&q=" + q);
                    ajax.setRequestHeader("Authorization", 'Bearer ' + rez);
                    ajax.send();
                }).catch(function (err) {
                    callbackFja(err, null);
                });

            }
        }
    }

    return konstruktor;
}());