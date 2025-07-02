import Header from './components/Header';
import Footer from './components/Footer';
import VehicleSelector from './components/VehicleSelector'; // ✅ renamed correctly


export default function App() {
  return (
    <>
      <Header />
      <VehicleSelector/>
      <main className="p-10">
        <h2 className="text-2xl font-semibold">Homepage content here...</h2>
      </main>
       <Footer />
    </>
  );
}
