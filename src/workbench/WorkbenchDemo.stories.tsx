import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { WorkbenchDemo } from './WorkbenchDemo'

const meta = { title: '作品／Kevin 工作檯', component: WorkbenchDemo } satisfies Meta<typeof WorkbenchDemo>
export default meta
type Story = StoryObj<typeof meta>

// Claude v0.1：WB-02、WB-05
export const Week: Story = {}

// Claude v0.1：WB-02 至 WB-05，包含選取、摘要、首末頁與重置。
export const WorkToSlides: Story = {
  play: async ({ canvas, userEvent }) => {
    const steps = canvas.getByRole('tablist', { name: '示範步驟' })
    await expect(canvas.getByText('模擬資料', { exact: true })).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: /預算初稿/ }))
    await waitFor(() => expect(canvas.getByText('帳篷租金還在等報價，其餘項目已填入。')).toBeVisible())
    await userEvent.click(canvas.getByRole('button', { name: '看這些工作怎麼變成週報' }))
    await userEvent.click(canvas.getByRole('tab', { name: '完整版' }))
    await waitFor(() => expect(canvas.getByText(/目前還在等帳篷租金報價/)).toBeVisible())
    await expect(canvas.getByText('你選的工作')).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: '把這份週報放進簡報' }))
    await expect(canvas.getByRole('button', { name: '上一頁' })).toHaveAttribute('aria-disabled', 'true')
    const slide = canvas.getByRole('group', { name: '投影片 1／4' })
    slide.focus()
    await userEvent.keyboard('{ArrowRight}{ArrowRight}')
    await expect(canvas.getByRole('group', { name: '投影片 3／4' })).toHaveTextContent('預算初稿完成八成')
    const next = canvas.getByRole('button', { name: '下一頁' })
    await userEvent.click(next)
    await expect(next).toHaveAttribute('aria-disabled', 'true')
    await expect(canvas.getByText('你看完這週的示範了')).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: '從頭再看一次' }))
    await expect(canvas.getByRole('button', { name: /訪談三位攤主/ })).toHaveAttribute('aria-pressed', 'true')
    await expect(steps.querySelector('[aria-selected=true]')).toHaveTextContent('每週工作')
  },
}
