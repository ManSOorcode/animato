export default function Services() {
  return (
    <section className="w-full py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow">Service 1</div>
          <div className="p-6 bg-white rounded-xl shadow">Service 2</div>
          <div className="p-6 bg-white rounded-xl shadow">Service 3</div>
        </div>
      </div>
    </section>
  );
}
