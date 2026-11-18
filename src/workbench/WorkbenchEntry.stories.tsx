import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { SheetProvider } from '../components/Sheet'
import { Works } from '../sections/Works'

const meta = {
  title: '作品／作品集入口',
  component: Works,
  decorators: [(Story) => <SheetProvider><Story /></SheetProvider>],
} satisfies Meta<typeof Works>
export default meta

// Claude v0.1：WB-01，沿用正式作品卡與介紹面板。
export const WorkbenchSheet: StoryObj<typeof meta> = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '看Kevin 工作檯的介紹' }))
    await waitFor(() => expect(canvas.getByRole('dialog', { name: 'Kevin 工作檯' })).toBeVisible())
    const link = canvas.getByRole('link', { name: '試用示範' })
    await expect(link).toHaveAttribute('href', './workbench/')
    await expect(link).not.toHaveAttribute('target')
  },
}
