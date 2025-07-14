import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { addressFieldsSchema } from "../schema";

export const deliveryRouter = createTRPCRouter({
  // CREATE - Add new delivery address
  addInfo: baseProcedure
    .input(z.object({
      customerId: z.string({
        required_error: "Customer ID is required",
        invalid_type_error: "Customer ID must be a string"
      }).min(1, "Customer ID cannot be empty"),
      ...addressFieldsSchema.shape
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        // Check if user exists
        const user = await ctx.payload.findByID({
          collection: "users",
          id: input.customerId,
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found"
          });
        }

        // Create delivery address
        const deliveryAddress = await ctx.payload.create({
          collection: "deliveryAddresses",
          data: {
            customerId: input.customerId,
            firstname: input.firstname,
            lastname: input.lastname,
            address: input.address,
            appartment: input.appartment || "",
            city: input.city,
            phone: input.phone
          }
        });

        return {
          success: true,
          message: "Delivery address added successfully",
          data: deliveryAddress
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error adding delivery address:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add delivery address. Please try again."
        });
      }
    }),

  // READ - Get all delivery addresses for a user
  getUserAddresses: baseProcedure
    .input(z.object({
      customerId: z.string({
        required_error: "Customer ID is required",
        invalid_type_error: "Customer ID must be a string"
      }).min(1, "Customer ID cannot be empty")
    }))
    .query(async ({ input, ctx }) => {
      try {
        // Check if user exists
        const user = await ctx.payload.findByID({
          collection: "users",
          id: input.customerId,
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found"
          });
        }

        // Get all delivery addresses for the user
        const addresses = await ctx.payload.find({
          collection: "deliveryAddresses",
          where: {
            customerId: {
              equals: input.customerId
            }
          },
          sort: "-createdAt" // Most recent first
        });

        return {
          success: true,
          data: addresses.docs,
          total: addresses.totalDocs
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error fetching delivery addresses:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch delivery addresses. Please try again."
        });
      }
    }),

  // READ - Get single delivery address by ID
  getAddressById: baseProcedure
    .input(z.object({
      addressId: z.string({
        required_error: "Address ID is required",
        invalid_type_error: "Address ID must be a string"
      }).min(1, "Address ID cannot be empty"),
      customerId: z.string({
        required_error: "Customer ID is required",
        invalid_type_error: "Customer ID must be a string"
      }).min(1, "Customer ID cannot be empty")
    }))
    .query(async ({ input, ctx }) => {
      try {
        // Check if user exists
        const user = await ctx.payload.findByID({
          collection: "users",
          id: input.customerId,
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found"
          });
        }

        // Get the specific delivery address
        const address = await ctx.payload.findByID({
          collection: "deliveryAddresses",
          id: input.addressId,
        });

        if (!address) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Delivery address not found"
          });
        }

        // Verify the address belongs to the user
        if (address.customerId !== input.customerId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You don't have permission to access this address"
          });
        }

        return {
          success: true,
          data: address
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error fetching delivery address:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch delivery address. Please try again."
        });
      }
    }),

  // UPDATE - Update delivery address
  updateAddress: baseProcedure
    .input(z.object({
      addressId: z.string({
        required_error: "Address ID is required",
        invalid_type_error: "Address ID must be a string"
      }).min(1, "Address ID cannot be empty"),
      customerId: z.string({
        required_error: "Customer ID is required",
        invalid_type_error: "Customer ID must be a string"
      }).min(1, "Customer ID cannot be empty"),
      ...addressFieldsSchema.shape
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        // Check if user exists
        const user = await ctx.payload.findByID({
          collection: "users",
          id: input.customerId,
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found"
          });
        }

        // Check if address exists and belongs to user
        const existingAddress = await ctx.payload.findByID({
          collection: "deliveryAddresses",
          id: input.addressId,
        });

        if (!existingAddress) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Delivery address not found"
          });
        }

        if (existingAddress.customerId !== input.customerId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You don't have permission to update this address"
          });
        }

        // Update delivery address
        const updatedAddress = await ctx.payload.update({
          collection: "deliveryAddresses",
          id: input.addressId,
          data: {
            firstname: input.firstname,
            lastname: input.lastname,
            address: input.address,
            appartment: input.appartment || "",
            city: input.city,
            phone: input.phone
          }
        });

        return {
          success: true,
          message: "Delivery address updated successfully",
          data: updatedAddress
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error updating delivery address:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update delivery address. Please try again."
        });
      }
    }),

  // DELETE - Delete delivery address
  deleteAddress: baseProcedure
    .input(z.object({
      addressId: z.string({
        required_error: "Address ID is required",
        invalid_type_error: "Address ID must be a string"
      }).min(1, "Address ID cannot be empty"),
      customerId: z.string({
        required_error: "Customer ID is required",
        invalid_type_error: "Customer ID must be a string"
      }).min(1, "Customer ID cannot be empty")
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        // Check if user exists
        const user = await ctx.payload.findByID({
          collection: "users",
          id: input.customerId,
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found"
          });
        }

        // Check if address exists and belongs to user
        const existingAddress = await ctx.payload.findByID({
          collection: "deliveryAddresses",
          id: input.addressId,
        });

        if (!existingAddress) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Delivery address not found"
          });
        }

        if (existingAddress.customerId !== input.customerId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You don't have permission to delete this address"
          });
        }

        // Delete delivery address
        await ctx.payload.delete({
          collection: "deliveryAddresses",
          id: input.addressId,
        });

        return {
          success: true,
          message: "Delivery address deleted successfully"
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error deleting delivery address:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete delivery address. Please try again."
        });
      }
    })
})