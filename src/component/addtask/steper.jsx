import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';

export default function StepperTabs({
  formSettings = {},
  setFormSettings = () => {},
}) {
  let steps = formSettings.stepsList;
  return (
    <Stepper sx={{ width: '100%' }}>
      {steps.map((step, index) => (
        <Step
          key={step}
          indicator={
            <StepIndicator
              variant={formSettings.activeStep <= index - 1 ? 'soft' : 'solid'}
              color={
                formSettings.activeStep < index - 1 ? 'neutral' : 'primary'
              }
            >
              {formSettings.activeStep <= index ? (
                index + 1
              ) : (
                <i className="fa-solid fa-check" />
              )}
            </StepIndicator>
          }
        >
          <StepButton
            onClick={() =>
              setFormSettings({ ...formSettings, activeStep: index })
            }
          >
            {step}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
}
