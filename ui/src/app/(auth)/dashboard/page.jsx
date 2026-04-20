import ProductList from "./ProductList";

export default function Dashboard() {
  return (
    <div className="p-10 mt-18">
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to the Dashboard
      </h1>
      <div>
        <ProductList />
      </div>
    </div>
  );
}
