import { useState, type ChangeEvent } from "react";
import { Image as ImageIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadFieldProps {
  label: string;
  currentUrl?: string | null;
  onChange: (file: File | undefined) => void;
  accept?: string;
}

export const ImageUploadField = ({
  label,
  currentUrl,
  onChange,
  accept = "image/*",
}: ImageUploadFieldProps) => {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onChange(file);
    setPreview(file ? URL.createObjectURL(file) : (currentUrl ?? null));
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        {preview ? (
          <img
            src={preview}
            alt={label}
            className="size-16 rounded-md border object-cover"
          />
        ) : (
          <div className="flex size-16 items-center justify-center rounded-md border border-dashed text-muted-foreground">
            <ImageIcon className="size-5" />
          </div>
        )}
        <Input type="file" accept={accept} onChange={handleChange} className="max-w-xs" />
      </div>
    </div>
  );
};
