export default function FilterButtons({ filter, setFilter }) {
  const filters = ["all", "active", "completed"];
  return (
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`btn-small ${filter === f ? "btn-active" : ""}`}
        >
          {f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
