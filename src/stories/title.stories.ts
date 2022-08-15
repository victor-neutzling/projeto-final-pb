
import { Meta, Story } from '@storybook/angular';

import { action } from '@storybook/addon-actions';


import { ControlContainer } from '@angular/forms';
import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { titleComponent } from './title.component';

export default{
  component: titleComponent,
  title: 'Title',
  excludeStories: /.*Data$/,
  argTypes:{
    title:{
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
