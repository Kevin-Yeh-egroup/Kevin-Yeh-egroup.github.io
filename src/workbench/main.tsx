import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../fonts.generated.css'
import '../styles.css'
import { WorkbenchDemo } from './WorkbenchDemo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkbenchDemo />
  </StrictMode>,
)
