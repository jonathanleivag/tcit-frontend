import { Toaster } from 'react-hot-toast'
import FormCreateComponent from './components/formCreate.component'
import FormSearchComponent from './components/formSearch.component'
import TablePostComponent from './components/tablePost.component'

function App() {
  return (
    <>
      <Toaster position='top-right' />
      <header className='bg-white'>
        <section className='container mx-auto flex flex-col items-center'>
          <img
            src='/logo.webp'
            alt='Logo'
            className='w-56 h-24 object-contain mb-6'
          />
          <h1 className='text-center text-4xl font-bold text-primary'>
            CRUD con Redux Toolkit
          </h1>
        </section>
      </header>
      <main className='container mx-auto py-5'>
        <FormSearchComponent />
        <TablePostComponent />
        <FormCreateComponent />
      </main>
    </>
  )
}

export default App
