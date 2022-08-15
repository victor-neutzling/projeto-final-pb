import { Meta, Story } from '@storybook/angular';

import { action } from '@storybook/addon-actions';

import { buttonComponent } from './button.component';
import { ControlContainer } from '@angular/forms';
import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';

export default{
  component: buttonComponent,
  title: 'button',
  excludeStories: /.*Data$/,
  argTypes:{
    value:{
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
