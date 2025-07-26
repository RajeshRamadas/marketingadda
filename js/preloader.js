// Preloader and content visibility logic moved from index.html for best practice

document.onreadystatechange = function () {
  if (document.readyState === "loading") {
    nodisplay_content();
    document.querySelector("body").style.visibility = "hidden";
  } else if (document.readyState === "complete") {
    display_content();
    nodisplayloading();
    document.querySelector("body").style.visibility = "visible";
    document.querySelector("body").setAttribute("aria-busy", "false");
  } else {
    document.querySelector("body").style.visibility = "visible";
    nodisplay_content();
    displayloading();
  }
};

function nodisplayloading() {
  const preloader_active = document.getElementsByClassName("preloader-active");
  if (preloader_active[0]) preloader_active[0].style.display = "none";
}

function displayloading() {
  const preloader_active = document.getElementsByClassName("preloader-active");
  if (preloader_active[0]) preloader_active[0].style.display = "block";
}

function display_content() {
  const preloader_header = document.getElementsByClassName("preloader-header");
  if (preloader_header[0]) preloader_header[0].style.visibility = "visible";

  const preloader_main = document.getElementsByClassName("preloader-main");
  if (preloader_main[0]) preloader_main[0].style.visibility = "visible";

  const preloader_footer = document.getElementsByClassName("preloader-footer");
  if (preloader_footer[0]) preloader_footer[0].style.visibility = "visible";
}

function nodisplay_content() {
  const preloader_header = document.getElementsByClassName("preloader-header");
  if (preloader_header[0]) preloader_header[0].style.visibility = "hidden";

  const preloader_main = document.getElementsByClassName("preloader-main");
  if (preloader_main[0]) preloader_main[0].style.visibility = "hidden";

  const preloader_footer = document.getElementsByClassName("preloader-footer");
  if (preloader_footer[0]) preloader_footer[0].style.visibility = "hidden";
}
