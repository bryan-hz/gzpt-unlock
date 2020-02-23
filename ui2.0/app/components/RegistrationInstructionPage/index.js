import React from 'react';
import InstructionPageIMG from 'images/instruction_page.svg';
import DemoGIF from 'images/registration_demo.gif';
import GIF from 'components/GIF';

export default () => (
  <>
    <img src={InstructionPageIMG} alt="instruction page" />
    <GIF src={DemoGIF} alt="demo gif" />
  </>
);
