jQuery(document).ready(function () {
    // Save
    jQuery(document).on("click", ".sidebar-toggle", function () {
        if (jQuery("body").hasClass("sidebar-collapse")) {
            SidebarCollapse = 1;
        }
        else
        {
            SidebarCollapse = 0;
        }
        VNPT.Common.Post(UpdateSidebar, JSON.stringify({ Sidebar: SidebarCollapse }), function (data) { });
    });

    jQuery(document).on('hidden.bs.modal', '.modal', function (e) {
        if (jQuery('.modal').hasClass('in')) {
            jQuery('body').addClass('modal-open');
        }
    });
})