import * as React from 'react';
import { Speech } from './SpeechModule';
import { createStore, ShellAction } from './Store';

export interface IAudioComponentProps {
    text?: string,
    locale: string
}

// TODO: Should this be propagated from somewhere else?
const playSpeech = (text: string, locale: string) => {
    Speech.SpeechSynthesizer.speak(text, locale);
    Speech.SpeechRecognizer.startRecognizing();
    const store = createStore();
    store.dispatch<ShellAction>({
        type: "Listening_Start"
    });
}

export const AudioComponent = (props: IAudioComponentProps) => {
    let audioElement: JSX.Element = null;
    const containsAudio = props.text && props.text.trim().length > 0;
    if (containsAudio) {
        audioElement = <svg onClick={ () => playSpeech(props.text, props.locale) } className="wc-speak-icon" width="15px" height="15px" viewBox="0 0 75 75">
            <g id="g1">
                <polygon id="polygon1" points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769"></polygon>
                <path id="path1" d="M 48.128,49.03 C 50.057,45.934 51.19,42.291 51.19,38.377 C 51.19,34.399 50.026,30.703 48.043,27.577"></path>
                <path id="path2" d="M 55.082,20.537 C 58.777,25.523 60.966,31.694 60.966,38.377 C 60.966,44.998 58.815,51.115 55.178,56.076"></path>
                <path id="path1" d="M 61.71,62.611 C 66.977,55.945 70.128,47.531 70.128,38.378 C 70.128,29.161 66.936,20.696 61.609,14.01"></path>
            </g>
        </svg>;
    }

    return audioElement;
}