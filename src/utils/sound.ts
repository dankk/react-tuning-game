import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();

export function playSound(note: string) {
  console.log({ note });
  synth.triggerAttackRelease(note, "8n");
}
