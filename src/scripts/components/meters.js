import { Component } from '../ui/component';
import { createHorizontalMeter, createBandedMeter } from '../ui/ui';

export const meters = (Tone) => {

    const parentElement = Component('meters');
    parentElement.classList.add('floater');

    const meter = new Tone.Meter();
    meter.smoothing = 0.1;

    const analyser = new Tone.Analyser;
    analyser.smoothing = 0.1;

    Tone.Master.chain(meter, analyser);

    createHorizontalMeter('rms-meter', 'rms', () => { 
        let value = meter.getLevel();
        const min = -60;
        const max = 0;
        if (value < min) {
            value = min;
        }
        if (value > max) {
            value = max;
        }
        return 1 - value / min;
    }, parentElement);

    createBandedMeter('spectrum-meter', 'spectrum', 64, () => {
        const values = analyser.getValue();
        return values.map(value => {
            const min = -200;
            const max = 0;
            if (value < min) {
                value = min;
            }
            if (value > max) {
                value = max;
            }
            return 1 - value / min;
        });

        // console.log(values);
        // return new Array(32).fill(0).map(e => Math.random());
    }, parentElement);

};