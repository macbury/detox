import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Dialog, { IDialogProps, DialogContent, DialogActions, DialogAction } from './index'
import { Paragraph } from '../form/Text'

export default {
  title: 'Dialogs/Base',
  component: Dialog
} as Meta<IDialogProps>;

const Template: Story<IDialogProps> = (args) => {
  return (
    <Dialog {...args}>
      <DialogContent>
        <Paragraph>Dialog content</Paragraph>
      </DialogContent>
      <DialogActions>
        <DialogAction small outline title="Button 1" onPress={() => null} />
        <DialogAction small title="Button 2" onPress={() => null} />
      </DialogActions>
    </Dialog>
  )
};

export const Example = Template.bind({});

Example.args = {
  visible: true
}