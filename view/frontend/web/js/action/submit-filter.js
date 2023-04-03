/**
 * Copyright © 2021 magerubik.com. All rights reserved.
 * @author Magerubik Team <info@magerubik.com>
 * @package Magerubik_AjaxLayer
 */
define(
    [
        'jquery',
        'mage/storage',
        'Magerubik_AjaxLayer/js/model/loader',
        'mage/apply/main',
        'ko'
    ],
    function ($, storage, loader, mage, ko) {
        'use strict';
        var productContainer   = $('#layer-product-list'),
            layerContainer     = $('.layered-filter-block-container'),
            quickViewContainer = $('#mrquickview-popup');
        return function (submitUrl, isChangeUrl, method) {
            /** save active state */
            var actives = [],
                data;
            $('.filter-options-item').each(function (index) {
                if ($(this).hasClass('active')) {
                    actives.push($(this).attr('attribute'));
                }
            });
            window.layerActiveTabs = actives;
            /** start loader */
            loader.startLoader();
            /** change browser url */
            if (typeof window.history.pushState === 'function' && (typeof isChangeUrl === 'undefined')) {
                window.history.pushState({url: submitUrl}, '', submitUrl);
            }
            if (method === 'post') {
                return storage.post(submitUrl).done(
                ).fail(
                    function () {
                        window.location.reload();
                    }
                ).always(function () {
                    loader.stopLoader();
                });
            }
            return storage.get(submitUrl).done(
                function (response) {
                    if (response.backUrl) {
                        window.location = response.backUrl;
                        return;
                    }
                    if (response.navigation) {
                        layerContainer.html(response.navigation);
                    }
                    if (response.products) {
                        productContainer.html(response.products);
                    }
                    if (response.quickview) {
                        quickViewContainer.html(response.quickview);
                    }
                    ko.cleanNode(productContainer[0]);
                    productContainer.applyBindings();
                    if (mage) {
                        mage.apply();
                    }
                }
            ).fail(
                function () {
                    window.location.reload();
                }
            ).always(
                function () {
                    var filterCurrent = $('.layered-filter-block-container .filter-current .items .item .filter-value');
                    filterCurrent.each(function(){
                        var el         = $(this),
                            colorLabel = el.html(),
                            colorAttr  = $('.filter-options .filter-options-item .color .swatch-option-link-layered .swatch-option');
                        colorAttr.each(function(){
                            var elA = $(this);
                            if(elA.attr('data-option-label') === colorLabel && !elA.hasClass('selected')){
                                elA.addClass('selected');
                            }
                        });
                    });
                    loader.stopLoader();
                }
            );
        };
    }
);