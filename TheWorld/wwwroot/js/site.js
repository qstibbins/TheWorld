// site.js
(function () {
    //var menuItems = $("ul.menu li a");
    //menuItems.on("click", function () {
    //  var me = $(this);
    //  alert(me.text());
    //});

    var $sidebarAndWrapper = $("#sidebar, #wrapper");
    var $icon = $("#sidebarToggle i.fa");

    $("#sidebarToggle").on("click", function () {
        $sidebarAndWrapper.toggleClass("hide-sidebar");
        if ($sidebarAndWrapper.hasClass("hide-sidebar")) {
            //$(this).text("Show Sidebar");
            $icon.removeClass("fa fa-angle-left");
            $icon.addClass("fa fa-angle-right");
        } else {
            //$(this).text("Hide Sidebar");
            $icon.removeClass("fa fa-angle-right");
            $icon.addClass("fa fa-angle-left");
        }
    });
})();