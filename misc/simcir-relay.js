//
// SimcirJS - Relay
//
// Copyright (c) 2017 Jim Hendricks
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//

// includes following device type:
//  Relay

(function($s) {

    'use strict';

    function createRelay(device) {
        var onValue = 1;
        var offValue = null;

        device.halfPitch = false;

        var input = device.addInput('', 'in');
        var select = device.addInput('', 'sel');

        var nc = device.addOutput('', 'nc');
        var no = device.addOutput('', 'no');

        var super_createUI = device.createUI;
        device.createUI = function () {
            super_createUI();

            var relayClient = $s.createSVGElement('g');
            device.$ui.append(relayClient);

            function draw() {
                var size = device.getSize();

                relayClient.children().remove();

                var g = $s.graphics(relayClient);

                g.attr['class'] = 'simcir-basicset-symbol';
                g.attr['type'] = 'relay';
                // in to switch
                g.moveTo(4, size.height / 4);
                g.lineTo(size.width / 3 - 1, size.height / 4);
                // switch base circle
                g.drawCircle(size.width / 3, size.height / 4, 2);
                // switch nc circle
                g.drawCircle(size.width / 3 * 2, size.height / 4, 2);
                // switch to nc
                g.moveTo(size.width / 3 * 2 + 1, size.height / 4);
                g.lineTo(size.width - 4, size.height / 4);
                // switch arm
                g.moveTo(size.width / 3 + 1, size.height / 4);
                if (select.getValue() === onValue) {
                    // energized
                    g.lineTo(size.width / 3 * 2 - 1, size.height / 4 + 7);
                } else {
                    // de-energized
                    g.lineTo(size.width / 3 * 2, size.height / 4 + 2);
                }
                // switch no circle
                g.drawCircle(size.width / 3 * 2, size.height / 4 + 8, 2);
                // switch to no
                g.moveTo(size.width / 3 * 2, size.height / 4 + 9);
                g.lineTo(size.width / 3 * 2, size.height / 4 * 3);
                g.lineTo(size.width - 4, size.height / 4 * 3);
                // coil
                g.moveTo(4, size.height / 4 * 3);
                g.curveTo(9, size.height / 2, 10, size.height / 4 * 3);
                g.curveTo(8, size.height, 7, size.height / 4 * 3);
                g.curveTo(13, size.height / 2, 14, size.height / 4 * 3);
                g.curveTo(12, size.height, 11, size.height / 4 * 3);
                g.curveTo(17, size.height / 2, 18, size.height / 4 * 3);
                g.lineTo(18, size.height);

                g.closePath();
            }

            draw();

            function updateRelay() {
                if (input.getValue() === onValue) {
                    if (select.getValue() === onValue) {
                        no.setValue(onValue);
                        nc.setValue(offValue);
                    } else {
                        no.setValue(offValue);
                        nc.setValue(onValue);
                    }
                } else {
                    no.setValue(offValue);
                    nc.setValue(offValue);
                }

                draw();
            }

            device.$ui.on('inputValueChange', updateRelay);

            device.doc = {
                description: 'double throw relay.',
                params: [],
                code: '{"type":"' + device.deviceDef.type + '"}'
            };
        };

    }

    $s.registerDevice('Relay', createRelay);

})(simcir);


