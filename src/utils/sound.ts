import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();
synth.volume.value = -2;

export function playSound(note: string) {
  synth.triggerAttackRelease(note, "4n");
}
