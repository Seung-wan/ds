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
    return (
      <Button asChild onClick={() => console.log('out')}>
        <label onClick={() => console.log('in')}>123</label>
      </Button>
    );
  },
};
