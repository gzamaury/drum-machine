export async function getBufferFromAudioElement(audioElement, audioContext) {
  const response = await fetch(audioElement.src);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

export function createSourceNodeFrom(audioBuffer, audioContext) {
  return new AudioBufferSourceNode(audioContext, {
    buffer: audioBuffer,
  });
}
