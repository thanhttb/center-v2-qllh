import React from 'react';
import { Stepper, Step, StepButton, StepLabel } from '@mui/material';

function EntranceStep({ steps, activeStep, handleStep }) {
  return (
    <>
      <Stepper nonLinear alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label.name}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              <StepLabel>{label.name}</StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </>
  );
}

export default EntranceStep;
