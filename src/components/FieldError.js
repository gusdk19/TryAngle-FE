export default function FieldError({ label, error }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <label className="text-[16px] font-semibold text-[#4A483F]">
        {label}
      </label>
      {error && (
        <span className="text-red-500 text-sm flex items-center gap-1">
          ⚠️ {error}
        </span>
      )}
    </div>
  );
}