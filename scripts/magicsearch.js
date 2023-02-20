


async function GetRandomCard(queryString) {
    try {
        let response = await fetch(queryString);
        let cardResults = await response.json();
        return cardResults;
    } catch (e) {
        console.warn(e);
    }
}

function BuildRandomQuery() {
    try {
        let queryObject = BuildQueryObject();
        let queryToUse = "";
        queryToUse = queryToUse + AddQueryWithConnector(BuildColorQuery(queryObject), queryToUse);
        queryToUse = queryToUse + AddQueryWithConnector(BuildTypeQuery(queryObject), queryToUse);
        queryToUse = queryToUse + AddQueryWithConnector(BuildLegendaryQuery(queryObject), queryToUse);
        queryToUse = queryToUse + AddQueryWithConnector(BuildFormatQuery(queryObject), queryToUse);
        return queryToUse;
    } catch (e) {
        console.warn(e);
    }
}

function AddQueryWithConnector(value, fullQuery) {
    let hasQueryStart = fullQuery.startsWith("?q=");
    if (value === "") {
        return "";
    }
    if (hasQueryStart) {
        return "+" + value;
    }
    return "?q=" + value;
}

function BuildLegendaryQuery(queryObject) {
    try {
        if (queryObject.legendary) {
            return "t:legend";
        }
        return "";
    } catch (e) {
        console.warn(e);
    }
}

function BuildColorQuery(queryObject) {
    try {
        let colorPrefix = "-c:";
        let colorQuery = ""
        if (queryObject.includeColors) {
            colorPrefix = "c:"
        }
        if (colorPrefix == "c:") {
            colorQuery = colorPrefix;
            if (queryObject.black) {
                colorQuery += "b";
            }
            if (queryObject.blue) {
                colorQuery += "u";
            }
            if (queryObject.green) {
                colorQuery += "g";
            }
            if (queryObject.red) {
                colorQuery += "r";
            }
            if (queryObject.white) {
                colorQuery += "w";
            }
            if (queryObject.colorless) {
                colorQuery += "c";
            }
        } else {
            const listOfColorQueries = [];
            if (queryObject.black) {
                listOfColorQueries.push(colorPrefix + "b");
            }
            if (queryObject.blue) {
                listOfColorQueries.push(colorPrefix + "u");
            }
            if (queryObject.green) {
                listOfColorQueries.push(colorPrefix + "g");
            }
            if (queryObject.red) {
                listOfColorQueries.push(colorPrefix + "r");
            }
            if (queryObject.white) {
                listOfColorQueries.push(colorPrefix + "w");
            }
            if (queryObject.colorless) {
                listOfColorQueries.push(colorPrefix + "c");
            }
            for (queryIndex = 0; queryIndex < listOfColorQueries.length; queryIndex++) {
                if (queryIndex === 0) {
                    colorQuery += listOfColorQueries[queryIndex];
                } else {
                    colorQuery += "+" + listOfColorQueries[queryIndex];
                }
            }
        }
        if (colorQuery === "-c:" || colorQuery === "c:") {
            return "";
        }
        return colorQuery;
    } catch (e) {
        console.warn(e);
    }
}

function BuildTypeQuery(queryObject) {
    try {
        if (queryObject.cardType === "") {
            return "";
        }
        return `t:${queryObject.cardType}`;
    } catch (e) {
        console.warn(e);
    }
}

function BuildFormatQuery(queryObject) {
    try {
        if (queryObject.format === "") {
            return "";
        }
        return `f:${queryObject.format}`;
    } catch (e) {
        console.warn(e);
    }
}

function BuildQueryObject() {
    let queryObject = {};
    try {
        queryObject.cardType = document.getElementById("type-selector").value;
        queryObject.format = document.getElementById("format-selector").value;
        queryObject.includeColors = !document.getElementById("exclude-colors").checked;
        queryObject.black = document.getElementById("color-black").checked;
        queryObject.blue = document.getElementById("color-blue").checked;
        queryObject.green = document.getElementById("color-green").checked;
        queryObject.red = document.getElementById("color-red").checked;
        queryObject.white = document.getElementById("color-white").checked;
        queryObject.colorless = document.getElementById("color-colorless").checked;
        queryObject.legendary = document.getElementById("only-legendary").checked;
        return queryObject;
    } catch (e) {
        console.warn(e);
    }
}

function PopulateCardInformation(cardInfo) {
    try {
        let cardInfoSection = document.getElementById("card-info");
        cardInfoSection.innerHTML = "";
        let cardHeader = document.createElement("H1");
        let cardImage = document.createElement("img");
        cardHeader.innerHTML = cardInfo.name;
        cardImage.setAttribute("src", cardInfo.image_uris.normal);
        cardImage.setAttribute("alt", "Magic Card Name");

        cardInfoSection.appendChild(cardHeader);
        cardInfoSection.appendChild(cardImage);

    } catch (e) {
        console.warn(e);
    }
}

async function SumbmitRandomCard() {
    try {
        let getRandomUrl = "https://api.scryfall.com/cards/random";
        let fetchUrl = getRandomUrl + BuildRandomQuery();
        let queryInfo = document.getElementById("query-info");
        queryInfo.innerHTML = "";
        let queryLink = document.createElement("a");
        queryLink.setAttribute("src", fetchUrl);
        queryLink.innerHTML = fetchUrl;
        queryInfo.appendChild(queryLink);
        let cardInfo = await GetRandomCard(fetchUrl);

        console.table(cardInfo);
        PopulateCardInformation(cardInfo);
    } catch (e) {
        console.warn(e);
    }
}

function SubmitThis() {
    SumbmitRandomCard();
}

let searchButton = document.getElementById("search-submit");

searchButton.addEventListener("click", SubmitThis);
