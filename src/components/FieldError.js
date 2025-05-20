export default function FieldError({ label, error }) {

  const error_type = error == "최소 챌린지 비용을 입력해주세요" ? "challenge_cost" : "";

  return (
    <div className={`flex items-center gap-2 ${error_type == "challenge_cost" ? "" : "mb-2"}`}>
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