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

export const CheckBoxFilterSkeleton = () => {
  return (
    <div className="w-full flex items-center gap-3 animate-pulse">
      <div className="w-4 h-4 bg-gray-200 rounded border-2"></div>
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </div>
  )
}