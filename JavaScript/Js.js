const iframe = document.getElementById("mainIframe");

function loadIframeFromURL() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") || ""; // Default to an empty string if no page is specified

    if (page === "") {
        // If no page is specified in the URL
        document.getElementById("backgroundAnime").style.display = "block"; // Show backgroundAnime
        document.getElementById("bIframe").style.display = "none"; // Hide bIframe
        document.title = "W3University"; // Set title to just the website name
        document.getElementById("threeLineIcon").style.display = "none"; // Hide threeLineIcon
    } else {
        // If a page is specified
        document.getElementById("backgroundAnime").style.display = "none"; // Hide backgroundAnime
        document.getElementById("bIframe").style.display = "flex"; // Show bIframe
        iframe.src = `./OtherRoutes/${page}.html`; // Load the iframe with the specified page
        document.getElementById("threeLineIcon").style.display = "block"; // Show threeLineIcon
    }
}



function updatePage(page) {
    iframe.src = `./OtherRoutes/${page}.html`;
    const newUrl = `${window.location.pathname}?page=${page}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    document.getElementById("sideBar").style.left = "-250px";
    document.getElementById("crossIcon").style.display = "none";
    document.getElementById("threeLineIcon").style.display = "block";

}

function updatePageUp(page) {
    document.getElementById("backgroundAnime").style.display = "none";
    document.getElementById("bIframe").style.display = "flex";
    document.getElementById("threeLineIcon").style.display = "block";
    iframe.src = `./OtherRoutes/${page}.html`;
    const newUrl = `${window.location.pathname}?page=${page}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
}

function showMenu() {
    document.getElementById("sideBar").style.left = "0px";
    document.getElementById("threeLineIcon").style.display = "none";
    document.getElementById("crossIcon").style.display = "block";
}

function hideMenu() {
    document.getElementById("sideBar").style.left = "-250px";
    document.getElementById("crossIcon").style.display = "none";
    document.getElementById("threeLineIcon").style.display = "block";
}


function hideIframe(page) {
    document.getElementById("backgroundAnime").style.display = "flex";
    document.getElementById("sideBar").style.left = "-250px";
    document.getElementById("bIframe").style.display = "none";
    document.getElementById("threeLineIcon").style.display = "none";

    const newUrl = `${window.location.pathname}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
}

iframe.onload = function () {
    const pageTitle = iframe.contentDocument.title;
    document.title = pageTitle ? `${pageTitle} | W3University` : "W3University";
};

document.getElementById("home").onclick = () => updatePageUp("home");
document.getElementById("about").onclick = () => updatePageUp("about");
document.getElementById("privacy").onclick = () => updatePageUp("privacy");
document.getElementById("list").onclick = () => updatePage("list");
document.getElementById("aboutHtml").onclick = () => updatePage("home");
document.getElementById("classes").onclick = () => updatePage("classes");
document.getElementById("elements").onclick = () => updatePage("elements");
document.getElementById("attributes").onclick = () => updatePage("attributes");
document.getElementById("headings").onclick = () => updatePage("headings");
document.getElementById("paragraphs").onclick = () => updatePage("paragraphs");
document.getElementById("styles").onclick = () => updatePage("styles");
document.getElementById("div").onclick = () => updatePage("div");
document.getElementById("id").onclick = () => updatePage("id");
document.getElementById("iframe").onclick = () => updatePage("iframe");
document.getElementById("forms").onclick = () => updatePage("forms");
document.getElementById("formAttributes").onclick = () => updatePage("formAttributes");
document.getElementById("formElements").onclick = () => updatePage("formElements");
document.getElementById("inputType").onclick = () => updatePage("inputType");
document.getElementById("inputFormAttributes").onclick = () => updatePage("inputFormAttributes");
document.getElementById("links").onclick = () => updatePage("links");
document.getElementById("favicon").onclick = () => updatePage("favicon");
document.getElementById("images").onclick = () => updatePage("images");
document.getElementById("page title").onclick = () => updatePage("page title");
document.getElementById("quotation").onclick = () => updatePage("quotation");
document.getElementById("comments").onclick = () => updatePage("comments");
document.getElementById("colors").onclick = () => updatePage("colors");
document.getElementById("css").onclick = () => updatePage("css");
document.getElementById("formatting").onclick = () => updatePage("formatting");


document.getElementById("threeLineIcon").onclick = () => showMenu();
document.getElementById("crossIcon").onclick = () => hideMenu();
document.getElementById("getstarted").onclick = () => updatePageUp("home");
document.getElementById("w3UniLogo").onclick = () => hideIframe();

window.onload = loadIframeFromURL;

