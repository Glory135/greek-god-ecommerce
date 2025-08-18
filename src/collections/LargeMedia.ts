import type { CollectionConfig } from 'payload'

export const LargeMedia: CollectionConfig = {
    slug: 'largeMedia',
    admin: {
        description: 'Use this for images larger than 4MB (uploads directly to Cloudinary)',
        useAsTitle: "alt"
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'url',
            type: 'text',
            required: true,
        },
        {
            name: 'publicId',
            type: 'text',
            required: true,
        },
        {
            name: 'alt',
            type: 'text',
        },
    ],
}
