
import DogSelector from './components/DogSelector';


export default function Home() {
  return (
    <main className="flex min-h-screen  flex-col items-center p-24">
      <h1 className="text-4xl font-bold text-center">
        Welcome to Dog Selector Pro
      </h1>

      <p className='text-sm text-gray-800 py-2'> Select dog breed, or subbreeds and view a random dog image </p>

      <DogSelector/>

    </main>
  )
}
