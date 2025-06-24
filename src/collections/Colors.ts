import type { CollectionConfig } from 'payload';

const validateHexColor = (value: string | string[] | null | undefined): string | true => {
  if (!value) return 'Color value is required';
  if (Array.isArray(value)) {
    return value.every(v => v && /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(v)) || 'All values must be valid hex colors';
  }
  const match = value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/);
  return match !== null || `${value} is not a valid hex color`;
}

export const Colors: CollectionConfig = {
  slug: "colors",
  admin: {
    useAsTitle: "label"
  },
  fields: [
    {
      name: "label",
      type: "text",
      unique: true,
      required: true
    },
    {
      name: "color",
      type: "text",
      required: true,
      unique: true,
      validate: validateHexColor
    },
  ]
}