import { GerirLinhas } from './GerirLinhas'
import { FornecerLinhas } from './FornecerLinhas'
import { Login } from './Login'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import { GerirAutocarro } from './GerirAutocarro'
import { Analise } from './Analise'

export function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/linhas' element={<FornecerLinhas/>}/>
        <Route path='/gerir-linhas' element={<GerirLinhas/>}/>
        <Route path='/gerir-autocarros' element={<GerirAutocarro/>}/>
        <Route path='/analise' element={<Analise/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
