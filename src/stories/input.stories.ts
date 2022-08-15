import { inputComponent } from './input.component';
import { Meta, Story } from '@storybook/angular';

import { action } from '@storybook/addon-actions';


import { ControlContainer } from '@angular/forms';
import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';

export default{
  component: inputComponent,
  title: 'Input',
  excludeStories: /.*Data$/,
  argTypes:{
    placeholder:{
        control: 'text',
    }
  }
} as Meta

export const actionsData = {
  onClick: action('onClick')
}

const template: Story = args =>({
  props:{
    ...args,
    onClick: actionsData.onClick,
  }
})

export const Default = template.bind({})
