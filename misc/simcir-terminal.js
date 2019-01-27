//
// SimcirJS - Terminal
//
// Copyright (c) 2017 Jim Hendricks
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//

// includes following device type:
//  Terminal

(function($s) {

    'use strict';

    var onValue = 1;
    var offValue = null;

    $s.registerDevice('Terminal', function(device) {
        var numInputs = Math.max(1, device.deviceDef.numInputs || 4);
        var numOutputs = Math.max(1, device.deviceDef.numOutputs || 4);

        device.halfPitch = true;

        var i;

        for (i = 0; i < numOutputs; i += 1) {
            device.addOutput();
        }

        for (i = 0; i < numInputs; i += 1) {
            device.addInput();
        }

        device.$ui.on('inputValueChange', function() {
            var inputs = device.getInputs();
            var outputs = device.getOutputs();

            var input = offValue;

            var i;

            for( i = 0; i < inputs.length; i++ ) {
                if( inputs[i].getValue() === onValue ) {
                    input = onValue;
                    break;
                }
            }

            // set all the outputs to the combiled inputs
            for( i = 0; i < outputs.length; i++ ) {
                outputs[i].setValue(input);
            }
        });
        var super_createUI = device.createUI;
        device.createUI = function() {
            super_createUI();
            device.doc = {
                description: 'A Terminal Block to juncture connections',
                params: [
                    {name: 'numInputs', type: 'number', defaultValue: 4,
                        description: 'number of inputs.'},
                    {name: 'numOutputs', type: 'number', defaultValue: 4,
                        description: 'number of outputs.'}
                ],
                code: '{"type":"' + device.deviceDef.type + '","numInputs":4,"numOutputs":4}'
            };
        };
    });

})(simcir);
