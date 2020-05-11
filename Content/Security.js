
function security_init(url) {
    $(document).ready(function () {
        // para todos los elementos raiz del menu tengo que buscar los items
        $(".checkSecured").each(function (index) {
            var inspectedElement = $(this);
            var requiredCredential = $(this).attr("data-credential");
            if (requiredCredential === null)
                inspectedElement.remove();
            $.ajax({
                type: 'GET',
                url: url,
                data: { credential: requiredCredential },
                dataType: 'json',
                cache: true,
                success: function (data) {
                    if (data.status != 0) {
                        inspectedElement.remove();
                    }
                }
            });
        });
    });
}