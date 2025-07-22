import { STATES } from '@/utils/data';
import type { CollectionConfig } from 'payload';

export const DeliveryFees: CollectionConfig = {
  slug: "deliveryFees",
  admin: {
    defaultColumns: ['state'],
    useAsTitle: 'state',
  },
  fields: [
    {
      name: "state",
      type: "select",
      options: STATES.map(i => i.toLowerCase()),
      required: true,
      unique: true
    },
    {
      name: "deliveryFee",
      type: "number",
      defaultValue: 0
    }
  ]
}