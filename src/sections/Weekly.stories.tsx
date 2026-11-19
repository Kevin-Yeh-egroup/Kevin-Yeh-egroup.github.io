import { useLayoutEffect, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Weekly } from './Weekly'

const meta = {
  title: '首頁／科技與創作日報',
  component: Weekly,
  args: {
    issue: {
      id: 'weekly-example',
      date: '2026-11-19',
      read: '約 4 分鐘',
      title: '先用三張圖說清楚一個新功能',
      one: '先決定讀者要知道的事，再請 AI 排出三格畫面。',
    },
  },
} satisfies Meta<typeof Weekly>
export default meta

export const Latest: StoryObj<typeof meta> = {
  play: async ({ canvas, userEvent, args }) => {
    await expect(canvas.getByRole('heading', { name: args.issue!.title })).toBeVisible()
    const links = [
      canvas.getByRole('link', { name: '讀最新一期' }),
      canvas.getByRole('link', { name: /素材與做法/ }),
      canvas.getByRole('link', { name: /白話詞庫/ }),
      canvas.getByRole('link', { name: /往期/ }),
    ]
    await expect(links[0]).toHaveAttribute('href', './tech-creative-daily/#/issue/weekly-example')
    for (const link of links) {
      await userEvent.tab()
      await expect(link).toHaveFocus()
      await expect(link).not.toHaveAttribute('target')
    }
  },
}

export const Unavailable: StoryObj<typeof meta> = {
  args: { issue: null },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText('最新一期')).not.toBeInTheDocument()
    await expect(canvas.getByRole('link', { name: '到日報首頁' })).toHaveAttribute('href', './tech-creative-daily/')
    await expect(canvas.getByRole('link', { name: /白話詞庫/ })).toBeVisible()
  },
}

function DarkTheme({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const root = document.documentElement
    const previous = root.getAttribute('data-theme')
    root.dataset.theme = 'dark'
    return () => {
      if (previous === null) root.removeAttribute('data-theme')
      else root.dataset.theme = previous
    }
  }, [])
  return children
}

export const Dark: StoryObj<typeof meta> = {
  decorators: [(Story) => <DarkTheme><Story /></DarkTheme>],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('region', { name: '科技與創作日報' })).toHaveStyle({ backgroundColor: 'rgb(15, 30, 33)' })
    await expect(canvas.getByRole('link', { name: '讀最新一期' })).toBeVisible()
  },
}
