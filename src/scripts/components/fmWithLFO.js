import { Component } from '../ui/component';
import { createButton, createSlider } from '../ui/ui';

export const fmWithLFO = (Tone) => {
    
    const parentElement = Component('fmWithLfo');

    const synth = new Tone.Synth().toMaster();

    const triggerAttackRelease = (note, length) => {
        synth.triggerAttackRelease(note, length);
    };

    const triggerAttack = (note) => {
        if (note) {
            synth.triggerAttack(note);
        } else {
            synth.triggerAttack(synth.frequency.value);
        }
    };

    const triggerRelease = () => {
        synth.triggerRelease();
    };

    const updateFreq = (freq) => {
        synth.frequency.rampTo(freq, 0.1);
    };
    
    createButton('play', 'play note', () => triggerAttackRelease("C4", "4n"), parentElement);
    createButton('play', 'trigger attack', () => triggerAttack(), parentElement);
    createButton('stop', 'trigger release', () => triggerRelease(), parentElement);
    
    createSlider(0, 10000, 'synth-freq', updateFreq, synth.frequency.value, 'Hz', parentElement);
};