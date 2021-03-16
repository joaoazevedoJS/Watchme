import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import { GenresProvider } from './hooks/genres';

import './styles/global.scss';

export function App() {
  return (
    <GenresProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />

        <Content />
      </div>
    </GenresProvider>
  )
}