/**
 * @author Leo Arantes
 * @gitHub LeoArantes
 *
 * File and functions created by Leo Arantes to make it possible
 * to read an .ini file through a Javascript file.
 *
 * To make this code work, Google Chrome must be initialized with
 * the argument "--allow-file-access-from-files";
 *
 * Visit "https://github.com/LeoArantes/Read_ini_Files_with_Javascript" for more information.
 *
*/

/******************************************************************************************/

/**
 * This function will only return the value found from the name passed in and place it in a given ID.
 *
 * @param {path} file where is your .ini file;
 * @param {String} name the desired name;
 * @param {element id} id where the found lines will be returned;
 */
function findAndShowTheValue(file, name, id) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var text = rawFile.responseText;
                text = text.replace(/['\n]+/g, ';');
                text = text.split(';');
                text = text.filter(function (e) {
                    return e.replace(/(\r\n|\n|\r)/gm, "")
                });

                for (let j = 0; j < text.length; j++) {
                    var element = text[j];

                    if (element.includes(name)) {

                        element = element.split("=");

                        document.getElementById(id).innerHTML += element[1] + "<br/>";
                        break;
                    } else if (j === (text.length - 1)) {
                        document.getElementById(id).innerHTML += "Could not find the name '" + name.toUpperCase() + "'<br/>";
                    }
                }
            }
        }
    }
    rawFile.send(null);
}

/**
 * This function will return the lines found in the .ini file and place them under a given ID.
 *
 * @param {path} file where is your .ini file;
 * @param {String} wantedString the desired names or values separated by pipes ("|");
 * @param {element id} id where the found lines will be returned;
 */
function findAndViewMultipleResults(file, wantedString, id) {
    var wantedString = wantedString.split("|");

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var text = rawFile.responseText;
                text = text.replace(/['\n]+/g, ';');
                text = text.split(';');
                text = text.filter(function (e) {
                    return e.replace(/(\r\n|\n|\r)/gm, "")
                });

                for (let i = 0; i < wantedString.length; i++) {
                    const string = wantedString[i];

                    for (let j = 0; j < text.length; j++) {
                        const element = text[j];

                        if (element.includes(string)) {
                            document.getElementById(id).innerHTML += text[j] + "<br/>";
                            break;
                        } else if (j === (text.length - 1)) {
                            document.getElementById(id).innerHTML += "Could not find the name or value of '" + string.toUpperCase() + "'<br/>";
                        }
                    }
                }
            }
        }
    }
    rawFile.send(null);
}
