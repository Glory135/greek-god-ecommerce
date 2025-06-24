import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  isChecked?: boolean;
  checkChange: () => void;
  label?: string;
  RenderComp?: React.ReactNode
}

export const CheckBoxFilter = ({ isChecked, checkChange, label, RenderComp }: Props) => {
  return (
    <div className="w-full flex items-center gap-3 ">
      <Checkbox checked={isChecked || false} onCheckedChange={checkChange} />
      {
        RenderComp ?
          RenderComp
          : (<p className="text-base capitalize">{label}</p>)
      }
    </div>
  )
}