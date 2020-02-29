export default {
  input: {
    instruction: 'Please enter processor address:',
    placeholder: 'e.g 127.0.0.1',
    status: {
      connecting: 'connecting...',
      verified: 'verified',
      error: 'connection failed'
    }
  },
  instruction: {
    title: 'Please read the following',
    body:
      '- After entering correct processor address, a calibration screen will showup\n' +
      '- On the calibration screen, there will be a calibration point\n' +
      '- The position of that calibration point will change\n' +
      '- Please keep your gaze at that point\n' +
      '- When calibration process finishes, you will be redirected to homepage\n',
    footer: 'Thanks for using Gaze Authentication System!'
  },
  calibration: {
    instruction: 'Calibration is starting up...'
  }
};
