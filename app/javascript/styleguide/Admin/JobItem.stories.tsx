import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import JobItem, { IJobItemProps } from './JobItem'

export default {
  title: 'Admin/JobItem',
  component: JobItem
} as Meta<IJobItemProps>;

const Template: Story<IJobItemProps> = (args) => {
  return <JobItem {...args} />
};

export const RunningJob = Template.bind({});

RunningJob.args = {
  link: { path: 'https://duckduckgo.com' },
  job: {
    lockedAt: new Date("2021-01-30T15:27:44.139Z"),
    jobClass: 'ExampleJobWorker',
    error: null,
    arguments: ['id', 'b']
  }
};

export const FailedJob = Template.bind({});

FailedJob.args = {
  link: { path: 'https://duckduckgo.com' },
  job: {
    lockedAt: null,
    jobClass: 'ExampleJobWorker',
    error: 'Oh no explosion',
    arguments: ['id', 'b']
  }
};