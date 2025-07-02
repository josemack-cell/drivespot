// src/components/VehicleSelector.jsx
export default function VehicleSelector() {
  return (
    <section className="bg-white py-6 shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Select Your Vehicle</h2>
          <p className="text-sm text-gray-500">To find compatible parts, select your vehicle</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <select className="border px-4 py-2 rounded text-sm">
            <option>Select Make</option>
          </select>
          <select className="border px-4 py-2 rounded text-sm">
            <option>Select Model</option>
          </select>
          <select className="border px-4 py-2 rounded text-sm">
            <option>Select Engine</option>
          </select>
          <button className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-dark">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
