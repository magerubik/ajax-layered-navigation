/**
 * Copyright © 2021 magerubik.com. All rights reserved.
 * @author Magerubik Team <info@magerubik.com>
 * @package Magerubik_AjaxLayer
 */

define(['jquery'], function ($) {
        'use strict';

        return {
            /**
             * Start full page loader action
             */
            startLoader: function () {
                $('#ln_overlay').show();
            },

            /**
             * Stop full page loader action
             */
            stopLoader: function () {
                $('#ln_overlay').hide();
                $('.swatch-option-tooltip').hide();
            }
        };
    }
);
