
jQuery(function () {
    jQuery(document).on("click", ".addtocart", function () {

        jQuery('body').find('#loader').show();
        //alert('clicked');
        var performanceid = jQuery(this).attr('data-performanceid');
        var catalogId = jQuery(this).attr('data-catalogId');
        var eventId = jQuery(this).attr('data-eventId');



        if (!performanceid) {
            performanceid = '';
        }

        if (jQuery(this).parents('div[class^="modal-content"]').length) {
            var div = jQuery(this).parents('div[class^="modal-content"]');
            var products = jQuery(div).find('.quantitytoadd');
        } else {
            var div = jQuery(this).parents('div.divaddcart');
            var products = jQuery(div).find('.quantitytoadd');
        }

        var options = jQuery(div).find('.attrselected');
        var optionselected = '';
        jQuery(options).each(function () {
            optionselected = optionselected + "," + jQuery(this).attr('data-optionid');
        });
//        var options = jQuery(div).find('.attributeitem input');
//        var optionselected = [];
//        jQuery(options).each(function () {
//            if (jQuery(this).is(':checked')) {
//                optionselected.push(jQuery(this).val());
//            }
//        });

        jQuery(products).each(function () {
            if (jQuery(this).attr('type') == 'checkbox') {

                if (!jQuery(this).is(':checked')) {

                    return true;
                }
            } else if (jQuery(this).attr('type') == 'hidden') {

            }
            var productid = jQuery(this).attr('data-productId');
            var quantity = jQuery(this).val();
            //var quantity = 1;

            if (quantity > 0) {
                jQuery.ajax({
                    async: false,
                    url: "index.php?option=com_snapp&task=cart.cart&productid=" + productid + "&quantity=" + quantity + "&performanceid=" + performanceid + "&options=" + optionselected + "&catalogId=" + catalogId + "&eventId=" + eventId + "&format=raw",
                    success: function (data) {
                        jQuery('#loader').hide();
                        data = JSON.parse(data);
                        if (data.error) {
                            alert(data.error);
                        }
                        if (data.text == "troppi") {
                            if (jQuery('#myModal').is(':visible')) {
                                jQuery('#myModal').modal('hide');
                            }
                            var priority = 'danger';
                            var title = 'Error';
                            var message = 'There is no more availability for this event';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                            //update_dispo(performanceid);
                        } else if (data.text == "max_number") {
                            if (jQuery('#myModal').is(':visible')) {
                                jQuery('#myModal').modal('hide');
                            }
                            var priority = 'danger';
                            var title = 'Error';
                            var message = 'You reached the maximum number of ticket per transaction';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                        } else if (data.text == "troppiperev") {
                            if (jQuery('#myModal').is(':visible')) {
                                jQuery('#myModal').modal('hide');
                            }
                            var priority = 'danger';
                            var title = data.title;
                            var message = data.Message;
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                        } else if (data.RequireAccount == "1") {

                            jQuery('#myModal').find(".modal-footer").html('<button type="button" class="btn btn-default canceladd" data-cartid="' + data.CartId + '" data-qty="' + data.added + '" data-catalogId="' + data.catalogId + '" data-dismiss="modal">Close</button><button type="button" data-cartid="' + data.CartId + '"  data-qty="' + data.added + '"  data-catalogId="' + data.catalogId + '" class="btn btn-default addaccount" data-performanceid="' + data.performanceId + '">Save</button>');
                            jQuery('#myModal').find(".modal-body").load("index.php?option=com_snapp&task=cart.accountform&format=raw&CartId=" + data.CartId + "&qty=" + data.added + "");
                            jQuery('#myModal').find(".modal-title").html("Add Personal Information");
                            if (jQuery('#myModal').is(':visible')) {

                            } else {
                                jQuery('#myModal').modal({
                                    backdrop: 'static',
                                    keyboard: false
                                }, 'show');
                            }
                            var priority = 'success';
                            var title = 'Success';
                            var message = 'This product requires customer information';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});

                        } else if (data.text == "priority") {
                            var priority = 'danger';
                            var title = 'Error';
                            var message = 'A priority product is required.';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});

                            jQuery('#myModal').find(".modal-footer").html('<button type="button" class="btn btn-primary addtocart" data-performanceid="' + data.performanceId + '" data-catalogId="' + data.catalogId + '">Add to Cart</button>');
                            jQuery('#myModal').find(".modal-body").load("index.php?option=com_snapp&task=cart.priority&catalogId=" + data.catalogId + "&performanceId=" + data.performanceId + "&format=raw");
                            jQuery('#myModal').find(".modal-title").html("A priority product is required. Please select at least one from the list below.");
                            if (jQuery('#myModal').is(':visible')) {

                            } else {
                                jQuery('#myModal').modal({
                                    backdrop: 'static',
                                    keyboard: false
                                }, 'show');
                            }


                        } else {
                            if (jQuery('#myModal').is(':visible')) {
                                jQuery('#myModal').modal('hide');
                            }
                            var priority = 'warning';
                             var title = data.title;
                            var message = data.Message;
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                            if (data.eventid) {
                                update_perf(data.eventid);
                            }
                        }
                        update_cart();
                    },
                    dataType: 'html'
                });
            } else {
                var priority = 'warning';
                var title = 'Warning';
                var message = 'Please Select a Quantity';
                jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                jQuery('#loader').hide();
            }
        });
    });
    jQuery(document).on("click", ".AddPromoToCart", function () {
        var performanceid = jQuery(this).attr('data-performanceid');
        if (!performanceid) {
            performanceid = '';
        }

        if (jQuery(this).parents('div[class^="modal-content"]').length) {
            var div = jQuery(this).parents('div[class^="modal-content"]');
            var products = jQuery(div).find('.quantitytoadd');
        } else {
            var div = jQuery(this).parents('div[class^="divaddcart"]');
            var products = jQuery(div).find('.quantitytoadd');
        }

        var options = jQuery(div).find('.attrselected');
        var optionselected = '';
        jQuery(options).each(function () {
            optionselected = optionselected + "," + jQuery(this).attr('data-optionid');
        });

        jQuery(products).each(function () {
            if (jQuery(this).attr('type') == 'checkbox') {

                if (!jQuery(this).is(':checked')) {

                    return true;
                }
            } else if (jQuery(this).attr('type') == 'hidden') {

            }
            var productid = jQuery(this).attr('data-productId');
            var quantity = jQuery(this).val();
            //var quantity = 1;
            if (quantity > 0) {
                jQuery.ajax({
                    async: false,
                    url: "index.php?option=com_snapp&task=cart.AddPromoToCart&productid=" + productid + "&quantity=" + quantity + "&performanceid=" + performanceid + "&options=" + optionselected + "&format=raw",
                    success: function (data) {
                        data = JSON.parse(data);
                        if (data.error) {
                            alert(data.error);
                        }
                        if (data.text == "troppi") {
                            if (jQuery('#myModal').is(':visible')) {
                                jQuery('#myModal').modal('hide');
                            }
                            var priority = 'danger';
                            var title = 'Error';
                            var message = 'There is no more availability for this event';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                            //update_dispo(performanceid);
                        } else if (data.text == "max_number") {
                            if (jQuery('#myModal').is(':visible')) {
                                jQuery('#myModal').modal('hide');
                            }
                            var priority = 'danger';
                            var title = 'Error';
                            var message = 'You reached the maximum number of ticket per transaction';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                        } else if (data.text == "priority") {
                            var priority = 'danger';
                            var title = 'Error';
                            var message = 'A priority product is required.';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});

                            jQuery('#myModal').find(".modal-footer").html('<button type="button" class="btn btn-primary addtocart">Add to Cart</button>');
                            jQuery('#myModal').find(".modal-body").load("index.php?option=com_snapp&task=cart.priority&catalogId=" + data.catalogId + "&performanceId=" + data.performanceId + "&format=raw");
                            jQuery('#myModal').find(".modal-title").html("A priority product is required. Please select at least one from the list below.");
                            if (jQuery('#myModal').is(':visible')) {

                            } else {
                                jQuery('#myModal').modal({
                                    backdrop: 'static',
                                    keyboard: false
                                }, 'show');
                            }

                        } else if (data.RequireAccount == "1") {

                            jQuery('#myModal').find(".modal-footer").html('<button type="button" class="btn btn-default canceladd" data-cartid="' + data.CartId + '" data-qty="' + data.added + '" data-dismiss="modal">Close</button><button type="button" data-cartid="' + data.CartId + '"  data-qty="' + data.added + '" class="btn btn-default addaccount" data-performanceid="' + jQuery(this).attr('data-performanceid') + '" >Save</button>');
                            jQuery('#myModal').find(".modal-body").load("index.php?option=com_snapp&task=cart.accountform&format=raw&CartId=" + data.CartId + "&qty=" + data.added + "");
                            jQuery('#myModal').find(".modal-title").html("Add Personal Information");
                            if (jQuery('#myModal').is(':visible')) {

                            } else {
                                jQuery('#myModal').modal({
                                    backdrop: 'static',
                                    keyboard: false
                                }, 'show');
                            }
                            var priority = 'success';
                            var title = 'Success';
                            var message = 'This product requires customer information';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});

                        } else {
                            if (jQuery('#myModal').is(':visible')) {
                                jQuery('#myModal').modal('hide');
                            }
                            var priority = 'success';
                            var title = 'Success';
                            var message = 'Item Added to cart!';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                            if (data.eventid) {
                                update_perf(data.eventid);
                            }
                        }
                        update_cart();
                    },
                    dataType: 'html'
                });
            } else {
                var priority = 'warning';
                var title = 'Warning';
                var message = 'Please Select a Quantity';
                jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
            }
        });
    });
    jQuery(document).on("click", ".addtocartv2", function () {

        if (jQuery(this).parents('div[class^="modal-content"]').length) {
            var div = jQuery(this).parents('div[class^="modal-content"]');
        } else {
            var div = jQuery(this).parents('div[class^="divaddcart"]');
        }
        var products = jQuery('form#formaddtocart').serialize().replace(/%5B%5D/g, '[]');

        var options = jQuery(div).find('.attributeitem input');
        var optionselected = [];
        jQuery(options).each(function () {
            if (jQuery(this).is(':checked')) {
                optionselected.push(jQuery(this).val());
            }
        });

        jQuery.ajax({
            async: false,
            url: "index.php?option=com_snapp&task=cart.cartv2&format=raw",
            data: products,
            success: function (data) {
                data = JSON.parse(data);
                if (data.error) {
                    alert(data.error);
                    return false;
                }
                jQuery(document).on("click", ".addperformancetocart", function () {
                    var performanceid = jQuery(this).attr('data-performanceid');
                    jQuery.ajax({
                        url: "index.php?option=com_snapp&task=cart.setperformance&format=raw&performanceId=" + performanceid,
                        success: function (data) {
                            update_cart();
                        },
                        dataType: 'html'
                    });
                });
                jQuery.ajax({
                    url: "index.php?option=com_snapp&task=event.getDays&format=raw&id=" + data.EventId + "&date_req=&type=2",
                    success: function (data) {
                        jQuery('#days').html(data);
                    },
                    dataType: 'html'
                });
                jQuery('#performances').html("<img src='components/com_snapp/assets/images/loading.gif' />");
                jQuery.ajax({
                    url: "index.php?option=com_snapp&task=event.getperformancelist&format=raw&id=" + data.EventId + "&date_req=&type=2",
                    success: function (data) {
                        jQuery('#performances').html(data);
                    },
                    dataType: 'html'
                });
                jQuery('#performanceselection').html(data.EventId);
                update_cart();
                var request = '';
                jQuery(document).ajaxComplete(function () {
                    jQuery('a.btn-date2').on("click", function (e) {

                        jQuery('a.btn-date2').removeClass('active');
                        jQuery(this).addClass('active');
                        jQuery('#performances').html("<img src='components/com_snapp/assets/images/loading.gif' class='img-responsive loading' />");
                        if (request) {

                            request.abort();
                        }
                        request = jQuery.ajax({
                            url: "index.php?option=com_snapp&task=event.getperformancelist&format=raw&id=" + data.EventId + "&date_req=" + jQuery(this).text() + "&type=2",
                            success: function (data) {
                                jQuery('#performances').html(data);
                            },
                            dataType: 'html'
                        });
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    });
                });
            }
        });
        return false;
        jQuery(products).each(function () {
            var productid = jQuery(this).attr('data-productId');
            var quantity = jQuery(this).valde();
            if (quantity > 0) {
                jQuery.ajax({
                    async: false,
                    url: "index.php?option=com_snapp&task=cart.cartv2&format=raw",
                    data: products,
                    success: function (data) {
                        data = JSON.parse(data);
                        if (data.error) {
                            alert(data.error);
                        }
                        if (data.text == "troppi") {
                            var priority = 'danger';
                            var title = 'Error';
                            var message = 'There is no more availability for this event';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                            //update_dispo(performanceid);
                        } else if (data.text == "max_number") {
                            var priority = 'danger';
                            var title = 'Error';
                            var message = 'You reached the maximum number of ticket per transaction';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                        } else if (data.text == "priority") {
                            var priority = 'danger';
                            var title = 'Error';
                            var message = 'A priority product is required.';
                            jQuery('#myModal').find(".modal-footer").html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'); //<button type="button" data-qty="' + data.added + '" class="btn btn-default addtocart">Add To Cart</button>
                            jQuery('#myModal').find(".modal-body").load("index.php?option=com_snapp&task=cart.priority&catalogId=" + data.catalogId + "&performanceId=" + data.performanceId + "&format=raw");
                            jQuery('#myModal').find(".modal-title").html("A priority product is required. Please select at least one from the list below.");
                            jQuery('#myModal').modal({
                                backdrop: 'static',
                                keyboard: false
                            }, 'show');
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                        } else if (data.RequireAccount == "1") {
                            jQuery('#myModal').modal('hide');
                            jQuery('#myModal').find(".modal-footer").html('<button type="button" class="btn btn-default canceladd" data-cartid="' + data.CartId + '" data-qty="' + data.added + '" data-dismiss="modal">Close</button><button type="button" data-cartid="' + data.CartId + '"  data-qty="' + data.added + '" class="btn btn-default addaccount" data-performanceid="' + jQuery(this).attr('data-performanceid') + '" >Save</button>');
                            jQuery('#myModal').find(".modal-body").load("index.php?option=com_snapp&task=cart.accountform&format=raw&CartId=" + data.CartId + "&qty=" + data.added + "");
                            jQuery('#myModal').find(".modal-title").html("Add Personal Information");
                            jQuery('#myModal').modal({
                                backdrop: 'static',
                                keyboard: false
                            }, 'show');

                            var priority = 'success';
                            var title = 'Success';
                            var message = 'This product requires customer information';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});

                        } else {
                            var priority = 'success';
                            var title = 'Success';
                            var message = 'Item Added to cart!';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                        }
                        update_cart();
                    },
                    dataType: 'html'
                });
            } else {
                var priority = 'warning';
                var title = 'Warning';
                var message = 'Please Select a Quantity';
                jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
            }
        });
    });

    jQuery(document).on("click", ".addtocartv3", function () {

        if (jQuery(this).parents('div[class^="modal-content"]').length) {
            var div = jQuery(this).parents('div[class^="modal-content"]');
            var products = jQuery(div).find('.quantitytoadd');
        } else {
            var div = jQuery(this).parents('div[class^="divaddcart"]');
            var products = jQuery(div).find('.quantitytoadd');
        }

        var performanceid = jQuery(div).find('.selected');
        if (!performanceid) {

            var priority = 'error';
            var title = 'Error';
            var message = 'Please Select a Performance';
            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});


            return false;
        }
        performanceid = performanceid.attr('data-performanceid');

        var options = jQuery(div).find('.attributeitem input');
        var optionselected = [];
        jQuery(options).each(function () {
            if (jQuery(this).is(':checked')) {
                optionselected.push(jQuery(this).val());
            }
        });

        addtocart('', products, performanceid);
    });


    function addtocart(quantity, products, performanceid, optionselected) {

        optionselected = '';

        jQuery(products).each(function () {
            if (jQuery(this).attr('type') == 'checkbox') {

                if (!jQuery(this).is(':checked')) {

                    return true;
                }
            } else if (jQuery(this).attr('type') == 'hidden') {

            }
            var productid = jQuery(this).attr('data-productId');

            var quantity = jQuery(this).val();

            //var quantity = 1;
            if (quantity > 0) {
                jQuery.ajax({
                    async: false,
                    url: "index.php?option=com_snapp&task=cart.cart&productid=" + productid + "&quantity=" + quantity + "&performanceid=" + performanceid + "&options=" + optionselected + "&format=raw",
                    success: function (data) {
                        data = JSON.parse(data);
                        if (data.error) {
                            alert(data.error);
                        }
                        if (data.text == "troppi") {
                            if (jQuery('#myModal').is(':visible')) {
                                jQuery('#myModal').modal('hide');
                            }
                            var priority = 'danger';
                            var title = 'Error';
                            var message = 'There is no more availability for this event';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                            //update_dispo(performanceid);
                        } else if (data.text == "max_number") {
                            if (jQuery('#myModal').is(':visible')) {
                                jQuery('#myModal').modal('hide');
                            }
                            var priority = 'danger';
                            var title = 'Error';
                            var message = 'You reached the maximum number of ticket per transaction';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                        } else if (data.text == "priority") {
                            var priority = 'danger';
                            var title = 'Error';
                            var message = 'A priority product is required.';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});

                            jQuery('#myModal').find(".modal-footer").html('<button type="button" class="btn btn-primary addtocart">Add to Cart</button>');
                            jQuery('#myModal').find(".modal-body").load("index.php?option=com_snapp&task=cart.priority&catalogId=" + data.catalogId + "&performanceId=" + data.performanceId + "&format=raw");
                            jQuery('#myModal').find(".modal-title").html("A priority product is required. Please select at least one from the list below.");
                            if (jQuery('#myModal').is(':visible')) {

                            } else {
                                jQuery('#myModal').modal({
                                    backdrop: 'static',
                                    keyboard: false
                                }, 'show');
                            }

                        } else if (data.RequireAccount == "1") {

                            jQuery('#myModal').find(".modal-footer").html('<button type="button" class="btn btn-default canceladd" data-cartid="' + data.CartId + '" data-qty="' + data.added + '" data-dismiss="modal">Close</button><button type="button" data-cartid="' + data.CartId + '"  data-qty="' + data.added + '" class="btn btn-default addaccount" data-performanceid="' + jQuery(this).attr('data-performanceid') + '" >Save</button>');
                            jQuery('#myModal').find(".modal-body").load("index.php?option=com_snapp&task=cart.accountform&format=raw&CartId=" + data.CartId + "&qty=" + data.added + "");
                            jQuery('#myModal').find(".modal-title").html("Add Personal Information");
                            if (jQuery('#myModal').is(':visible')) {

                            } else {
                                jQuery('#myModal').modal({
                                    backdrop: 'static',
                                    keyboard: false
                                }, 'show');
                            }
                            var priority = 'success';
                            var title = 'Success';
                            var message = 'This product requires customer information';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});

                        } else {
                            if (jQuery('#myModal').is(':visible')) {
                                jQuery('#myModal').modal('hide');
                            }
                            var priority = 'success';
                            var title = 'Success';
                            var message = 'Item Added to cart!';
                            jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                            window.location.href = 'index.php?option=com_snapp&view=checkout';
                            if (data.eventid) {
                                //update_perf(data.eventid);

                            }
                        }
                        //update_cart();
                    },
                    dataType: 'html'
                });
            } else {
                var priority = 'warning';
                var title = 'Warning';
                var message = 'Please Select a Quantity';
                jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
            }
        });

    }

    jQuery(document).on("click", '.chooseoptions', function () {
        var productid = jQuery(this).attr('data-productid');
        //if (confirm('Are you sure you want to delete it from your cart?')) {
        jQuery('#myModal').modal('hide');
        jQuery('#myModal').find(".modal-footer").html('<button type="button" class="btn btn-default canceladd" data-cartid="' + data.CartId + '" data-qty="' + data.added + '" data-dismiss="modal">Close</button><button type="button" data-cartid="' + data.CartId + '"  data-qty="' + data.added + '" class="btn btn-default addaccount" data-performanceid="' + jQuery(this).attr('data-performanceid') + '" >Save</button>');
        jQuery('#myModal').find(".modal-body").load("index.php?option=com_snapp&task=cart.chooseoptions&format=raw&CartId=" + data.CartId + "&qty=" + data.added + "");
        jQuery('#myModal').find(".modal-title").html("Add Personal Information");
        jQuery('#myModal').modal({
            backdrop: 'static',
            keyboard: false
        }, 'show');
        // }
        return false
    });

   


    jQuery(document).on("click", '.delcart', function () {
        var cartid = jQuery(this).attr('rel');
        jQuery('#loader').show();
        //if (confirm('Are you sure you want to delete it from your cart?')) {
        jQuery.ajax({
            url: 'index.php?option=com_snapp&&task=cart.delcartelem&format=raw&cartid=' + cartid,
            success: function (data) {
                jQuery('#loader').hide();
                update_cart("del");
                //update_dispo(data);

            },
            dataType: 'html'
        });
        // }
        return false
    });

    jQuery(document).on("click", '.cartquantity', function () {
        jQuery('#loader').show();
        var cartid = jQuery(this).attr('data-CartId');
        var type = jQuery(this).attr('data-type');
        //if (confirm('Are you sure you want to delete it from your cart?')) {
        jQuery.ajax({
            url: 'index.php?option=com_snapp&&task=cart.modifyQuantity&format=raw&cartid=' + cartid + '&type=' + type,
            success: function (data) {
                jQuery('#loader').hide();
                data = JSON.parse(data);

                update_cart();
                if (data.text == "troppiperev") {
                    if (jQuery('#myModal').is(':visible')) {
                        jQuery('#myModal').modal('hide');
                    }
                    var priority = 'danger';
                    var title = 'Error';
                    var message = data.Message;
                    jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                } else if (data.RequireAccount == "1") {

                    jQuery('#myModal').find(".modal-footer").html('<button type="button" class="btn btn-default canceladd" data-cartid="' + data.CartId + '" data-catalogId="' + data.catalogId + '" data-dismiss="modal">Close</button><button type="button" data-cartid="' + data.CartId + '"  data-qty="' + data.added + '"  data-catalogId="' + data.catalogId + '" class="btn btn-default addaccount" data-performanceid="' + data.performanceId + '">Save</button>');
                    jQuery('#myModal').find(".modal-body").load("index.php?option=com_snapp&task=cart.accountform&format=raw&CartId=" + data.CartId + "&qty=1");
                    jQuery('#myModal').find(".modal-title").html("Add Personal Information");
                    if (jQuery('#myModal').is(':visible')) {

                    } else {
                        jQuery('#myModal').modal({
                            backdrop: 'static',
                            keyboard: false
                        }, 'show');
                    }
                    var priority = 'success';
                    var title = 'Success';
                    var message = 'This product requires customer information';
                    jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});

                }
            },
            dataType: 'html'
        });
        // }
        return false
    });

    jQuery(document).on("click", ".canceladd", function () {
        var CartId = jQuery(this).attr('data-cartid');
        var qty = jQuery(this).attr('data-qty');
        jQuery.ajax({
            url: "index.php?option=com_snapp&&task=cart.canceladdcart&CartId=" + CartId + "&qty=" + qty + "&format=raw",
            //data: {'data':datastring},
            success: function (data) {
                update_cart();
            },
            dataType: 'html'
        });
        return false;
    });

    jQuery(document).on("click", ".clearselection", function () {

        var radios = jQuery('.' + jQuery(this).attr('data-id'));
        jQuery(radios).each(function () {
            jQuery(this).attr('checked', false);

        });
        jQuery(this).parents('.optioncontainer').find('.attributeitem').removeClass('attrselected');
    });

    jQuery(document).on("click", ".quantity", function () {

        var texttoadd = jQuery(this).attr('data-add');

        var q = Number(jQuery('#' + texttoadd).val());
        //var q = Number(jQuery(this).parent('.input-group').find('input').val());

        var value = Number(jQuery(this).attr('rel'));
        if (value + q >= 0) {
            jQuery('#' + texttoadd).val(value + q);
        }
    });
    jQuery(document).on("click", ".addaccount", function () {
        var error = '';
        var CartId = jQuery(this).attr('data-cartid');
        var performanceId = jQuery(this).attr('data-performanceId');
        var catalogId = jQuery(this).attr('data-catalogId');
        var qty = jQuery(this).attr('data-qty');
        var tabs = jQuery('.modal-body .nav-tabs > li');
        jQuery(tabs).each(function (i, t) {
            tab = jQuery(this).find('a');
            tab.trigger('click');

            if (jQuery('#accountform').valid({ignore: []})) {
                error = 0;
            } else {
                var priority = 'danger';
                var title = 'Error';
                var message = 'Mandatory fields not completed. Please check that all fields have been completed correctly for each Product.';
                jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                error = 1;
                return false;
            }
        });

        if (error == 1)
            return false;
        var datastring = jQuery("#accountform").serialize();

        //jQuery('#myModal').modal('hide');



        jQuery.ajax({
            url: "index.php?option=com_snapp&task=cart.addaccount&CartId=" + CartId + "&performanceId=" + performanceId + "&catalogId=" + catalogId + "&format=raw",
            data: datastring,
            success: function (data) {

                data = JSON.parse(data);

                if (data.error) {
                    jQuery.ajax({
                        url: "index.php?option=com_snapp&&task=cart.canceladdcart&CartId=" + CartId + "&qty=" + qty + "&format=raw",
                        //data: {'data':datastring},
                        success: function (data) {
                            update_cart();
                        },
                        dataType: 'html'
                    });
                    var priority = 'danger';
                    var title = 'Error';
                    var message = 'Mandatory fields not completed. Please check that all fields have been completed correctly for each Product.';
                    jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                } else if (data.text == "priority") {
                    var priority = 'danger';
                    var title = 'Error';
                    var message = 'A priority product is required.';
                    jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});

                    jQuery('#myModal').find(".modal-footer").html('<button type="button" data-catalogId="' + data.catalogId + '" data-performanceId="' + data.performanceId + '" class="btn btn-primary addtocart">Add to Cart</button>');
                    jQuery('#myModal').find(".modal-body").load("index.php?option=com_snapp&task=cart.priority&catalogId=" + data.catalogId + "&performanceId=" + data.performanceId + "&format=raw");
                    jQuery('#myModal').find(".modal-title").html("A priority product is required. Please select at least one from the list below.");
                    if (jQuery('#myModal').is(':visible')) {

                    } else {
                        jQuery('#myModal').modal({
                            backdrop: 'static',
                            keyboard: false
                        }, 'show');
                    }


                } else {
                    jQuery('#myModal').modal('hide');
                    var priority = 'success';
                    var title = 'Success';
                    var message = 'All personal information has been successfully saved';
                    jQuery.toaster({priority: priority, title: title, message: message, settings: {timeout: 3500}});
                    update_cart();
                }
            },
            dataType: 'html'
        });

        return false;
    });

    function update_perf(eventid) {
        var days = jQuery('#days');
        var dayactive = jQuery(days).find('a.active').text();

        jQuery("#performances").html("<img src=\"components/com_snapp/assets/images/loading.gif\" class='loading' />");
        jQuery.ajax({
            url: "index.php?option=com_snapp&task=event.getperformancelist&format=raw&id=" + eventid + "&date_req=" + dayactive,
            success: function (data) {
                jQuery("#performances").html(data);
            },
            dataType: "html"
        });


    }
    jQuery(document).ready(function () {
        jQuery('[data-toggle="tooltip"]').tooltip();
    });
    jQuery(document).on('click', '.attributeitem', function (event) {
        
        event.stopPropagation();
        event.stopImmediatePropagation();
        _this = jQuery(this);
        var sum = 0;
        if (_this.hasClass('attrselected') && !_this.hasClass('attrrequired')) {
           // _this.removeClass('attrselected');
            jQuery('.optionsselected #' + _this.attr('data-optionid')).remove();
        } else {
            jQuery(this).parents('.optioncontainer').find('.attributeitem').removeClass('attrselected');
            jQuery(this).addClass('attrselected');
         
        }
        jQuery('.attrselected').each(function (a, b) {
            sum = parseFloat(sum) + parseFloat(jQuery(this).attr('data-optionprice'));
        });
        jQuery('#product-price-options .price-value span').html(parseInt(sum).toFixed(2));
        jQuery('#product-price-final .price-value span').html(parseFloat(parseFloat(jQuery('#product-price-base .price-value span').html()) + parseFloat(sum)).toFixed(2));
    });
//    jQuery(function () {
//        jQuery('.text:not(input[type="email"])').keydown(function (e) {
//            var arr = [8, 16, 17, 20, 35, 36, 37, 38, 39, 40, 45, 46, 9, 32, 229,46, 27, 13, 110, 190, 65, 35, 36, 37, 38, 39, 40];
//            for (var i = 65; i <= 90; i++) {
//                arr.push(i);
//            }
//            if (jQuery.inArray(e.which, arr) === -1) {
//                e.preventDefault();
//            }
//        });
//        jQuery('.number').keydown(function (e) {
//
//            var arr = [46, 27, 13, 110, 190, 65, 35, 36, 37, 38, 39, 40];
//            for (var i = 65; i <= 90; i++) {
//                arr.push(i);
//            }
//            if (jQuery.inArray(e.which, arr) !== -1) {
//                e.preventDefault();
//            }
//        });
//    });

});

