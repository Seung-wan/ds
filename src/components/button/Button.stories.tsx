import Button from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'ui/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const ButtonStory: Story = {
  name: 'Button',
  render: () => {
    return <Button className="text-red-600">버튼</Button>;
  },
};
