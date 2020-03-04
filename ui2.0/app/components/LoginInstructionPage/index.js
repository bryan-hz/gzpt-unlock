import React from 'react';
import InstructionPageIMG from 'images/instruction_page.svg';
import InputDemoGIF from 'images/input_demo.gif';
import GIF from 'components/GIF';

export default () => (
  <>
    <img src={InstructionPageIMG} alt="instruction page" />
    <GIF src={InputDemoGIF} alt="input demo gif" />
  </>
);
