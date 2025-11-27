import { Checkbox } from "@/components/ui/checkbox";

const STATUS_OPTIONS = [
  { value: "pendente", label: "Pendente", color: "bg-yellow-100 border-yellow-500 text-yellow-700" },
  { value: "confirmado", label: "Confirmado", color: "bg-green-100 border-green-600 text-green-700" },
  { value: "cancelado", label: "Cancelado", color: "bg-red-100 border-red-600 text-red-700" },
  { value: "expirado", label: "Expirado", color: "bg-blue-100 border-blue-600 text-blue-700" },
];

export function StatusCheckbox({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">Status</label>

      <div className="grid grid-cols-2 gap-3">
        {STATUS_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`
              flex items-center gap-2 p-2 rounded-md border cursor-pointer 
              transition-all hover:opacity-90 
              ${opt.color}
              ${value === opt.value ? "ring-2 ring-black/20" : ""}
            `}
          >
            <Checkbox
              checked={value === opt.value}
              onCheckedChange={(checked) => {
                const isChecked = checked === true;
                onChange(isChecked ? opt.value : null);
              }}
              style={{ backgroundColor: "var(--color-primary)", color: "#ffffff", }}
            />

            <span className="text-sm font-medium">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
