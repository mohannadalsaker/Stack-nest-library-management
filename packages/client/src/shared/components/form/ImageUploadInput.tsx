import { TrashIcon, UploadCloud } from "lucide-react";
import { useState } from "react";
import {
  type Control,
  Controller,
  type UseFormSetValue,
} from "react-hook-form";

interface ImageUploadInputProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  error?: string;
  defaultImage?: string;
  label?: string;
  aspectRatio?: string;
}

const ImageUploadInput = (props: ImageUploadInputProps) => {
  const { control, setValue, name, error, defaultImage, label, aspectRatio } =
    props;
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <div className="flex flex-col gap-3">
          {label && (
            <label className="text-sm font-medium text-gray-900 mb-1">
              {label}
            </label>
          )}

          <div className="flex flex-col gap-1">
            <div
              className={`
              border-2 border-dashed border-gray-300 
              text-center relative shadow-none 
              min-h-[200px] flex flex-col justify-center 
              items-center rounded-lg bg-gray-50
              hover:border-gray-400 transition-colors
            `}
            >
              <div className="w-full p-4">
                {preview ? (
                  <div className="relative inline-block w-full">
                    <img
                      src={preview}
                      alt="Preview"
                      className={`
                        w-full h-48 object-cover rounded-lg
                        ${aspectRatio ? `aspect-[${aspectRatio}]` : ""}
                      `}
                      crossOrigin="anonymous"
                    />
                    <button
                      type="button"
                      className={`
                        absolute top-2 right-2 
                        bg-red-600 bg-opacity-70 text-white 
                        p-2 rounded-full hover:bg-opacity-90 
                        transition-colors
                      `}
                      onClick={() => {
                        setPreview(null);
                        setValue(name, null);
                      }}
                    >
                      {/* Trash icon SVG */}
                      <TrashIcon />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer w-full block"
                  >
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden w-full"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPreview(URL.createObjectURL(file));
                          onChange(file);
                        }
                      }}
                    />
                    <div className="flex flex-col gap-1 items-center">
                      <UploadCloud />

                      <span className="text-sm font-bold text-gray-900">
                        Upload Image
                      </span>

                      {aspectRatio && (
                        <span className="text-sm font-bold text-gray-900">
                          Ratio {aspectRatio}
                        </span>
                      )}
                    </div>
                  </label>
                )}
              </div>
            </div>

            {error && (
              <span className="text-red-600 text-xs ml-3">{error}</span>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default ImageUploadInput;
